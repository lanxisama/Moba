module.exports=()=>{
    const assert =require("http-assert")
    const jwt=require("jsonwebtoken")
    const AdminUser=require('../models/AdminUser')
    return async (rq,rs,next)=>{
        //👇用户身份确认
        //校验用户是否登陆
        //获取请求头信息并解析
        //app.get('secret') 获取jwt加密密钥,定义在Index.js中
        const token=String(rq.headers.authorization || '').split(' ').pop()
        assert(token,401,"请提供jwt")
        // rq.app 就等同于外部的app
        const { id }=jwt.verify(token,rq.app.get('secret')) 
        assert(id,401,"无效的jwtoken")
        rq.user=AdminUser.findById(id)
        assert(rq.user,401,"请先登录")
        await next()
    }

}