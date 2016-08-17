/**
 * Created by zyg on 16/8/12.
 */
var fs = require('fs');
/**
 * @param path 文件路径
 */
module.exports = (jsonPath)=>{
  var r = null;

  if(fs.existsSync(jsonPath)){

    var str = fs.readFileSync(jsonPath).toString()

    try{
      r = JSON.parse(str);
    }catch(e){
      console.log('readJson catch:',e);
    }
  }


  return r;
};