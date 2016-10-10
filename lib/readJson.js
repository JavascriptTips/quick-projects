var fs = require('fs');

module.exports = (p)=>{

  return JSON.parse(fs.readFileSync(p).toString());
};