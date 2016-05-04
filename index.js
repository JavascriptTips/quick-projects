#!/usr/local/bin/node
var fs = require('fs');
var path = require('path');

var copy = require('./copy');

var execFile = require('child_process').execFile;

var argv = process.argv.slice(2);
//工程名字
var projectName = argv[0];

//模板名字
var templateName = argv[1];

//当前目录文件夹
var cwd = process.cwd();

var projectDir = path.resolve(cwd,projectName);
//git init shell

copy(
  path.resolve(__dirname,'./template',templateName),
  projectDir
);

//var gitInitSh = path.resolve(__dirname,'gitInit.sh');

//const child = execFile(gitInitSh, [projectDir,projectName], (error, stdout, stderr) => {
//  if (error) {
//    throw error;
//  }
//  console.log(stdout);
//});