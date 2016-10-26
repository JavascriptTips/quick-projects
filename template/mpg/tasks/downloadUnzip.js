/**
 * Created by zyg on 16/2/1.
 */
var path = require('path');

var rename = require('gulp-rename');
var download = require('gulp-download');
var unzip = require('gulp-unzip');

var fs = require('fs');
var spawn = require('child_process').spawn;

var __DEBUG__ = require('./../env').__DEBUG__;

var downloadZip = require('./lib/downloadZip');
var unzipDownload = require('./lib/unzipDownload');

var packageJsonPath = path.resolve(__dirname,'../package.json');

var server = __DEBUG__ ? 'http://localhost:1414/' :  'http://www.magicalpixi.com/';
//资源名字
var downloadMaterialNames = [];
//var downloadMaterialNames = [
// 'sheren',
//];

//资源下载链接
var downloadUrls = [];

//根据package.json的sceneEdit字段，建立
//精灵已经包含在场景中

var filesInZip = [
  'sprite.js',
  '*.json',
  '*.png'
];

var saveSpritesDir = path.resolve(__dirname,'../src/sprites/');

if(!fs.existsSync(saveSpritesDir)){
  fs.mkdirSync(saveSpritesDir);
}

module.exports = function (gulp) {

  gulp.task('down-before', function () {
    var packageJsonObj = JSON.parse(fs.readFileSync(packageJsonPath).toString());

    var resources = packageJsonObj.resources || [];
    var scenes = packageJsonObj.scenes || {};

    var sceneResources = Object.keys(scenes).map(function (sceneName) {
      return scenes[sceneName]
    }).reduce(function (resources,nextResources) {
      return resources.concat(nextResources);
    },[]);

    downloadMaterialNames = [...new Set(resources.concat(sceneResources))];

    //构建 下载精灵 和场景 的链接
    downloadUrls = downloadMaterialNames.map(function (name) {
      return `${server}api/buildDownloadZip?name=${name}`;
    });
  });

  //下载，
  gulp.task('down-ing',['down-before'],function () {

    return downloadZip(gulp,downloadUrls,saveSpritesDir,downloadMaterialNames);
  });

  //解压
  gulp.task('down',['down-ing'], function () {
    downloadMaterialNames.map(function (name) {
      var zipFile = path.join(saveSpritesDir,name,name);

      return  unzipDownload(zipFile);
    });
  });
};