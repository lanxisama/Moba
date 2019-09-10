<template>
    <div id="create">
        <!-- 可以使用传递过来的id动态显示页面 -->
        <h2>{{id?"编辑广告位":"新建广告位"}}</h2>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="model.items.push({})" size="small"><i class="el-icon-plus"></i> 添加广告</el-button>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-col :md="24" v-for="(item,index) in model.items" :key="index">
                        <el-form-item label="跳转链接URL">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                    <el-form-item label="广告图片">
                        <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL+'/upload'"
                        :show-file-list="false"
                        :on-success="res=>$set(item,'image',res.url)"
                        >
                        <img v-if="item.image" :src="item.image" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>   
                    </el-form-item>    
                    <el-form-item>
                        <el-button @click="model.items.splice(index,1)" size="small" type="danger">删除广告</el-button>
                    </el-form-item>
                    </el-col>
                </el-row>
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
                items:[]
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
                res=await this.$http.put(`rest/ads/${this.id}`,this.model)

            }
            else{
                //没有id传过来则执行当前函数
                res=await this.$http.post('rest/ads',this.model)
            }
            this.$router.push('/ads/list')
            // elemnt ui提供的方法
            this.$message({
                    type:"success",
                    message:"保存成功"
            })
        },
        async fetch(){
            // 使用``才能使用${}进行字符串拼接
            const res=await this.$http.get(`rest/ads/${this.id}`)
            this.model=Object.assign({},this.model,res.data)
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

 