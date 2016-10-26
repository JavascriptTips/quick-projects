/**
 * Created by zyg on 16/4/2.
 */
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var downloadZip = require('./lib/downloadZip');
var unzipDonwload = require('./lib/unzipDownload');

var sceneBuild = require('./lib/sceneBuild');

var __DEBUG__ = require('./../env').__DEBUG__;

var packageJsonPath = path.resolve(__dirname,'../package.json');

var scenesDir = path.resolve(__dirname,'../src/scenes/');
if(!fs.existsSync(scenesDir)){
  fs.mkdirSync(scenesDir);
}

var saveSpritesDir = path.resolve(__dirname,'../src/sprites/');
if(!fs.existsSync(saveSpritesDir)){
  fs.mkdirSync(saveSpritesDir);
}

var server = __DEBUG__ ? 'http://localhost:1414' : 'http://www.magicalpixi.com/';


module.exports = function (gulp) {

  var scenes = null;
  var scenesEdit = null;

  gulp.task('scene-before', function () {
    var packageJsonObj = JSON.parse(fs.readFileSync(packageJsonPath).toString());

    scenes = packageJsonObj.scenes;
    scenesEdit = packageJsonObj.scenesEdit;
  });

  gulp.task('scene',['scene-before'], function () {

    Object.keys(scenes).map(function (sceneName) {

      var sceneDir = path.join(scenesDir,sceneName);
      var sceneResources = scenes[sceneName].map(function (name) {
        return path.join(saveSpritesDir,name);
      });

      sceneBuild(sceneDir,sceneResources)
    });
  });

  //--------------------------//


  gulp.task('sceneEdit-down',['scene-before'],function () {
    var sceneDownUrls = scenesEdit.map(sceneName=>{
      return `${server}/api/sceneDownload?sceneTitle=${encodeURIComponent(sceneName)}`
    });

    return downloadZip(gulp,sceneDownUrls,saveSpritesDir,scenesEdit)
  });
  gulp.task('sceneEdit',['sceneEdit-down'], function () {

    //场景文件夹
    var sceneSpriteDirs = [];

    //二维数组
    var sceneSpriteNamesArr = [];

    //下载，解压，再解压。
    Promise.all(scenesEdit.map(sceneName=>{
      var sceneCwd = path.join(saveSpritesDir,sceneName);
      var sceneZipFile = path.join(sceneCwd,`${sceneName}.zip`);

      sceneSpriteDirs.push(sceneCwd);

      return unzipDonwload(sceneZipFile);
    })).then(function () {

      return Promise.all(scenesEdit.map(sceneName=>{
        var downloadZip = path.join(saveSpritesDir,sceneName,`${sceneName}.zip`);
        return new Promise(function (resolve) {
          fs.unlink(downloadZip,resolve);
        })
      }));
    }).then(function () {

      return Promise.all(sceneSpriteDirs.map(sceneSpriteDir=>{
        return fs.readdirSync(sceneSpriteDir).filter(function (file) {

          return /\.zip$/.test(file);
        }).map(function (zipFile) {

          return path.join(sceneSpriteDir,zipFile);
        });
      }).reduce(function(preFiles,nextFiles){

        sceneSpriteNamesArr.push(nextFiles.map(file=>path.parse(file).name));

        return preFiles.concat(nextFiles);
      },[]).map(function (zipFile) {

        return unzipDonwload(zipFile,true);
      }));
    }).then(function(){
      //全部解压完毕
      scenesEdit.map((sceneName,i)=>{

        var targetSceneDir = path.join(scenesDir,sceneName);

        var sceneSpriteDir = path.join(saveSpritesDir,sceneName);

        var sceneSpriteNameDirs = sceneSpriteNamesArr[i].map(function (spriteName) {
          return path.join(sceneSpriteDir,spriteName)
        });

        sceneBuild(targetSceneDir,sceneSpriteNameDirs,sceneName);
      });
    }).catch(console.log.bind(console));
  });
};
