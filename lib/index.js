var expressMock = require('express-mock').ExpressMock;

var runExpressMock = function(basePath, config, logger) {
  var log = logger.create('express-mock');
  log.debug('karma-express-mock.starting');

  var server = new expressMock({
    'port': config.port,
    'configFilePath': basePath + config.pathToConfig
  });

  server.start(function() {
    log.debug('Karma has started Express Mock');
  });

  this.onExit = function(done) {
    log.debug('karma-express-mock.stopping');
    server.stop(function() {
      log.debug('Karma has stopped Express Mock');
      done();
    });
  };
}

runExpressMock.$inject = ['config.basePath', 'config.expressMock', 'logger'];

module.exports = {
  'reporter:express-mock': ['type', runExpressMock]
};
