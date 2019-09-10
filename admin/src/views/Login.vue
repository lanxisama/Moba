<template>
    <div id="login">
        <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item>
                     <el-button type="primary" native-type="submit">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name:"login",
    data(){
        return{
          model:{
               username:"",
               password:"" 
          }
        }
    },
    methods:{
        async login(){
            // console.log(this.model)
            const res = await this.$http.post("/login",this.model)
            // console.log(res.data)
            localStorage.token=res.data.token
            this.$router.push("/")
            this.$message({
                type:'success',
                message:`登陆成功,欢迎${res.data.username}` 
            })
        }
    }
}
</script>

<style scoped>
.login-card
{
    width: 25rem;
    margin: 10rem auto;
}
 
</style>