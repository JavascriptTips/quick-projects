#!/usr/local/bin/node
var path = require('path')
var fs = require('fs')
var homedir = require('os').homedir();
var commander = require('commander');
var readJson = require('./lib/readJson');

//通用
const commonDir = path.resolve(__dirname,'./common');
//模版所在文件夹
const templateDir = path.resolve(__dirname,'./template/');
//当前
const cwd = process.cwd();

const curPackagePath = path.resolve(__dirname,'./package.json');

const version = readJson(curPackagePath).version;

const tempList = fs.readdirSync(templateDir);

commander.version(version);

var config = {
  commonDir,
  templateDir,
  cwd,
  tempList,
  version
};

require('./commanders/g')(commander,config);
require('./commanders/ls')(commander,config);

commander.parse(process.argv);
