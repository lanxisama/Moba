<template>
    <div id="create">
        <!-- 可以使用传递过来的id动态显示页面 -->
        <h2>{{id?"编辑文章":"新建文章"}}</h2>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="文章">
                <el-select v-model="model.categories" multiple>
                    <!-- :label决定选项显示 :value决定选项值 -->
                    <el-option v-for="item in Allcategories"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <!-- <el-input type="textarea" v-model="model.content"></el-input> -->
                 <vue-editor v-model="model.content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
            </el-form-item>      
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    // props属性不写在data()中
    props:{
        id:{}
    },
    components:{
        VueEditor
    },
    data(){
        return{
            model:{
                // 文章分类
                categories:[],
                title:"",
                content:""
            },
            // 全部分类
            Allcategories:[],
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
                res=await this.$http.put(`rest/articles/${this.id}`,this.model)

            }
            else{
                //没有id传过来则执行当前函数
                res=await this.$http.post('rest/articles',this.model)
            }
            this.$router.push('/articles/list')
            // elemnt ui提供的方法
            this.$message({
                    type:"success",
                    message:"保存成功"
            })
        },
        async fetch(){
            // 使用``才能使用${}进行字符串拼接
            const res=await this.$http.get(`rest/articles/${this.id}`)
            this.model=res.data
        },
        async fetchCategories(){
                const res = await this.$http.get(`rest/categories/`)
                // console.log(res.data)
                this.Allcategories=res.data
        },
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            const formData = new FormData();
            // multerObj.single('file')
            // 定义时候接收文件的字段用的file所以这里用'file'
            formData.append("file", file);
            /*
                因为这里post请求的接口是upload
                app.post('/admin/api/upload',multerObj.single('file'),async(rq,rs)=>{
                const file=rq.file
                file.url=`http://localhost:3000/uploads/${file.filename}`
                rs.send(file)
                })
            */
            const res= await this.$http.post('upload',formData)
            Editor.insertEmbed(cursorLocation,'image', res.data.url);
            resetUploader()
            //下面的写法和上面的写法等价 上面的res就是下面的result
            // axios({
            //     url: "https://fakeapi.yoursite.com/images",
            //     method: "POST",
            //     data: formData
            // })
            //     .then(result => {
            //     let url = result.data.url; // Get url from response
            //     Editor.insertEmbed(cursorLocation, "image", url);
            //     resetUploader();
            //     })
            //     .catch(err => {
            //     console.log(err);
            //     });

    }       
    },
    computed:{
        
    },
    created(){
        this.fetchCategories()   
        // 如果有id 才执行当前函数
        // ************************************************
        this.id && this.fetch()
    
    }
       
 
}
</script>