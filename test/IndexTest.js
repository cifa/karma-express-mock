var assert = require('assert')
var plugin = require('../lib/index');
var http = require('./httpHelper');

describe('KarmaExpressMock', function() {

  var reporter;
  var config = {
    port: 3334,
    pathToConfig: '/resources/BasicConfig.json'
  };

  var mockLogger = {
    create: function() {
      return {
        debug: function(msg) {
          console.log('INFO: ' + msg);
        }
      };
    }
  };

  before(function(done) {
    reporter = new plugin['reporter:express-mock'][1](__dirname, config, mockLogger);
    setTimeout(done, 1000);
  });

  after(function(done) {
    reporter.onExit(done);
  });

  describe('With BasicConfig', function(){

    it('check the server is running', function(done){
      http.get('/templates', function(res) {
        console.log('DONE')
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.length, 2);
        assert.equal(res.body[0].id, '1');
        assert.equal(res.body[1].id, '2');
        done();
      });
    });

  });
});
