var expressMock = require('express-mock').ExpressMock;
var server;

var createExpressMock = function(basePath, config, logger) {
  var log = logger.create('express-mock');
  log.info('karma-express-mock.starting');
  server = new expressMock({
    'port': config.port,
    'configFilePath': basePath + config.pathToConfig
  });
  server.start(function() {
    log.info('Karma has started Express Mock');
  })
}

var stopExpressMock = function(logger) {
  var log = logger.create('express-mock');

  this.onExit = function(done) {
    server.stop(function() {
      log.info('Karma has stopped Express Mock');
      done();
    });
  };
}

createExpressMock.$inject = ['config.basePath', 'config.expressMock', 'logger'];
stopExpressMock.$inject = ['logger'];

module.exports = {
  'preprocessor:express-karma': ['factory', createExpressMock],
  'reporter:express-karma': ['type', stopExpressMock]
};
