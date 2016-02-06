'use strict';

/*global marked*/
/*eslint no-use-before-define:0, no-unused-vars:0*/

function buildNodeFromDefinition(openapiDocumentation, definitionName){
  var definition = openapiDocumentation[definitionName];
  var node = {};
  node.name = definition.name;
  if(definition.description !== undefined && definition.description !== null){
    node.description = marked(definition.description);
  }
  node.type = definitionName;
  if(definition.allowExtension !== undefined){
    node.allowExtension = definition.allowExtension;
  }
  else{
    node.allowExtension = false;
  }
  if(definition.fieldsGroup !== undefined){
    node.fieldsGroup = definition.fieldsGroup;
  }
  else{
    node.fieldsGroup = false;
  }
  if(!node.fieldsGroup && node.type !== undefined){
    node.openapiType = true;
    var openapiTypeName = node.type.replace(/ /g, '').replace('[', '').replace(']', '');
    openapiTypeName = openapiTypeName.charAt(0).toLowerCase() + openapiTypeName.slice(1);
    node.openapiTypeURL = 'https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#' + openapiTypeName;
  }
  else{
    node.openapiType = false;
  }
  node.required = definition.required;
  node.closedChildren = [];
  for(var index in definition.fields){
      node.closedChildren.push(buildNodeFromField(openapiDocumentation, definition.fields[index]));
  }
  if(node.allowExtension){
    node.closedChildren.push(buildNodeFromField(openapiDocumentation, openapiDocumentation['Specification Extensions']));
  }
  return node;
}

function buildNodeFromField(openapiDocumentation, field){
  var node = {};
  var nodeArray = false;
  if(field.type !== undefined){
    node.openapiType = false;
    var definitionName;
    if(field.type.indexOf('[') >= 0){
      definitionName = field.type.substring(1, field.type.length - 1);
      nodeArray = true;
    }
    else {
      definitionName = field.type;
      nodeArray = false;
    }
    if(openapiDocumentation[definitionName] !== undefined){
      node = buildNodeFromDefinition(openapiDocumentation, definitionName);
    }
  }
  node.name = field.name;
  node.type = field.type;
  node.array = nodeArray;
  if(field.description !== undefined) {
    node.description = marked(field.description);
  }
  if(field.values !== undefined) {
    for(var ivalues = 0; ivalues < field.values.length; ivalues++){
      if(field.values[ivalues].description !== undefined && field.values[ivalues].description !== null){
        field.values[ivalues].description = marked(field.values[ivalues].description);
      }
    }
  }
  node.required = field.required;
  node.gfm = field.gfm;
  node.patterned = field.patterned;
  node.values = field.values;
  return node;
}

function buildTree(openapiDocumentation){
  var rootNode = buildNodeFromDefinition(openapiDocumentation, 'Swagger Object');
  return rootNode;
}
