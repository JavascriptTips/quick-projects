/**
 * Created by zyg on 16/10/10.
 */



module.exports = function(commander,config){

  commander
    .command('ls')
    .action(()=>{
      console.log('当前模版列表：')
      console.log(JSON.stringify(config.tempList,null,2));
    })
};