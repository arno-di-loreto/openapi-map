'use strict';

/*global marked*/
/*eslint no-use-before-define:0, no-unused-vars:0*/

function buildNodeFromDefinition(swaggerDocumentation, definitionName){
  var definition = swaggerDocumentation[definitionName];
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
  node.required = definition.required;
  node.closedChildren = [];
  for(var index in definition.fields){
      node.closedChildren.push(buildNodeFromField(swaggerDocumentation, definition.fields[index]));
  }
  if(node.allowExtension){
    node.closedChildren.push(buildNodeFromField(swaggerDocumentation, swaggerDocumentation['Specification Extensions']));
  }
  return node;
}

function buildNodeFromField(swaggerDocumentation, field){
  var node = {};
  var nodeArray = false;
  if(field.type !== undefined){
    var definitionName;
    if(field.type.indexOf('[') >= 0){
      definitionName = field.type.substring(1, field.type.length - 1);
      nodeArray = true;
    }
    else {
      definitionName = field.type;
      nodeArray = false;
    }
    if(swaggerDocumentation[definitionName] !== undefined){
      node = buildNodeFromDefinition(swaggerDocumentation, definitionName);
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

function buildTree(swaggerDocumentation){
  var rootNode = buildNodeFromDefinition(swaggerDocumentation, 'Swagger Object');
  return rootNode;
}
