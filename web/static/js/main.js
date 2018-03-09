'use strict';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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
        '\');">' +
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

function getVersionById(id, versions){
  var result;
  for (var i = 0; i < versions.length; i++) {
    if(versions[i].id === id) {
      result = versions[i];
      break;
    } 
  }
  return result;
}

function getVersion(versions, url) {
  var id = getParameterByName('version', url);
  var version;
  if(id !== undefined && id !== null && id.length > 0) {
    version = getVersionById(id, versions);
  }
  if(!version){
    version = versions[0];
  }
  return version;
}

populateVersionList(function(versions) {
  var version = getVersion(versions);
  showVersion(version.name, version.url, version.root, version.specificationurl);
});
