#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');

var copy = require('./lib/copy');

var execFile = require('child_process').execFile;

var commander = require('commander');

var packageObj = JSON.parse(fs.readFileSync(path.resolve(__dirname,'./package.json')).toString())

//当前目录文件夹
var cwd = process.cwd();

var afterExecFile = path.resolve(__dirname,'./afterCopyDone.sh')

function projectMap(p){

  var m = {
    rre:'react-redux-express',
    n:'node-module',
  };

  return m[p] ? m[p] : p;
}

commander
  .version(packageObj.version)
  .option('-p, --project [value]','template name')
  .option('-n, --name [value]','project name')
  .option('-v, --version','cli version')
  .parse(process.argv);

commander.project = projectMap(commander.project)

var commonDir = path.resolve(__dirname,'./common')

var templateDir = path.resolve(__dirname,'./template',commander.project);
var targetDir = path.resolve(cwd,commander.name);

if(fs.existsSync(templateDir)){
  //clone common files
  copy(commonDir,targetDir)

  //clone project
  copy(templateDir, targetDir);
  //替换名字
  var packageFilePath = path.join(targetDir,'package.json')

  var targetPackageObj = JSON.parse(fs.readFileSync(packageFilePath).toString())

  targetPackageObj.name = commander.name
  targetPackageObj.description = commander.name

  fs.writeFileSync(packageFilePath,JSON.stringify(targetPackageObj,null,2))


  execFile(afterExecFile,{
    cwd:targetDir
  })

}else{
  throw new Error('project not found')
}
console.log('copy done');