const express=require("express")

const app=express()
// const history=require("connect-history-api-fallback")
// app.use(history()) 
 
app.use(express.json())
app.use(require("cors")())

//配置密钥
app.set('secret','sadadiu34125')

// !!!
// uploads文件夹下都是静态的
//托管静态文件后 uploads中的文件可以通过/uploads得到
app.use('/uploads',express.static(__dirname+'/uploads'))

/*
现在的问题是 只有访问根路径时候页面可以正常显示,/admin or /web设置子路径时候显示不了页面
*/
app.use('/',express.static(__dirname+'/web'))
app.use('/admin',express.static(__dirname+"/admin"))
//向路由传递参数 app
//方便在路由内部也可以使用主文件中的app对象
require('./routes/admin')(app)
require('./routes/web')(app)
require('./plugins/db')(app)



app.listen(3000,()=>{
    console.log("http://localhost:3000");
})