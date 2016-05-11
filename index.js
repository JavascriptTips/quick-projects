#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');

var copy = require('./copy');

var execFile = require('child_process').execFile;

var commander = require('commander');

//当前目录文件夹
var cwd = process.cwd();

commander
  .version('0.0.1')
  .option('-p, --project [value]','project name')
  .parse(process.argv);


var templateDir = path.resolve(__dirname,'./template',commander.project);
var targetDir = path.resolve(cwd,commander.project);

if(fs.existsSync(templateDir)){
  copy(
    templateDir,
    targetDir
  );
}
console.log('copy done');
