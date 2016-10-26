var json = [
  
    'fuck_him',
  
];
var png = [
  
];

module.exports = function (add,callback) {

  add(json,'json','')
  .add(png,'png','')
  .load(callback);
}