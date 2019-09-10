const mongoose=require("mongoose")
// 添加一个模式
// mongoose知识点
const schema =new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    title:{type:String},
    banner:{type:String},
    //分类属性于另外一个模型Category做关联
    //用数组表示这个属性于Category中多个数据有关联
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"Category"}],
    scores:{
        difficult:{type:Number},
        skill:{type:Number},
        attack:{type:Number},
        survive:{type:Number},
    },
    skills:[{
        icon:{type:String},
        name:{type:String},
        delay:{type:String}, //cd
        cost:{type:Number}, //蓝耗
        description:{type:String}, 
        tips:{type:String}
    }],
    // 顺风
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:"Item"}],
    // 逆风
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:"Item"}],
    // 使用技巧
    usageTips:{type:String},
    //战斗技巧
    battleTips:{type:String},
    //团战技巧
    teamTips:{type:String},
    //伙伴关系
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String },
      }],
})
//category对应的是 modelName属性 可.modelName获取
module.exports=mongoose.model('Hero',schema,'heroes')