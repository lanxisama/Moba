const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const schema=new mongoose.Schema({
    username:{type:String},
    password:{type:String,set:function(val) {
            return bcrypt.hashSync(val,10) //加密指数 越高越安全,但是越耗时
    },
    select:false
    }
    // set参数是一个函数 可以将用户输入的数据处理后再存入数据库
    //select属性为false表示这个字段不能被读取,防止在编辑页面时，对已经加密的密文在加密
})

module.exports=mongoose.model('AdminUser',schema)