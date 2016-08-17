/**
 * Created by zyg on 16/8/8.
 */
var path = require('path');


var koa = require('koa')
var convert = require('koa-convert');
var ejsConfig = require('koa-ejs');
var staticConfig = require('koa-static')

var requests = require('koa-log-requests');

var router = require('./router')

var app = new koa();

app.use(convert(requests()));

ejsConfig(app,{
  root: path.join(__dirname, 'views'),
  layout: '',
  viewExt: 'html',
  cache: false,
  debug: true
})

app.use(convert(staticConfig('public', {
})));

//简写
app.use(convert(function *(next){
  this.req = this.request;
  yield next;
}));

app.use(convert(router.routes()))
  .use(convert(router.allowedMethods()));

app.use(convert(function *(next){
  this.body = 'NOT FOUND'
}));

module.exports = app;