var path = require('path');

var rename = require('gulp-rename');
var download = require('gulp-download');
var unzip = require('gulp-unzip');

var fs = require('fs');
var spawn = require('child_process').spawn;

var filesInZip = [
  'sprite.js',
  '*.json',
  '*.png'
];

//module.exports = function(cwd,name,withSprite,dest){
module.exports = function(zipFile,withDirectory){
  console.log(zipFile);

  var fileObj = path.parse(zipFile);

  if(withDirectory){
    dest = fileObj.name;
  }else{
    dest = '.';
  }
  var cwd = fileObj.dir;

  var indexJs = path.join(cwd,dest,'index.js');

  var args = [
    '-d',
    dest,
    '-o',
    fileObj.base
  ];

  if(fs.existsSync(indexJs)){
    args = args.concat(filesInZip);
  }

  return new Promise(function (resolve) {

    var unzip = spawn('unzip',args,{
      cwd:cwd
    });

    unzip.on('error', function (err) {
      console.log('err:',err);
    });
    unzip.stderr.on('data', function (data){
      console.log('data:',data.toString());
    });

    unzip.on('close', function (code) {
      console.log('close code',code);
      resolve();
    });
  });
};