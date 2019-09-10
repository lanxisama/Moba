module.exports=()=>{
    return async(rq,rs,next)=>{
        //👇确认是哪个数据库
        const ModelName=require('inflection').classify(rq.params.resource) 
        // 并且将Model加到rq当中 这样可以在其他地方rq.获取到
        rq.Model=require(`../models/${ModelName}`)
        next()
    }
}