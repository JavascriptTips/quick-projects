/**
 * Created by zyg on 16/8/8.
 */
var path = require('path')
var router = require('koa-router')();

var _ = require('lodash')

var requireDir = require('../services/utils/requireDir')


var controllerDir = path.join(__dirname,'./controllers');
var controllerDirObj = requireDir(controllerDir);

var apiDir = path.join(__dirname,'./api')
var apiDirObj = requireDir(apiDir);


function loadRouter(r,obj,method,prePath){
  Object.keys(obj).map(key=>{
    var path = key === 'index' ? '' : key;

    var fn = obj[key];


    if(_.isPlainObject(fn)){
      loadRouter(r,fn,key,prePath);
    }else{
      console.log(`load ${method} ${prePath}${path}`);
      r[method](`${prePath}${path}`,fn);
    }
  })
}

loadRouter(router,controllerDirObj,'get','/');
loadRouter(router,apiDirObj,'get','/api/')


module.exports = router;