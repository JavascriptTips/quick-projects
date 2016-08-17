###koa2中间写法

普通function

```
app.use((context,next)=>{

})

```
generator
```
//with warning
app.use(function *(next)=>{

})
```
co wrap
```
app.use(co.wrap(function *(context,next){

}))
```
koa-convert 包装
```
app.use(convert(function *(next){

}))
```
async/await
```
app.use(async (context,next)=>{

})
```