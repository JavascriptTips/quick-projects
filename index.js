#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');

var copy = require('./copy');

var commander = require('commander');

var packageObj = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./package.json')).toString())

//当前目录文件夹
var cwd = process.cwd();

function projectMap(p){

  var m = {
    rre:'react-redux-express'
  }
  return m[p] ? m[p] : p;
}

function copyCommon(){

}

commander
  .version(packageObj.version)
  .option('-p, --project [value]','template name')
  .option('-n, --name [value]','project name')
  .parse(process.argv);

commander.project = projectMap(commander.project)

var commonDir = path.resolve(__dirname,'./template','./common')

var templateDir = path.resolve(__dirname,'./template',commander.project);
var targetDir = path.resolve(cwd,commander.name);

if(fs.existsSync(templateDir)){
  //clone project
  copy(templateDir, targetDir);
  //clone common files
  copy(commonDir,targetDir)
  //替换名字
  var packageFilePath = path.join(targetDir,'package.json')

  var packageObj = JSON.parse(fs.readFileSync(packageFilePath).toString())

  packageObj.name = commander.name
  packageObj.description = commander.name

  fs.writeFileSync(packageFilePath,JSON.stringify(packageObj,null,2))

}else{
  throw new Error('project not found')
}
console.log('copy done');