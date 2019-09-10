<template>
    <div id="create">
        <!-- 可以使用传递过来的id动态显示页面 -->
        <h2>{{id?"编辑分类":"新建分类"}}</h2>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="分类">
                <el-select v-model="model.parent">
                    <!-- :label决定选项显示 :value决定选项值 -->
                    <el-option v-for="item in parents"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
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
            parents:[]
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
                res=await this.$http.put(`rest/categories/${this.id}`,this.model)

            }
            else{
                //没有id传过来则执行当前函数
                res=await this.$http.post('rest/categories',this.model)
            }
            this.$router.push('/categories/list')
            // elemnt ui提供的方法
            this.$message({
                    type:"success",
                    message:"保存成功"
            })
        },
        async fetch(){
            // 使用``才能使用${}进行字符串拼接
            const res=await this.$http.get(`rest/categories/${this.id}`)
            this.model=res.data
        },
        async fetchParents(){
            const res=await this.$http.get(`rest/categories`)
            // const res=await this.$http.get('/categories')
            // console.log(res.data)
            this.parents=res.data
        }        
    },
    computed:{
        
    },
    created(){
        this.fetchParents()    
        // 如果有id 才执行当前函数
        // ************************************************
        this.id && this.fetch()
    
    }
       
 
}
</script>