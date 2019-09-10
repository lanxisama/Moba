<template>
    <div id="create">
        <!-- 可以使用传递过来的id动态显示页面 -->
        <h2>{{id?"编辑英雄":"编辑英雄"}}</h2>
        <el-form label-width="120px" @submit.native.prevent="save">
            <!-- value显示默认切换哪个页面 -->
            <el-tabs value="basic" type="border-card">
                <el-tab-pane label="基础信息" name="basic" >
                <el-form-item label="背景图">
                <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :headers="getHeaders()"
                :show-file-list="false"
                :on-success="res=>$set(model,'banner',res.url)"
                >
                <img v-if="model.banner" :src="model.banner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>   
            </el-form-item>
                <el-form-item label="头像">
                <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :headers="getHeaders()"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                <img v-if="model.avatar" :src="model.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>   
            </el-form-item>
            <el-form-item label="英雄名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="英雄称号">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="model.categories" multiple>
                    <el-option v-for="item in categories" :key=item._id
                    :label="item.name"
                    :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>      
            <el-form-item label="难度">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
            </el-form-item>   
            <el-form-item label="技能">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skill"></el-rate>
            </el-form-item>      
            <el-form-item label="攻击">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
            </el-form-item>         
               <el-form-item label="生存">
                <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
            </el-form-item>  
            
            <el-form-item label="顺丰出装">
                <el-select v-model="model.items1" multiple>
                    <el-option v-for="item in items" :key=item._id
                    :label="item.name"
                    :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>            
            <el-form-item label="逆风出装">
                <el-select v-model="model.items2" multiple>
                    <el-option v-for="item in items" :key=item._id
                    :label="item.name"
                    :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>      
            <el-form-item label="使用技巧">
                <el-input type="textarea" v-model="model.usageTips"></el-input>
            </el-form-item>  
            <el-form-item label="对抗技巧">
                <el-input type="textarea" v-model="model.battleTips"></el-input>
            </el-form-item>  
            <el-form-item label="团战思路">
                <el-input type="textarea" v-model="model.teamTips"></el-input>
            </el-form-item>       
          
                </el-tab-pane>
            <el-tab-pane label="技能" name="skills">
                <el-button @click="model.skills.push({})" size="small"><i class="el-icon-plus"></i> 添加技能</el-button>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-col :md="12" v-for="(skill,index) in model.skills" :key="index">
                        <el-form-item label="技能名称">
                            <el-input v-model="skill.name"></el-input>
                        </el-form-item>
                        <el-form-item label="冷却时间">
                            <el-input v-model="skill.delay"></el-input>
                        </el-form-item>
                        <el-form-item label="消耗">
                            <el-input v-model="skill.cost"></el-input>
                        </el-form-item>
                        <el-form-item label="技能描述">
                            <el-input type="textarea" v-model="skill.description"></el-input>
                        </el-form-item>
                        <el-form-item label="小提示">
                            <el-input type="textarea" v-model="skill.tips">tips:</el-input>
                        </el-form-item>
                    <el-form-item label="技能图标">
                        <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL+'/upload'"
                        :headers="getHeaders()"
                        :show-file-list="false"
                        :on-success="res=>$set(skill,'icon',res.url)"
                        >
                        <img v-if="skill.icon" :src="skill.icon" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>   
                    </el-form-item>    
                    <el-form-item>
                        <el-button @click="model.skills.splice(index,1)" size="small" type="danger">删除技能</el-button>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
             <el-tab-pane label="最佳搭档" name="partners">
                <el-button @click="model.partners.push({})" size="small"><i class="el-icon-plus"></i>添加搭档</el-button>
                <el-row type="flex" style="flex-wrap:wrap;">
                    <el-col :md="12" v-for="(partner,index) in model.partners" 
                    :key="index">
                        <el-form-item label="英雄">
                            <!-- filterable属性可以让下拉菜单可搜索 -->
                            <el-select filterable v-model="partner.hero">
                                <el-option v-for="hero in heroes"
                                :value="hero._id"
                                :label="hero.name"
                                :key="hero._id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="英雄描述">
                            <el-input v-model="partner.description" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="model.partners.splice(index,1)" size="small" type="danger">删除搭档</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
            </el-tabs>
          <el-form-item style="margin-top:1rem;">
                <el-button type="primary" native-type="submit" >保存</el-button>
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
                name:'',
                avatar:'',
                heroes:[],
                partners:[],
                scores:{
                    difficult:0,
                    skill:0,
                    attack:0,
                    survive:0
                },
                items1:[],
                items2:[],
                skills:[]
            },
            categories:[],
            items:[],
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
                res=await this.$http.put(`rest/heroes/${this.id}`,this.model)
            }
            else{
                //没有id传过来则执行当前函数
                res=await this.$http.post('rest/heroes',this.model)
            }
            this.$router.push('/heroes/list')
            // elemnt ui提供的方法
            this.$message({
                    type:"success",
                    message:"保存成功"
            })
        },
        async fetch(){
            // 使用``才能使用${}进行字符串拼接
            const res=await this.$http.get(`rest/heroes/${this.id}`)
            // this.model=res.data
            this.model=Object.assign({},this.model,res.data)
            // 将this.model加到{}
            //再把res.data加到{}
            //防止服务器传来的数据将原有数据覆盖
            //导致不能显示在this.model中定义的sorces:{}
        },
        async fetchCategories(){
            const res=await this.$http.get(`rest/categories`)
            this.categories=res.data
        },   
        async fetchItems(){
            const res=await this.$http.get(`rest/items`)
            this.items=res.data
        },        
        async fetchHeroes(){
            const res=await this.$http.get(`rest/heroes`)
            this.heroes=res.data
        },       
        afterUpload(rs)
        {
            // console.log(rs)
            // 因为一开始model中没有任何子集 所以在添加icon属性时可能会添加不上 所以这里采用一个显式赋值
            // this.model.icon=rs.url
            // vue提供的方法
            this.$set(this.model,'avatar',rs.url)
        }
      
    },
    computed:{
        
    },
    created(){
        this.fetchItems()
        this.fetchHeroes()
        this.fetchCategories()
        // 如果有id 才执行当前函数
        // ************************************************
        this.id && this.fetch()
    
    }
       
 
}
</script>


<style scoped>

</style>