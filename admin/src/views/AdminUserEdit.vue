<template>
    <div id="create">
        <!-- 可以使用传递过来的id动态显示页面 -->
        <h2>{{id?"编辑管理员":"新建管理员"}}</h2>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text" v-model="model.password"></el-input>
            </el-form-item>     
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    // props属性不写在data()中
    props:{
        id:{}
    },
    data(){
        return{
            model:{
                username:"",
                password:""
            },
        }
    },
    methods:{
        // 和.then()作用类似？
        async save(){
            // 传递到接口
            let res
            if(this.id)
            {
                // 如果有id则是编辑分类功能
                res=await this.$http.put(`rest/admin_users/${this.id}`,this.model)

            }
            else{
                //没有id传过来则执行当前函数
                res=await this.$http.post('rest/admin_users',this.model)
            }
            this.$router.push('/admin_users/list')
            // elemnt ui提供的方法
            this.$message({
                    type:"success",
                    message:"保存成功"
            })
        },
        async fetch(){
            // 使用``才能使用${}进行字符串拼接
            const res=await this.$http.get(`rest/admin_users/${this.id}`)
            this.model=res.data
        },        
    },
    computed:{
        
    },
    created(){
        // 如果有id 才执行当前函数
        // ************************************************
        this.id && this.fetch()
    
    }
       
 
}
</script>