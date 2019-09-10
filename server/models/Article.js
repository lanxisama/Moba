const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}]
    ,title:{type:String},
    content:{type:String}
    },
    {
        // 创建时自动添加时间戳
        timestamps:true
    })
//集合名字默认是第一个参数的小写复数形式
module.exports=mongoose.model('Article',schema,'articles')