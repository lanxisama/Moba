const mongoose=require("mongoose")
// 添加一个模式
// mongoose知识点
const schema =new mongoose.Schema({
    name:{type:String},
    // 表示这是数据库里的一个objectId
    //ref指定关联的模型
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}
})
//设置子分类
schema.virtual('children',{
    localField:"_id",
    foreignField:'parent',
    justOne:false,
    ref:"Category"
})


schema.virtual('newsList',{
    localField:"_id",
    foreignField:'categories',  //外键
    justOne:false,
    ref:"Article"
})
//category对应的是 modelName属性 可.modelName获取
module.exports=mongoose.model('Category',schema)