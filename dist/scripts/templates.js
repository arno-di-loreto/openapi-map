this["OpenAPISpecificationVisualDocumentation"] = this["OpenAPISpecificationVisualDocumentation"] || {};
this["OpenAPISpecificationVisualDocumentation"]["tooltip"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "    <i class=\"fa fa-indent fa-2x fa-pull-left\"></i><p>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "    <h1>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\n    <div class=\".list-group\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.array : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.closedChildren : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.gfm : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.allowExtension : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.openapiType : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n    <h2>Description</h2>\n    <p>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.values : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "      <p class=\".list-group-item\"><i class=\"fa fa-asterisk fa-fw fa-2x\"></i>&nbsp;Required</p>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "      <p class=\".list-group-item\"><i class=\"fa fa-list-ul fa-fw fa-2x\"></i>&nbsp;Array</p>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <p class=\".list-group-item\"><i class=\"fa fa-cubes fa-fw fa-2x\"></i>&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.children : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <p class=\".list-group-item\"><i class=\"fa fa-cubes fa-fw fa-2x\"></i>&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "        <p class=\".list-group-item\"><i class=\"fa fa-cube fa-fw fa-2x\"></i>&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"type","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "      <p class=\".list-group-item\"><i class=\"fa fa-github-alt fa-fw fa-2x\"></i>&nbsp;Allows GFM</p>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "      <p class=\".list-group-item\"><i class=\"fa fa-code-fork fa-fw fa-2x\"></i>&nbsp;Allows extension</p>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      <p class=\".list-group-item\"><i class=\"fa fa-external-link fa-fw fa-2x\"></i>&nbsp;<a href=\""
    + container.escapeExpression(((helper = (helper = helpers.openapiTypeURL || (depth0 != null ? depth0.openapiTypeURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"openapiTypeURL","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">OpenAPI Specification documentation</a></p>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "      <h2>Values</h2>\n      <table id=\"table\" class=\"table table-striped table-bordered table-condensed table-hover\" >\n        <tr>\n            <th>\n                Value\n            </th>\n            <th>\n                Default\n            </th>\n            <th>\n                Description\n            </th>\n        </tr>\n\n";
  stack1 = ((helper = (helper = helpers.values || (depth0 != null ? depth0.values : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"values","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},options) : helper));
  if (!helpers.values) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "      </table>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <tr>\n          <td>"
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "</td>\n          <td>"
    + alias2(alias1((depth0 != null ? depth0["default"] : depth0), depth0))
    + "</td>\n          <td>"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</td>\n        </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"entry\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.fieldsGroup : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});