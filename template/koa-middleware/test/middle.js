/**
 * Created by zyg on 16/10/2.
 */
var koa = require('koa')

var myMiddleWare = require('../index');

var app = koa();

app.use(myMiddleWare({

}));

app.use(function *() {


  console.log(this.request);

  this.body = '登录成功'
});


app.listen(3000);