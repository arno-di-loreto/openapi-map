'use strict';

/*global buildTree, drawTree*/

var xmlhttp = new XMLHttpRequest();
var url = 'swagger-specification.json';

//var source   = $('#documentationtemplate').html();
//var template = Handlebars.compile(source);

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var swaggerDocumentation = JSON.parse(xmlhttp.responseText);
        var tree = buildTree(swaggerDocumentation);
        drawTree(tree);
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();
