/**
 * Created by zyg on 16/8/8.
 */
var fs = require('fs')
var path = require('path')

const requireDir = (dirPath)=>{
  var r = {};

  if(fs.existsSync(dirPath)){

    fs.readdirSync(dirPath).map((fileName)=>{
      var k = fileName.replace('.js','');

      var filePath = path.join(dirPath,fileName);

      if(fs.lstatSync(filePath).isDirectory()){
        return {
          [k]:requireDir(filePath),
        }
      }else{
        return {
          [k]:require(filePath)
        }
      }
    }).reduce((init,next)=>{
      return Object.assign(init,next)
    },r)
  }

  return r;
}

module.exports = requireDir