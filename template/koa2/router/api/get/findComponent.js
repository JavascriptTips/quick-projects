/**
 * Created by zyg on 16/8/11.
 */

module.exports = function *(next){
  var cptName = this.req.query.name;

  this.body = {
    success:true,
    data:cptName
  };
};