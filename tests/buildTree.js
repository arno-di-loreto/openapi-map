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
});