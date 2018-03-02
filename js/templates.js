this["OpenAPISpecificationVisualDocumentation"] = this["OpenAPISpecificationVisualDocumentation"] || {};
this["OpenAPISpecificationVisualDocumentation"]["tooltip"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "    <i class=\"fa fa-indent fa-2x fa-pull-left\"></i><p>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n  <!-- other -->\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.parent : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <!-- type description -->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.typeDescription : depth0),{"name":"if","hash":{},"fn":container.program(31, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "      <div class=\"row\">\n        <div class=\"documentation\">\n          <!-- property description -->\n          <h2>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " property</h2>\n          <!-- characteristics -->\n          <div class=\"list-group\">\n            <!-- changelog -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.changelog : depth0)) != null ? stack1.isNew : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.changelog : depth0)) != null ? stack1.isModified : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.changelog : depth0)) != null ? stack1.isInfo : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.required : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isArray : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOpenapiType : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.additionalType : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.md : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.allowReference : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.documentationUrl : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "          </div>\n          <!-- description -->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n      </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <div class=\"list-group-item list-group-item-success\"><span class=\"fa fa-info-circle fa-fw fa-2x\"></span><strong>New property! </strong>"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.changelog : depth0)) != null ? stack1.details : stack1), depth0)) != null ? stack1 : "")
    + "</div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <div class=\"list-group-item list-group-item-warning\"><span class=\"fa fa-exclamation-triangle fa-fw fa-2x\"></span><strong>Modified property! </strong>"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.changelog : depth0)) != null ? stack1.details : stack1), depth0)) != null ? stack1 : "")
    + "</div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "              <div class=\"list-group-item list-group-item-info\"><i class=\"fa fa-info-circle fa-fw fa-2x\"></i>"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.changelog : depth0)) != null ? stack1.details : stack1), depth0)) != null ? stack1 : "")
    + "</div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "              <p class=\"list-group-item\"><i class=\"fa fa-asterisk fa-fw fa-2x\"></i>&nbsp;Required</p>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "              <p class=\"list-group-item\"><i class=\"fa fa-list-ul fa-fw fa-2x\"></i>&nbsp;Array</p>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <p class=\"list-group-item\"><i class=\"fa fa-cubes fa-fw fa-2x\"></i>&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"type","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <p class=\"list-group-item\"><i class=\"fa fa-cube fa-fw fa-2x\"></i>&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"type","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <p class=\"list-group-item\"><i class=\"fa fa-cube fa-fw fa-2x\"></i>&nbsp;"
    + container.escapeExpression(((helper = (helper = helpers.additionalType || (depth0 != null ? depth0.additionalType : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"additionalType","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "              <p class=\"list-group-item\"><img style=\"width:32px\" src=\"images/markdown.png\">&nbsp;&nbsp;Supports markdown (<a href=\""
    + container.escapeExpression(alias1(((stack1 = (depth0 != null ? depth0.md : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" target=\"mddocumentation\">"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.md : depth0)) != null ? stack1.syntax : stack1), depth0)) != null ? stack1 : "")
    + " syntax</a>)</p>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "              <p class=\"list-group-item\"><i class=\"fa fa-code-fork fa-fw fa-2x\"></i>&nbsp;Value can be a reference to a "
    + ((stack1 = ((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"type","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"25":function(container,depth0,helpers,partials,data) {
    var helper;

  return "              <p class=\"list-group-item\"><i class=\"fa fa-book fa-fw fa-2x\"></i><a href=\""
    + container.escapeExpression(((helper = (helper = helpers.documentationUrl || (depth0 != null ? depth0.documentationUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"documentationUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"openapidocumentation\">OpenAPI Specification</a></p>\n";
},"27":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <p>"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.values : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"28":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <h2>Values</h2>\n            <table id=\"table\" class=\"table table-striped table-bordered table-condensed table-hover\" >\n              <tr>\n                  <th>\n                      Value\n                  </th>\n                  <th>\n                      Default\n                  </th>\n                  <th>\n                      Description\n                  </th>\n              </tr>\n\n";
  stack1 = ((helper = (helper = helpers.values || (depth0 != null ? depth0.values : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"values","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.values) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </table>\n";
},"29":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "              <tr>\n                <td>"
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "</td>\n                <td>"
    + alias2(alias1((depth0 != null ? depth0["default"] : depth0), depth0))
    + "</td>\n                <td>"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</td>\n              </tr>\n";
},"31":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"row row-doc\"> <!-- type description -->\n      <div class=\"documentation\">\n        <h2>"
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "</h2>\n        <div class=\"list-group\">\n        <!-- change log -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.isNew : stack1),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.isModified : stack1),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <!-- extension -->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.allowExtension : depth0),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <!-- documentation -->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.typeDocumentationUrl : depth0),{"name":"if","hash":{},"fn":container.program(38, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div> <!-- <div class=\"list-group\"> -->\n        <!-- description -->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.typeDescription : depth0),{"name":"if","hash":{},"fn":container.program(40, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div> <!-- <div class=\"documentation\"> -->\n    </div><!-- type description -->\n        \n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.isModified : stack1),{"name":"if","hash":{},"fn":container.program(42, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"32":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "          <div class=\"list-group-item list-group-item-success\"><span class=\"fa fa-info-circle fa-fw fa-2x\"></span>&nbsp;<strong>New object!</strong>"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.details : stack1), depth0)) != null ? stack1 : "")
    + "</div>\n";
},"34":function(container,depth0,helpers,partials,data) {
    return "          <div class=\"list-group-item list-group-item-warning\"><span class=\"fa fa-exclamation-triangle fa-fw fa-2x\"></span>&nbsp;<a href=\"#objectchangelog\"><strong>Modified object! </strong></a></div>\n";
},"36":function(container,depth0,helpers,partials,data) {
    return "          <p class=\"list-group-item\"><i class=\"fa fa-code-fork fa-fw fa-2x\"></i>&nbsp;Allows extension with x- properties</p>\n";
},"38":function(container,depth0,helpers,partials,data) {
    var helper;

  return "          <p class=\"list-group-item\"><i class=\"fa fa-book fa-fw fa-2x\"></i>&nbsp;<a href=\""
    + container.escapeExpression(((helper = (helper = helpers.typeDocumentationUrl || (depth0 != null ? depth0.typeDocumentationUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"typeDocumentationUrl","hash":{},"data":data}) : helper)))
    + "\" target=\"openapidocumentation\">OpenAPI Specification</a></p>\n";
},"40":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "        <h3>Description</h3>\n        <p>"
    + ((stack1 = ((helper = (helper = helpers.typeDescription || (depth0 != null ? depth0.typeDescription : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"typeDescription","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n";
},"42":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <div class=\"row row-doc\"><!-- type changelog description -->\n      <div class=\"documentation\">\n        <a name=\"objectchangelog\"></a>\n        <h2>"
    + container.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + " Change log</h2>\n        <div class=\"list-group\">\n        <!-- change log - deleted properties -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.deletedProperties : stack1),{"name":"if","hash":{},"fn":container.program(43, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <!-- change log - new properties -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.newProperties : stack1),{"name":"if","hash":{},"fn":container.program(45, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <!-- change log - modified properties -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.modifiedProperties : stack1),{"name":"if","hash":{},"fn":container.program(47, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div> <!-- <div class=\"list-group\"> -->\n        <!-- description -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.details : stack1),{"name":"if","hash":{},"fn":container.program(49, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <!-- new properties -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.newProperties : stack1),{"name":"if","hash":{},"fn":container.program(51, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <!-- modified properties -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.modifiedProperties : stack1),{"name":"if","hash":{},"fn":container.program(54, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        <!-- deleted properties -->\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.deletedProperties : stack1),{"name":"if","hash":{},"fn":container.program(56, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div> <!-- <div class=\"documentation\"> -->\n    </div><!-- type changelog -->\n";
},"43":function(container,depth0,helpers,partials,data) {
    return "          <p class=\"list-group-item list-group-item-danger\"><i class=\"fa fa-trash fa-fw fa-2x\"></i>&nbsp;<a href=\"#deletedproperties\">Deleted properties</a></p>\n";
},"45":function(container,depth0,helpers,partials,data) {
    return "          <p class=\"list-group-item list-group-item-success\"><i class=\"fa fa-plus-square fa-fw fa-2x\"></i>&nbsp;<a href=\"#newproperties\">New properties</a></p>\n";
},"47":function(container,depth0,helpers,partials,data) {
    return "          <p class=\"list-group-item list-group-item-warning\"><i class=\"fa fa-pencil-square fa-fw fa-2x\"></i>&nbsp;<a href=\"#modifiedproperties\">Modified properties</a></p>\n";
},"49":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <h3>What's new</h3>\n        <p>"
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.details : stack1), depth0)) != null ? stack1 : "")
    + "</p>\n";
},"51":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a name=\"newproperties\"></a>\n        <h3>New properties</h3>\n        <table id=\"table\" class=\"table table-striped table-bordered table-condensed\" >\n          <tr>\n              <th>New Property</th>\n              <th>Description</th>  \n          </tr>\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.newProperties : stack1), depth0),{"name":"typeChangelog.newProperties","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </table>\n";
},"52":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "          <tr>\n            <td>"
    + container.escapeExpression(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n            <td>"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</td>\n          </tr>\n";
},"54":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a name=\"modifiedproperties\"></a>\n        <h3>Modified properties</h3>\n        <table id=\"table\" class=\"table table-striped table-bordered table-condensed\" >\n          <tr>\n              <th>Modified Property</th>\n              <th>What's new</th>  \n          </tr>\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.modifiedProperties : stack1), depth0),{"name":"typeChangelog.modifiedProperties","hash":{},"fn":container.program(52, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </table>\n";
},"56":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "        <a name=\"deletedproperties\"></a>\n        <h3>Deleted properties</h3>\n        <table id=\"table\" class=\"table table-striped table-bordered table-condensed\" >\n          <tr>\n              <th>Deleted Property</th>\n              <th>Replaced by</th>\n              <th>Documentation</th>  \n          </tr>\n"
    + ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(((stack1 = (depth0 != null ? depth0.typeChangelog : depth0)) != null ? stack1.deletedProperties : stack1), depth0),{"name":"typeChangelog.deletedProperties","hash":{},"fn":container.program(57, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </table>\n";
},"57":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "          <tr>\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n            <td>"
    + alias2(alias1((depth0 != null ? depth0.replacedBy : depth0), depth0))
    + "</td>\n            <td><a href=\""
    + alias2(alias1((depth0 != null ? depth0.documentationUrl : depth0), depth0))
    + "\" target=\"openapidocumentation\"><i class=\"fa fa-book fa-fw fa-2x\"></i></a></td>\n          </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"entry\">\n  <!-- fields group -->\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isFieldsGroup : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</div> <!-- <div class=\"entry\"> -->\n";
},"useData":true});