<template>
    <div id="create">
        <!-- 可以使用传递过来的id动态显示页面 -->
        <h2>{{id?"编辑物品":"新建物品"}}</h2>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
 
                <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :headers="getHeaders()"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                            
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
            model:{},
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
                res=await this.$http.put(`rest/items/${this.id}`,this.model)

            }
            else{
                //没有id传过来则执行当前函数
                res=await this.$http.post('rest/items',this.model)
            }
            this.$router.push('/items/list')
            // elemnt ui提供的方法
            this.$message({
                    type:"success",
                    message:"保存成功"
            })
        },
        async fetch(){
            // 使用``才能使用${}进行字符串拼接
            const res=await this.$http.get(`rest/items/${this.id}`)
            this.model=res.data
        },
        afterUpload(rs)
        {
            console.log(rs)
            // 因为一开始model中没有任何子集 所以在添加icon属性时可能会添加不上 所以这里采用一个显式赋值
            // this.model.icon=rs.url
            // vue提供的方法
            this.$set(this.model,'icon',rs.url)
        }
      
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


<style>
 
</style>