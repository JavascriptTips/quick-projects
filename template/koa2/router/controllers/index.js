/**
 * Created by zyg on 16/8/8.
 */


module.exports = function *(next){
  yield this.render('index')
}