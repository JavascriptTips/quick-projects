var fs = require('fs');
var path = require('path');

function copy(src,dest){

  var srcStat = fs.lstatSync(src);

  if(srcStat.isDirectory()){

    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest);
    }

    fs.readdirSync(src).forEach(function (filePath) {
      copy(path.join(src,filePath),path.join(dest,filePath));
    });
  }else{
    fs.writeFileSync(dest,fs.readFileSync(src));
  }
}

module.exports = copy;
