var path = require('path');

var rename = require('gulp-rename');
var download = require('gulp-download');
var unzip = require('gulp-unzip');

var fs = require('fs');
var spawn = require('child_process').spawn;

module.exports = function(gulp,downloadUrls,saveDir,names){
  var i = 0;

  return download(downloadUrls)
    .pipe(rename(function (path) {
      path.basename = names[i];
      path.extname = '.zip';
      return path;
    }))
    .pipe(gulp.dest(function(args){
      var nameIndex = parseInt(i++);

      return path.join(saveDir,names[nameIndex]);
    }));
};