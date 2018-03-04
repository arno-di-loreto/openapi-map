'use strict';

const chai = require('chai');
const expect = chai.expect;

const buildTree = require('../web/static/js/buildTree.js');

describe('buildTree', function() {

  describe('getOpenapiTypeName', function(){

    it('should handle simple "string"', function(){
      var result = buildTree.getOpenapiTypeName('string');
      expect(result).to.be.equal('string');
    });

    it('should handle simple " string"', function(){
      var result = buildTree.getOpenapiTypeName(' string');
      expect(result).to.be.equal('string');
    });

    it('should handle simple "string "', function(){
      var result = buildTree.getOpenapiTypeName('string ');
      expect(result).to.be.equal('string');
    });

    it('should handle simple " string "', function(){
      var result = buildTree.getOpenapiTypeName(' string ');
      expect(result).to.be.equal('string');
    });

    it('should handle simple "Contact Object"', function(){
      var result = buildTree.getOpenapiTypeName('Contact Object');
      expect(result).to.be.equal('Contact Object');
    });

    it('should handle simple " Contact Object "', function(){
      var result = buildTree.getOpenapiTypeName(' Contact Object ');
      expect(result).to.be.equal('Contact Object');
    });

    it('should handle "[array]"', function(){
      var result = buildTree.getOpenapiTypeName('[array]');
      expect(result).to.be.equal('array');
    });

    it('should handle "[array] "', function(){
      var result = buildTree.getOpenapiTypeName('[array] ');
      expect(result).to.be.equal('array');
    });

    it('should handle " [array]"', function(){
      var result = buildTree.getOpenapiTypeName('[array] ');
      expect(result).to.be.equal('array');
    });

    it('should handle " [array] "', function(){
      var result = buildTree.getOpenapiTypeName(' [array] ');
      expect(result).to.be.equal('array');
    });

    it('should handle "[ array]"', function(){
      var result = buildTree.getOpenapiTypeName('[ array] ');
      expect(result).to.be.equal('array');
    });

    it('should handle "[array ]"', function(){
      var result = buildTree.getOpenapiTypeName('[array ] ');
      expect(result).to.be.equal('array');
    });

    it('should handle "[ array ]"', function(){
      var result = buildTree.getOpenapiTypeName('[ array ] ');
      expect(result).to.be.equal('array');
    });

    it('should handle "{map}"', function(){
      var result = buildTree.getOpenapiTypeName('{map}');
      expect(result).to.be.equal('map');
    });

    it('should handle "{map} "', function(){
      var result = buildTree.getOpenapiTypeName('{map} ');
      expect(result).to.be.equal('map');
    });

    it('should handle " {map}"', function(){
      var result = buildTree.getOpenapiTypeName(' {map}');
      expect(result).to.be.equal('map');
    });

    it('should handle " {map} "', function(){
      var result = buildTree.getOpenapiTypeName(' {map} ');
      expect(result).to.be.equal('map');
    });

    it('should handle "{ map}"', function(){
      var result = buildTree.getOpenapiTypeName('{ map}');
      expect(result).to.be.equal('map');
    });

    it('should handle "{map }"', function(){
      var result = buildTree.getOpenapiTypeName('{map }');
      expect(result).to.be.equal('map');
    });

    it('should handle "{ map }"', function(){
      var result = buildTree.getOpenapiTypeName('{ map }');
      expect(result).to.be.equal('map');
    });

    it('should handle {key,map}', function(){
      var result = buildTree.getOpenapiTypeName('{key,map}');
      expect(result).to.be.equal('map');
    });

    it('should handle { key , map }', function(){
      var result = buildTree.getOpenapiTypeName('{key,map}');
      expect(result).to.be.equal('map');
    });

    it('should fail on unexpected format {unexpected]', function(){
      try {
        var result = buildTree.getOpenapiTypeName('{unexpected]');
        expect(true).to.be.false;
      }
      catch(error) {
        expect(error).to.be.equal('Unexpected type format:{unexpected]');
      } 
    });
  });

  describe('getMapType', function(){
    it('should handle { map }', function(){
      var result = buildTree.getMapType('{ map }');
      expect(result.key).to.be.equal('name');
      expect(result.type).to.be.equal('map');
    });

    it('should handle {map}', function(){
      var result = buildTree.getMapType('{map}');
      expect(result.key).to.be.equal('name');
      expect(result.type).to.be.equal('map');
    });

    it('should handle { customkey , map }', function(){
      var result = buildTree.getMapType('{ customkey , map }');
      expect(result.key).to.be.equal('customkey');
      expect(result.type).to.be.equal('map');
    });

    it('should handle {customkey,map}', function(){
      var result = buildTree.getMapType('{customkey,map}');
      expect(result.key).to.be.equal('customkey');
      expect(result.type).to.be.equal('map');
    });

    it('should fail on unexpected format {unexpected]', function(){
      try {
        var result = buildTree.getMapType('{unexpected]');
        expect(true).to.be.false;
      }
      catch(error) {
        expect(error).to.be.equal('Unexpected type format:{unexpected]');
      } 
    });

  });

  describe('isMap', function(){
    it('should return true if {map}', function(){
      expect(buildTree.isMap('{map}')).to.be.true;
    });
    it('should return false if [array]', function(){
      expect(buildTree.isMap('[array]')).to.be.false;
    });
    it('should return false if type', function(){
      expect(buildTree.isMap('type')).to.be.false;
    });
  });

  describe('isArray', function(){
    it('should return false if {map}', function(){
      expect(buildTree.isArray('{map}')).to.be.false;
    });
    it('should return true if [array]', function(){
      expect(buildTree.isArray('[array]')).to.be.true;
    });
    it('should return false if type', function(){
      expect(buildTree.isArray('type')).to.be.false;
    });
  });

  describe('getAnchorForType', function(){
    it('should return serverObject for Server Object', function(){
      expect(buildTree.getAnchorForType('Server Object')).to.be.equal('serverObject');
    });
    it('should return server for Server', function(){
      expect(buildTree.getAnchorForType('Server')).to.be.equal('server');
    });
    it('should return serverObject for {Server Object}', function(){
      expect(buildTree.getAnchorForType('{Server Object}')).to.be.equal('serverObject');
    });
    it('should return serverObject for {name, Server Object}', function(){
      expect(buildTree.getAnchorForType('{name, Server Object}')).to.be.equal('serverObject');
    });
    it('should return serverObject for [Server Object]', function(){
      expect(buildTree.getAnchorForType('[Server Object]')).to.be.equal('serverObject');
    });
  });

  describe('updateOpenAPIAnchors', function(){
    
    var specificationUrl = "http://dummy.org";

    it('should not modify full link', function(){
      var html = '<p>Some text with a <a href="http://openapis.org">full link</a></p>';
      var modHtml = buildTree.updateOpenAPIAnchors(html, specificationUrl);
      expect(modHtml).to.be.equal(html);
    });

    it('should not modify full link with anchor', function(){
      var html = '<p>Some text with a <a href="http://openapis.org#anchor">full link</a></p>';
      var modHtml = buildTree.updateOpenAPIAnchors(html, specificationUrl);
      expect(modHtml).to.be.equal(html);
    });

    it('should modify anchor link', function(){
      var html = '<p>Some text with a <a href="#anchor">anchor link</a></p>';
      var expectedHtml = '<p>Some text with a <a href="http://dummy.org#anchor">anchor link</a></p>';
      var modHtml = buildTree.updateOpenAPIAnchors(html, specificationUrl);
      expect(modHtml).to.be.equal(expectedHtml);
    });

    it('should modify all anchor links', function(){
      var html = '<p>Some text with a <a href="#anchor">anchor link</a> and another <a href="#anchorTwo">one</a></p>';
      var expectedHtml = '<p>Some text with a <a href="http://dummy.org#anchor">anchor link</a> and another <a href="http://dummy.org#anchorTwo">one</a></p>';
      var modHtml = buildTree.updateOpenAPIAnchors(html, specificationUrl);
      expect(modHtml).to.be.equal(expectedHtml);
    });

    it('should not modify all anchor links when specificationURL is not provided', function(){
      var html = '<p>Some text with a <a href="#anchor">anchor link</a> and another <a href="#anchorTwo">one</a></p>';
      var modHtml = buildTree.updateOpenAPIAnchors(html);
      expect(modHtml).to.be.equal(html);
    });
  });

  describe('addTargetBlankToURL', function(){
    it('should add target to all links', function(){
      var html = '<p>Some text with a <a href="http://dummy.org#anchor">link</a> and another <a href="http://dummy.org">one</a></p>';
      var expectedHtml = '<p>Some text with a <a target="_blank" href="http://dummy.org#anchor">link</a> and another <a target="_blank" href="http://dummy.org">one</a></p>';
      var modHtml = buildTree.addTargetBlankToURL(html);
      expect(modHtml).to.be.equal(expectedHtml);
    });
  });

  describe('getHTMLFromMD', function(){
    it('should update anchor and add target', function(){
      var md = 'Some full [link](http://openapis.org) and some anchor [link](#anchor)';
      var expectedHtml = '<p>Some full <a target="_blank" href="http://openapis.org">link</a> and some anchor <a target="_blank" href="http://dummy.org#anchor">link</a></p>';
      var html = buildTree.getHTMLFromMD(md, "http://dummy.org");
      expect(html.trim()).to.be.equal(expectedHtml);
    })
  });

  describe('getAnchorForType', function() {
    it('should return serverObject for Server Object', function(){
      var openapiType = "Server Object";
      var expectedAnchor = "serverObject";
      var anchor = buildTree.getAnchorForType(openapiType);
      expect(anchor).to.be.equal(expectedAnchor);
    });
  });

  describe('getDocumentationUrl', function(){
    it('should return full URL for Server Object type', function(){
      var url = buildTree.getDocumentationUrl("Server Object", undefined, "http://dummy.org/path");
      expect(url).to.be.equal("http://dummy.org/path#serverObject");
    });

    it('should return full URL for serverObject anchor', function(){
      var url = buildTree.getDocumentationUrl(undefined, "serverObject", "http://dummy.org/path");
      expect(url).to.be.equal("http://dummy.org/path#serverObject");
    });
  });

  describe('updateOpenAPIExampleLinks', function(){
    it('should update all example links', function(){
      var html = '<p>Some text with a <a href="../examples/test.yaml">link</a> and another <a href="../examples/test.yaml">one</a></p>';
      var expectedHtml = '<p>Some text with a <a href="http://dummy.org/../examples/test.yaml">link</a> and another <a href="http://dummy.org/../examples/test.yaml">one</a></p>';
      var result = buildTree.updateOpenAPIExampleLinks(html, "http://dummy.org/version.md");
      expect(result).to.be.equal(expectedHtml);
    })
  });
});