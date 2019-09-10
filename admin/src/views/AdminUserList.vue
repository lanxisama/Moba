<template>
    <div id="create">
    <h2>管理员列表</h2>
    <el-table :data="users">
        <!-- prop是数据的名称 数据库中的名称 -->
        <el-table-column prop="_id" label="id" width="230">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="230">
        </el-table-column>

         <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <!-- scope.row表示当前行的数据 scope.row._id可以获取当前行的id -->
                <!-- 这里不能用this.$router 应使用全局-->
                <el-button type="primary" size="small" @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
                  <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            users:[
                {
                    username:"",
                    password:""
                }
            ]
        }
    },
    methods:{
        // async 声明一个异步函数
        async fetch(){
            const res=await this.$http.get('rest/admin_users')
            this.users=res.data
            console.log(res.data)
            // console.log(res)
        },
        async remove(data)
        {
            console.log("删除成功")
            this.$confirm(`是否删除${data.name}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
            const res= await this.$http.delete(`rest/admin_users/${data._id}`)
            // 重新获取数据
            this.fetch()
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
            })
   
 
        }
    },
    computed:{
        
    },
    created(){
           this.fetch()
    }
 
}
</script>