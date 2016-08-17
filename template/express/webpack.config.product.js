var basicConfig = require('./webpack.config');

var definePlugin = new webpack.DefinePlugin({
  env:{
    isDevelopment:false
  }
});



var uglify = new webpack.optimize.UglifyJsPlugin({
  compress:{
    warnings:false
  }
});

basicConfig.plugins.push(uglify);