#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');

var copy = require('./copy');

var commander = require('commander');

var packageObj = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./package.json')).toString())

//当前目录文件夹
var cwd = process.cwd();

commander
  .version(packageObj.version)
  .option('-p, --project [value]','template name')
  .option('-n, --name [value]','project name')
  .parse(process.argv);


var templateDir = path.resolve(__dirname,'./template',commander.project);
var targetDir = path.resolve(cwd,commander.name);

if(fs.existsSync(templateDir)){
  copy(
    templateDir,
    targetDir
  );
}
console.log('copy done');


//替换名字
var packageFilePath = path.join(targetDir,'package.json')


var packageObj = JSON.parse(fs.readFileSync(packageFilePath).toString())


packageObj.name = commander.name
packageObj.description = commander.name

fs.writeFileSync(packageFilePath,JSON.stringify(packageObj,null,2))