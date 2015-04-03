var assert = require('assert')
var plugin = require('../lib/index');
var http = require('./httpHelper');

describe('KarmaExpressMock', function() {

  var config = {
    port: 3333,
    pathToConfig: '/test/resources/BasicConfig.json'
  };

  before(function(done) {
    plugin['preprocessor:express-karma'][1](__dirname + '/..', config, console);
    setTimeout(done, 1000);
  });

  after(function(done) {
    plugin['reporter:express-karma'][1](console);
    setTimeout(done, 1000);
  });

  describe('With BasicConfig', function(){

    it('check the server is running', function(done){
      http.get('/templates', function(res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 2);
        assert.equal(res.body[0].id, '1');
        assert.equal(res.body[1].id, '2');
        done();
      });
    });

  });
});
