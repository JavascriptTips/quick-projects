var spawn = require('child_process').spawn;
var winston = require('winston');

const __DEBUG__ = process.env.NODE_ENV !== 'product' && process.env.NODE_ENV !== 'production'


var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: './file.log' })
  ]
});

logger.level = __DEBUG__ ? 'debug' : 'info';

global.__DEBUG__ = __DEBUG__;

//挂到全局
global.log = function(){
  logger.info.apply(logger,arguments);
};
['debug','error'].forEach(function (level) {
  global[level] = function(){
    logger[level].apply(logger,arguments);
  }
});

const port = 8999;

var koaApp = require('../app');
koaApp.listen(port);


log(`on ${port}`);

//if(__DEBUG__){
//  var p = spawn('webpack-dev-server',[
//    '--content-base',
//    './public',
//    '--progress',
//    '--inline',
//    '--hot',
//    '--port',
//    '8998'
//  ]);
//  p.stdout.pipe(process.stdout);
//}

