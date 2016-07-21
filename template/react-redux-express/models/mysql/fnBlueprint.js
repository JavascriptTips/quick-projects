/**
 * Created by zyg on 16/6/16.
 */
const FIND_ALL = 'findAll';
const UPDATE = 'update';
const CREATE = 'create';
const DELETE = 'delete'

const defaultOpenAction = [
  FIND_ALL,
  CREATE,
  UPDATE,
  DELETE,
]

var codeMap = (c)=> {
  var m = {
    1: '非法action',
    2: 'mysql操作出错',
    3:'update没有带id',
    4:'更新失败，没有对应的数据',
  }
  return m[c] || c;
}

var wrapper = (definedModel, option)=> {

  if(!option){
    option = {};
  }

  if (!option.openAction) {
    option.openAction = []
  }

  var withState = option.withState;

  var openAction = defaultOpenAction.concat(option.openAction)

  var op = (action, args)=> {
    if(!args){
      args = {}
    }

    return new Promise((resolve, reject)=> {

      if (openAction.indexOf(action) === -1) {
        return reject({
          code: 1
        })
      }

      var error = null;
      //
      switch (action){
        case CREATE:

          if(args.id === null || args.id === undefined || args.id === 'null' ||args.id === 'undefined'){
            delete args.id;
          }

          break;

        case DELETE:
          if(args.id !== undefined) {
            action = UPDATE;

            args = [{
              state:1
            },{
              where:{
                id:args.id
              }
            }];

          }else{
            error = {
              code:3
            }
          }
          break;
        case UPDATE:
          if(args.id !== undefined){
            var id = args.id;
            delete args.id;

            args = [args,{
              where:{
                id,
              }
            }];
          }else{
            error = {
              code:3
            }
          }
          break;
        case FIND_ALL:

          if(!args.id && args.id !==0 ){
            delete args.id;
          }

          args = [{
            where:Object.assign({},args)
          }]

          if(withState){
            args[0].where.state = {
              $not:1
            }
          }

          break;
      }

      if(error){
        reject(error)
      }else{
        resolve(args);
      }

    }).then(fixedArgs=>{
        if(!fixedArgs){
          fixedArgs = {};
        }

        fixedArgs = [].concat(fixedArgs);

        console.log('final args',fixedArgs);

        return new Promise((resolve,reject)=>{

          definedModel[action].apply(definedModel,fixedArgs).then(data=> {

            if(action === UPDATE){

              if(data[0] === 0){
                return reject({
                  code:4
                });
              }else{

                return resolve(data)
              }
            }else{

              return resolve([].concat(data))
            }
          }, e=> {
            reject({
              code: 2,
              error: e
            });
          });
        })
      },error=>{
        return new Promise((r,reject)=>{
          reject(error);
        })
      })
  }

  op.codeMap = codeMap

  op.defineModel = definedModel

  return op
}

wrapper.FIND_ALL = FIND_ALL;
wrapper.UPDATE = UPDATE
wrapper.CREATE = CREATE
wrapper.DELETE = DELETE

module.exports = wrapper