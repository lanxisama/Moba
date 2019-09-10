import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http=axios.create(
    {
        baseURL:process.env.VUE_APP_API_URL ||'/admin/api',
        // baseURL:"http://localhost:3000/admin/api"
    }
)

//http.interceptors 拦截器

//设置请求头
 
http.interceptors.request.use(function(config){
   if(localStorage.token){
        config.headers.Authorization='Bearer '+(localStorage.token|| '')
   }
    return config;
},function(error){
    return Promise.reject(error)
})




//👇在全局进行错误处理 接收服务端返回的错误信息
http.interceptors.response.use(res=>{
    return res
},
err=>{
    //element-ui中的$message方法
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
        if(err.response.status===401)
        {
           router.push("/login")
        }
    }
    //err.name
    //err.response
    //err.response.data
    return Promise.reject(err)
})
export default http