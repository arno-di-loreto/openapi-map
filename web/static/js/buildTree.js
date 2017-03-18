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

/**
 * @description Generate HTML for Markdown
 * @param {String} md The Mardown
 * @return {String} The HTML
 */
function getHTMLFromMD(md) {
  var html;
  if (md !== undefined && md !== null) {
    html = marked(md);
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
  if (definition.fieldsGroup === undefined) {
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
    changelog: definition.changelog,
    typeChangelog: definition.changelog,
    allowExtension: allowExtension(definition),
    isFieldsGroup: isFieldsGroup(openapiDocumentation, openapiType),
    isOpenapiType: isOpenapiType(openapiDocumentation, openapiType),
    closedChildren: []
  };

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
  // propagate isNew to children
  if (field.changelog === undefined &&
      parentNode !== undefined &&
      parentNode.changelog !== undefined &&
      parentNode.changelog.isNew) {
    node.changelog = {
      isNew: parentNode.changelog.isNew
    };
  }
  // simple field changelog
  else {
    node.changelog = field.changelog;
  }
  node.isArray = isArray(field.type);
  node.allowReference = allowReference(field);
  node.values = field.values;
  node.md = field.md;
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
  console.log('DONE', rootNode);
  return rootNode;
}
