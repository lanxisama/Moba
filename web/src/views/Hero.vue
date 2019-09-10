<template>
    <div class="hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img src="../assets/logo.png" height="30">
            <div class="px-3 flex-1">
                <span class="text-white fs-lg">
                    王者荣耀
                </span>
                <span class="text-white ml-2">
                    攻略战
                </span>
            </div>
            <router-link class="text-white" to="/" tag="div">更多英雄 &gt;</router-link>
        </div>
           <!-- topnav结束 -->
        <div class="top" :style="{'background-image':`url(${model.banner})`}">
            <div class="info text-white p-3 d-flex flex-colunm h-100 jc-end">
                <div class="fs-xs">{{model.title}}</div>
                <h2 class="my-2">{{model.name}}</h2>
                <div class="fs-sm">{{categories}}</div>
                <div class="d-flex jc-between pt-2">
                    <div class="scores d-flex ai-center"  v-if="model.scores">
                            <span >难度</span>
                            <span class="badge bg-primary mr-2">{{model.scores.difficult}}</span>
                            <span>技能</span>
                            <span class="badge bg-blue mr-2">{{model.scores.skill}}</span>
                            <span>攻击</span>
                            <span class="badge bg-red mr-2">{{model.scores.attack}}</span>
                            <span>生存</span>
                            <span class="badge bg-dark mr-2">{{model.scores.survive}}</span>
                    </div>
                    <router-link tag="span" class="text-grey fs-sm" to="/">皮肤: 2 &gt</router-link>
                </div>

            </div>
        </div>
         <!-- top结束 -->
        <div>
            <div class="px-3 bg-white">
                <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
                    <div class="nav-item active">
                        <div class="nav-link">英雄初识</div>
                    </div>
                    <div class="nav-item">
                        <div class="nav-link">进阶攻略</div>
                    </div>
                </div>
            </div>
            <swiper>
                <swiper-slide>
                    <div>
                        <div class="p-3 bg-white border-bottom">
                            <div class="d-flex">
                                <router-link to="/" tag="button" class="btn btn-lg flex-1">
                                    <i class="iconfont icon-bofang"></i>
                                    英雄介绍视频
                                </router-link>
                                <router-link to="/" tag="button" class="btn btn-lg flex-1 ml-2">
                                    <i class="iconfont icon-image"></i>
                                    一图识英雄
                                </router-link>
                            </div>
                            <div class="skill mt-3">
                                <div class="d-flex jc-around">
                                    <img :src="item.icon" 
                                    @click="currentSkillIndex=index"
                                    class="icon"
                                    :class="{active:currentSkillIndex===index}"
                                    v-for="(item,index) in model.skills"
                                    :key="index"
                                    width="60"
                                    height="60">
                                </div>
                            </div>
                            <div v-if="currentSkill">
                                <div class="d-flex pt-4 pb-2">
                                    <h3 class="m-0">{{currentSkill.name}}</h3>
                                    <span class="text-grey fs-sm ml-4">
                                        （冷却：{{currentSkill.delay}} 消耗:{{currentSkill.cost}}）
                                    </span>
                                </div>
                                <p>{{currentSkill.description}}</p>
                                <div class="border-bottom"></div>
                                <p class="text-grey-1">{{currentSkill.tips}}</p>
                            </div>
                        </div>
                        <!-- skill 结束 -->
                        <m-card plain icon="menu" title="出装推荐" class="hero-items">
                            <div class="fs-xl">
                                顺丰出装
                                <div class="d-flex jc-around text-center mt-3 mb-4">
                                    <div v-for="item in model.items1":key="item.name">
                                        <img :src="item.icon" class="icon">
                                        <div class="fs-xs">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="border-bottom mb-3"></div>
                            <div class="fs-xl">
                                逆风出装
                                <div class="d-flex jc-around text-center mt-2 mb-2">
                                    <div v-for="item in model.items2":key="item.name">
                                        <img :src="item.icon" class="icon">
                                        <div class="fs-xs">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </m-card>
                        <m-card plain icon="menu" title="使用技巧">
                            <div class="fs-xl">
                                <p class="m-0">{{model.usageTips}}</p>
                            </div>
                        </m-card>
                        <m-card plain icon="menu" title="对抗技巧">
                            <div class="fs-xl">
                                 <p class="m-0">{{model.battleTips}}</p>
                            </div>
                        </m-card>
                        <m-card plain icon="menu" title="团战技巧">
                            <div class="fs-xl">
                                 <p class="m-0">{{model.teamTips}}</p>
                            </div>
                        </m-card>
                        <m-card plain icon="menu" title="英雄关系">
                            <div class="fs-xl"><p class="m-0">最佳搭档</p></div>
                            <div v-for="item in model.partners":key="item.name"
                            class="d-flex pt-3">
                                <img :src="item.hero.avatar" height="50">
                                <p class="flex-1 m-0 ml-3">
                                   {{item.description}}
                                </p>
                            </div>
                            <div class="border-bottom mt-3"></div>
                        </m-card>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
export default {
    name:"hero",
    props:{
        id:{
            String,
            required:true
        }
    },
    data(){
        return{
            model:{},
            categories:"",
            currentSkillIndex:0
        }
    },
    computed:{
            currentSkill()
            {
                // 通过currentSkillIndex获得当前选中技能
                return this.model.skills[this.currentSkillIndex]
            }
    },
    methods:{
        async fetch(){
            const res=await this.$http.get(`/heroes/${this.id}`)
            this.model=res.data
            this.categories=this.model.categories.map(v=>v.name).join("/")
        }
    },
    created(){
        this.fetch()
    }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/variables';
.hero{
    .top{
        height:50vw;
        background:#fff no-repeat top center;
        background-size:auto 100%;
    }
    .info{
        //设置背景图片渐变显示
        background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    }
    .scores{
        .badge{
            margin:0 0.25rem;
            display: inline-block;
            width: 1rem;
            height: 1rem;
            line-height: 0.9rem;
            text-align: center;
            border-radius: 50%;
            font-size:0.6rem;
            border:1px solid rgba(255,255,255,0.3)
        }
    }
}
.skill{
    img.active{
        border:2px solid map-get($map: $colors, $key:"primary");
        border-radius: 50%;
    }
}
.hero-items{
    img.icon{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
}
</style>