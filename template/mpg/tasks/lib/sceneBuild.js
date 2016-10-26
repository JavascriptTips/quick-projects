/**
 * Created by zyg on 16/4/10.
 */
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var sceneIndexFileName = 'index.js';
var addResourceFileName = 'addResource.js';

var addResourceFn = ejs.compile(fs.readFileSync(path.resolve(__dirname,'../sceneTemp/addResource.ejs')).toString());
var sceneFn = ejs.compile(fs.readFileSync(path.resolve(__dirname,'../sceneTemp/scene.ejs')).toString());

function existJsonInDir(dirPath){
  return fs.readdirSync(dirPath).some(function (file) {
    return /\.json$/.test(file);
  });
}


module.exports = function (sceneDir,sceneResourceDirs,withScenePre){

  var indexFilePath = path.join(sceneDir,sceneIndexFileName);
  var addResourceFilePath = path.join(sceneDir,addResourceFileName);

  if(!fs.existsSync(sceneDir)){
    fs.mkdirSync(sceneDir)
  }

  if(!fs.existsSync(indexFilePath)){
    fs.writeFileSync(indexFilePath,sceneFn())
  }

  var png = [];
  var json = [];

  sceneResourceDirs.map(function (resourceDir,i) {
    var spriteName = path.parse(resourceDir).name;

    if(existJsonInDir(resourceDir)){
      json.push(spriteName);
    }else{
      png.push(spriteName);
    }
  });

  fs.writeFileSync(addResourceFilePath,addResourceFn({
    png,
    json,
    sceneTitle:withScenePre
  }));
};