module.exports=app=>{
    const mongoose=require("mongoose")
    mongoose.connect("mongodb://127.0.0.1:27017/node-vue-moba",{
      useNewUrlParser:true  
    })

    //将所有模型导入
    require('require-all')(__dirname+'/../models')
}