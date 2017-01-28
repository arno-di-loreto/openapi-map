'use strict';

var xmlhttp = new XMLHttpRequest();
var url = 'data.json';

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        var openapiDocumentation = JSON.parse(xmlhttp.responseText);
        var tree = buildTree(openapiDocumentation);
        drawTree(tree);
    }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();
