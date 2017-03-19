'use strict';

/**
 * @description Returns a processed OpenAPI type name to handle array of objects [OpenAPI Type]
 * @param {String} openapiType The type
 * @return {String} The true OpenAPI type name
 */
function getOpenapiTypeName(openapiType) {
  return openapiType.replace('[', '').replace(']', '');
}

/**
 * @description Generate anchor (to find documentation in the specification) for OpenAPI type (handle [OpenAPI Type])
 * @param {String} openapiType The type
 * @return {String} The anchor
 */
function getAnchorForType(openapiType) {
  var typeName = openapiType.replace(/ /g, '').replace('[', '').replace(']', '');
  return typeName.charAt(0).toLowerCase() + typeName.slice(1);
}

/**
 * @description Generate documentation URL for OpenAPI type (handle [OpenAPI Type]) or anchor
 * @param {String} openapiType The type
 * @param {String} anchor The anchor
 * @param {String} specificationUrl The specification URL
 * @return {String} The documentation URL
 */
function getDocumentationUrl(openapiType, anchor, specificationUrl) {
  var documentationUrl;
  if (anchor !== undefined) {
    documentationUrl = specificationUrl + anchor;
  }
  else if (openapiType !== null) {
    documentationUrl = specificationUrl + getAnchorForType(openapiType);
  }
  return documentationUrl;
}

var pRegEx = new RegExp('^<p>.*');

/**
 * @description Generate HTML for Markdown
 * @param {String} md The Mardown
 * @return {String} The HTML
 */
function getHTMLFromMD(md) {
  var html;
  if (md !== undefined && md !== null) {
    html = marked(md);
    //if (pRegEx.test(html)) {
      //html = html.substring(3, html.length - 5);
    //}
    //if (html.startsWith('<p>')) {
    //  html = html.substring(3, html.length - 5);
    //}
    
  }
  else {
    html = md;
  }
  return html;
}

/**
 * @description Does an OpenAPI type allows extension
 * @param {Object} openapiTypeDefinition The OpenAPI type definition
 * @return {Boolean} Allow extension or not
 */
function allowExtension(openapiTypeDefinition) {
  var result;
  if (openapiTypeDefinition.allowExtension === undefined) {
    result = false;
  }
  else {
    result = openapiTypeDefinition.allowExtension;
  }
  return result;
}

/**
 * @description Does a property allows reference
 * @param {Object} property The property definition
 * @return {Boolean} Allow reference or not
 */
function allowReference(property) {
  var result;
  if (property.allowReference === undefined) {
    result = false;
  }
  else {
    result = property.allowReference;
  }
  return result;
}

/**
 * @description Is an OpenAPI definition a fields group (artificial group of fields within an OpenAPI type)
 * @param {Object} openapiTypeDefinition The OpenAPI type definition
 * @return {Boolean} Is a fields group or not
 */
function isFieldsGroup(openapiDocumentation, type) {
  var openapiTypeName = getOpenapiTypeName(type);
  var definition = openapiDocumentation[openapiTypeName];
  var result;
  if (definition === undefined || definition.fieldsGroup === undefined) {
    result = false;
  }
  else {
    result = definition.fieldsGroup;
  }
  return result;
}

function isOpenapiType(openapiDocumentation, type) {
  var openapiTypeName = getOpenapiTypeName(type);
  var definition = openapiDocumentation[openapiTypeName];
  var result;
  if (definition === undefined) {
    result = false;
  }
  else if (isFieldsGroup(openapiDocumentation, type)) {
    result = false;
  }
  else {
    result = true;
  }
  return result;
}

function isAtomicField(openapiDocumentation, field) {
  var result;
  if (field.type === undefined) {
    result = false;
  }
  else {
    var openapiTypeName = getOpenapiTypeName(field.type);
    var definition = openapiDocumentation[openapiTypeName];
    if (definition === undefined) {
      result = true;
    }
    else {
      result = false;
    }
  }
  return result;
}

function isArray(type) {
  return type.indexOf('[') >= 0;
}

function getFields(typeDefinition, openapiDocumentation) {
  var result = [];
  for (var i = 0; i < typeDefinition.fields.length; i++) {
    var field = typeDefinition.fields[i];
    if (isFieldsGroup(openapiDocumentation, field.type)) {
      var fieldsGroupDefinition = openapiDocumentation[field.type];
      result = result.concat(
        getFields(fieldsGroupDefinition, openapiDocumentation));
    }
    else {
      result.push(field);
    }
  }
  return result;
}

function getNewProperties(type, openapiDocumentation) {
  var result = [];
  var fields = getFields(type, openapiDocumentation);
  for (var i = 0; i < fields.length; i++) {
    var property = fields[i];
    if (property.changelog && property.changelog.isNew) {
      result.push({
        name: property.name,
        description: getHTMLFromMD(property.description)
      });
    }
  }
  return result;
}

function getModifiedProperties(type, openapiDocumentation) {
  var result = [];
  var fields = getFields(type, openapiDocumentation);
  for (var i = 0; i < fields.length; i++) {
    var property = fields[i];
    if (property.changelog && property.changelog.isModified) {
      result.push({
        name: property.name,
        description: getHTMLFromMD(property.changelog.details)
      });
    }
  }
  return result;
}

function getDeletedProperties(type, specificationUrl) {
  var result = [];
  if (type.changelog !== undefined && type.changelog.deletedProperties) {
    result = type.changelog.deletedProperties;
    for (var i = 0; i < result.length; i++) {
      if (result[i].see !== undefined) {
        result[i].documentationUrl = getDocumentationUrl(result[i].see, undefined, specificationUrl);
      }
    }
  }
  return result;
}


var mdUrls = {
  gfm: 'https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet',
  commonmark: 'http://commonmark.org/help/'
};
function getMd(field) {
  var md;
  if (field.md) {
    md = {
      syntax: field.md,
      url: mdUrls[field.md.toLowerCase()]
    };
  }
  return md;
}

function buildNodeFromOpenapiType(openapiDocumentation,
                                  openapiType,
                                  specificationUrl,
                                  parentNode,
                                  withChildren,
                                  allowReference) {
  var openapiTypeName = getOpenapiTypeName(openapiType);
  var definition = openapiDocumentation[openapiTypeName];
  var node = {
    name: definition.name,
    type: openapiTypeName,
    definition: definition,
    typeDocumentationUrl: getDocumentationUrl(
                            openapiTypeName,
                            definition.specificationAnchor,
                            specificationUrl),
    typeDescription: getHTMLFromMD(definition.description),
    typeChangelog: definition.changelog,
    allowExtension: allowExtension(definition),
    isFieldsGroup: isFieldsGroup(openapiDocumentation, openapiType),
    isOpenapiType: isOpenapiType(openapiDocumentation, openapiType),
    closedChildren: []
  };

  if (node.typeChangelog !== undefined &&
      node.typeChangelog.details !== undefined) {
    node.typeChangelog.details = getHTMLFromMD(node.typeChangelog.details);
  }

  var newProperties = getNewProperties(definition, openapiDocumentation);
  if (newProperties.length > 0) {
    if (node.typeChangelog === undefined) {
      node.typeChangelog = {newProperties: newProperties};
    }
    else {
      node.typeChangelog.newProperties = newProperties;
    }
  }

  var modifiedProperties = getModifiedProperties(definition, openapiDocumentation);
  if (modifiedProperties.length > 0) {
    if (node.typeChangelog === undefined) {
      node.typeChangelog = {modifiedProperties: modifiedProperties};
    }
    else {
      node.typeChangelog.modifiedProperties = modifiedProperties;
    }
  }

  var deletedProperties = getDeletedProperties(definition, specificationUrl);
  if (deletedProperties.length > 0) {
    if (node.typeChangelog === undefined) {
      node.typeChangelog = {deletedProperties: deletedProperties};
    }
    else {
      node.typeChangelog.deletedProperties = deletedProperties;
    }
  }

  if (withChildren) {
    for (var index = 0; index < definition.fields.length; index++) {
      node.closedChildren.push(
        buildNodeFromField(
          openapiDocumentation,
          definition.fields[index],
          specificationUrl,
          node));
    }
    if (node.allowExtension) {
      var extensionNode = buildNodeFromField(
          openapiDocumentation,
          openapiDocumentation['Specification Extensions'],
          specificationUrl);
      extensionNode.isTechnical = true;
      node.closedChildren.push(extensionNode);
    }
    if (allowReference) {
      var referenceNode = buildNodeFromField(
          openapiDocumentation,
          openapiDocumentation['Reference Object'],
          specificationUrl);
      referenceNode.isTechnical = true;
      node.closedChildren.push(referenceNode);
    }
  }

  return node;
}

function buildNodeFromField(openapiDocumentation, field, specificationUrl, parentNode) {
  var node;
  if (!isAtomicField(openapiDocumentation, field)) {
    var withChildren;
    if (field.noFollow === true) {
      withChildren = false;
    }
    else {
      withChildren = true;
    }
    node = buildNodeFromOpenapiType(
            openapiDocumentation,
            field.type,
            specificationUrl,
            parentNode,
            withChildren,
            allowReference(field));
  }
  else {
    node = {
      type: field.type
    };
  }
  node.name = field.name;
  node.description = getHTMLFromMD(field.description);
  node.changelog = field.changelog;
  if (field.additionalType !== undefined) {
    node.additionalType = field.additionalType;
  }
  if (node.changelog !== undefined &&
      node.changelog.details !== undefined) {
    node.changelog.details = getHTMLFromMD(node.changelog.details);
  }
  if (parentNode) {
    node.parentChangelog = parentNode.changelog;
  }
  node.isArray = isArray(field.type);
  node.allowReference = allowReference(field);
  node.values = field.values;

  var md = getMd(field);
  if (md) {
    node.md = md;
  }

  if (field.required) {
    node.required = true;
  }
  else {
    node.required = false;
  }
  return node;
}

function buildTree(openapiDocumentation, root, specificationUrl) {
  var rootNode = buildNodeFromOpenapiType(
    openapiDocumentation, root, specificationUrl, null, true);
  // var rootNode = buildNodeFromOpenapiType(
  // openapiDocumentation, 'Paths Object', specificationUrl, null, true);
  return rootNode;
}
