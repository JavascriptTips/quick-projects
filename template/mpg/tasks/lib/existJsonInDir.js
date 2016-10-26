/**
 * 判断文件夹内是否有json文件
 * @param dirPath
 * @returns {*}
 */
var fs = require('fs');

module.exports = function existJsonInDir(dirPath) {
  return fs.readdirSync(dirPath).some(function (file) {
    return /\.json$/.test(file);
  });
};