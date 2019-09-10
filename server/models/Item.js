const mongoose=require("mongoose")
// 添加一个模式
// mongoose知识点
const schema =new mongoose.Schema({
    name:{type:String},
    icon:{type:String},
})
//category对应的是 modelName属性 可.modelName获取
module.exports=mongoose.model('Item',schema)