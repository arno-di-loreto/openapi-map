'use strict';

function loadVersionFile(complete) {
  $.getJSON('spec-versions.json')
  .then(complete)
  .fail(function(error) {
    console.log('Failed to load spec-versions.json file', error);
  });
}

function populateVersionList(callback) {
  loadVersionFile(function(versions) {
    for (var i = 0; i < versions.length; i++) {
      var name = versions[i].name;
      var url = versions[i].url;
      var root = versions[i].root;
      var specificationurl = versions[i].specificationurl;
      $('#versions').append('<li class="nav-item" id="' +
        name +
        '"><a href="javascript:showVersion(\'' +
        name + '\',\'' +
        url + '\',\'' +
        root + '\',\'' +
        specificationurl + '\',\'' +
        '\');">Version ' +
        name +
        '</a></li>');
    }
    callback(versions);
  });
}

function loadData(url, root, specificationurl, callback) {
  $.getJSON(url)
  .then(function(data) {
    var tree = buildTree(data, root, specificationurl);
    drawTree(tree);
    callback();
  })
  .fail(function(error) { 
    console.log('Failed to load ' + url + ' file', error);
  });
}

function showVersion(name, url, root, specificationurl) {
  loadData(url, root, specificationurl, function() {
    $('#versions li').each(function() {
        $(this).blur();
        $(this).removeClass('active');
        if ($(this).attr('id').localeCompare(name) === 0) {
          $(this).addClass('active');
        }
    });
  });
}

function showHome() {
  $('#tooltip').empty();
  $('#help').show();
}

populateVersionList(function(versions) {
  showVersion(versions[0].name, versions[0].url, versions[0].root, versions[0].specificationurl);
});
