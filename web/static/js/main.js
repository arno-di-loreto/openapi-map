'use strict';

function loadVersionFile(complete) {
  $.getJSON('versions.json')
  .then(complete)
  .fail(function(error) {
    console.log('Failed to load versions.json master file', error);
  });
}

function populateVersionList(callback) {
  loadVersionFile(function(versions) {
    for (var i = 0; i < versions.length; i++) {
      var versionfile = versions[i];
      var version = versionfile.replace('.json', '');
      $('#versions').append('<li role="presentation" id="' +
        versionfile +
        '"><a onclick="javascript:showVersion(\'' +
        versionfile +
        '\')">Version ' +
        version +
        '</a></li>');
    }
    callback(versions);
  });
}

function loadData(url, callback) {
  $.getJSON(url)
  .then(function(data) {
    var tree = buildTree(data);
    drawTree(tree);
    callback();
  })
  .fail(function(error) { 
    console.log('Failed to load apis.json master file', error);
  });
}

function showVersion(versionfile) {
  loadData(versionfile, function() {
    $('#versions li').each(function(index) {
        $(this).removeClass('active');
        if ($(this).attr('id').localeCompare(versionfile) === 0) {
          $(this).addClass('active');
        }
    });
  });
}

populateVersionList(function(versions) {
  showVersion(versions[0]);
});
