module.exports=app =>{
    // 使用module.exports接收一个app对象，可把主文件的app对象直接拿过来用
    const express=require("express")
    const AdminUser=require('../../models/AdminUser')
    const assert =require("http-assert")
    const jwt=require("jsonwebtoken")
    const router=express.Router({
        mergeParams:true
        // 想要路由中传递的参数在其他位置也能调用需要加的参数
    })

        //登陆校验中间件
    const authMiddleware=require("../../middleware/auth")
        //资源中间件
    const resourceMiddleware= require("../../middleware/resource")
    /*通用CreateUpdateReadDelete接口 */
    //创建分类接口
    router.post('/',async(rq,rs)=>{
       const model = await rq.Model.create(rq.body)
       rs.send(model)
    })

    //请求创建好的分类 并发送给前端
    router.get('/',
    async(rq,rs)=>{
        // .populate属性用来查询数据库中有关联(ref)属性的
        //输出的parent不再是一个key值 而是一个对象
        const queryOption={}
        // modelName属性获取模型的名称
        if(rq.Model.modelName==='Category')
        {
            queryOption.populate='parent'
        }
        const items = await rq.Model.find().setOptions(queryOption).limit(100) //.limit()限制取10条数据
        //将请求到的数据发送给前端
        rs.send(items)
     })
    
     //获取详情
    //里面的url是前端在使用vue-resource时候请求的url
    router.get('/:id',async(rq,rs)=>{
        const model = await rq.Model.findById(rq.params.id)
        //将请求到的数据发送给前端
        rs.send(model)
    })
    //修改分类接口
    router.put('/:id',async(rq,rs)=>{
        // 参数一个是当前修改的id 一个是需要修改的内容
        const model = await rq.Model.findByIdAndUpdate(rq.params.id,rq.body)
        rs.send(model)
     })

    //删除分类接口
    router.delete('/:id',async(rq,rs)=>{
        // 参数一个是当前修改的id 一个是需要修改的内容
       
        await rq.Model.findByIdAndDelete(rq.params.id)
        rs.send({
            success:true
        })
    })


    //添加一个中间件函数 获取传递过来的模型
    // 这是一个链式操作
    app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware()
    ,router)

    //upload接口 负责上传图片
    const multer=require('multer')
    // dest属性表示文件上传的地址 必须是绝对路径
    const multerObj=multer({
        // __dirname 当前文件所在文件夹
        dest:__dirname+"/../../uploads"
    })
    // multerObj表示接收单个数据 字段为file
    app.post('/admin/api/upload',authMiddleware(),multerObj.single('file'),async(rq,rs)=>{
            const file=rq.file
            file.url=`http://localhost:3000/uploads/${file.filename}`
            rs.send(file)
    })


    //登陆接口
    app.post("/admin/api/login",async (rq,rs)=>{
            //获取服务端发来的所有数据
            //直接取到rq.body中的username和password对应赋值
            const {username,password}=rq.body
            //数据库字段:从客户端获取的用户名字段
            const user=await AdminUser.findOne({
                username:username
            }).select("+password")
            //user存在，不抛出异常
            //如果user不存在,则设置状态吗422,并抛出异常
            assert(user,422,"用户不存在")
            // if(!user)
            // {
            //     //用户名不存在
            //     return rs.status(422).send({
            //         message:"用户不存在"
            //     })
            // }
            var isTrue=require("bcrypt").compareSync(password,user.password)
            assert(isTrue,422,"密码错误")
            // if(!isTrue)
            // {
            //       //密码错误
            //       return rs.status(422).send({
            //         message:"密码错误"
            //     })
            // }
            //如果前面都没有返回,则用户输入信息正确，向客户端返回token
            //第二个参数是一个密钥 负责加密
            
            const token=jwt.sign({
                id:user._id
            },
            app.get('secret'))
            rs.send(
                {token,username}
                )
    })
    

    //统一的错误处理
    app.use(async (err,rq,rs,next)=>{
            rs.status(err.statusCode||500).send({
                message:err.message
            })
    })
}


 