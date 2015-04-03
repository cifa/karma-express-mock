var expressMock = require('express-mock').ExpressMock;
var server;

var createExpressMock = function(basePath, config, logger) {
  logger.log('karma-express-mock.starting');
  server = new expressMock({
    'port': config.port,
    'configFilePath': basePath + config.pathToConfig
  });
  server.start(function() {
    logger.log('Karma has started Express Mock');
  })
}

var stopExpressMock = function(logger) {
  server.stop(function() {
    logger.log('Karma has stopped Express Mock');
  })
}

createExpressMock.$inject = ['config.basePath', 'config.express-mock', 'logger'];
stopExpressMock.$inject = ['logger'];

module.exports = {
  'preprocessor:express-karma': ['factory', createExpressMock],
  'reporter:express-karma': ['type', stopExpressMock]
};
