'use strict';

function buildNodeFromDefinition(openapiDocumentation, definitionName, specificationurl){
  var definition = openapiDocumentation[definitionName];
  var node = {};
  node.name = definition.name;
  if (definition.description !== undefined && definition.description !== null) {
    node.description = marked(definition.description);
  }
  node.type = definitionName;
  if (definition.allowExtension !== undefined) {
    node.allowExtension = definition.allowExtension;
  }
  else {
    node.allowExtension = false;
  }
  if (definition.fieldsGroup !== undefined) {
    node.fieldsGroup = definition.fieldsGroup;
  }
  else {
    node.fieldsGroup = false;
  }
  if (definition.specificationAnchor) {
    node.documentationUrl = specificationurl + definition.specificationAnchor;
  }
  else if (!node.fieldsGroup && node.type !== undefined) {
    var openapiTypeName =
      node.type.replace(/ /g, '').replace('[', '').replace(']', '');
    openapiTypeName =
      openapiTypeName.charAt(0).toLowerCase() + openapiTypeName.slice(1);
    node.documentationUrl = specificationurl + openapiTypeName;
  }

  node.required = definition.required;
  node.closedChildren = [];
  for (var index in definition.fields) {
    node.closedChildren.push(buildNodeFromField(
      openapiDocumentation, definition.fields[index], specificationurl));
  }
  if (node.allowExtension) {
    node.closedChildren.push(buildNodeFromField(
      openapiDocumentation, openapiDocumentation['Specification Extensions'], specificationurl));
  }
  return node;
}

function buildNodeFromField(openapiDocumentation, field, specificationurl) {
  var node = {};
  var nodeArray = false;
  if (field.type !== undefined) {
    node.openapiType = false;
    var definitionName;
    if (field.type.indexOf('[') >= 0) {
      definitionName = field.type.substring(1, field.type.length - 1);
      nodeArray = true;
    }
    else {
      definitionName = field.type;
      nodeArray = false;
    }
    if (openapiDocumentation[definitionName] !== undefined) {
      node = buildNodeFromDefinition(
        openapiDocumentation, definitionName, specificationurl);
    }
  }
  node.name = field.name;
  node.type = field.type;
  node.array = nodeArray;
  if (field.description !== undefined) {
    node.description = marked(field.description);
  }
  if (field.values !== undefined) {
    for (var ivalues = 0; ivalues < field.values.length; ivalues++) {
      if (field.values[ivalues].description !== undefined &&
          field.values[ivalues].description !== null) {
        field.values[ivalues].description =
          marked(field.values[ivalues].description);
      }
    }
  }

  if (field.specificationAnchor) {
    node.documentationUrl = specificationurl + field.specificationAnchor;
  }

  node.required = field.required;
  node.md = field.md;
  node.patterned = field.patterned;
  node.values = field.values;
  return node;
}

function buildTree(openapiDocumentation, root, specificationurl) {
  var rootNode = buildNodeFromDefinition(
    openapiDocumentation, root, specificationurl);
  return rootNode;
}
