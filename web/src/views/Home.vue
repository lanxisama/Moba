<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpg" alt="">
      </swiper-slide>
       <div class="swiper-pagination pagination-home text-right px-3 pb-1 "  
       slot="pagination"></div>
    </swiper>
    <!--幻灯片结束-->
    <div class="nav-icons bg-white mt-2  text-center pt-3 text-grey-1">
      <div class="d-flex flex-warp">
      <div class="nav-item mb-3">
        <i class="sprite sprite-news"></i>
        <div class="py-2">爆料站</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-store"></i>
        <div class="py-2">故事站</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-shop"></i>
        <div class="py-2">周边商城</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-tts"></i>
        <div class="py-2">体验服</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-newcomer"></i>
        <div class="py-2">新人专区</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-honer"></i>
        <div class="py-2">荣耀·传承</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-cos"></i>
        <div class="py-2">同人社区</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-home"></i>
        <div class="py-2">王者营地</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-wechat"></i>
        <div class="py-2">公众号</div>
      </div>
      <div class="nav-item mb-3">
        <i class="sprite sprite-version"></i>
        <div class="py-2">版本介绍</div>
      </div>
      </div>
      <div class="bg-light text-center py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1 pb-1"></i>
         <span>收起</span>
      </div>
      
    </div>    
    <!--导航栏 结束-->

    <div>
      
      <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
          <!-- 表示和name为item的插槽关联  #为v-slot的简写 也可写作v-slot:item={{category}} 这里面的category名字可以自定义-->
          <template #item="{category}"> 
            <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList":key="i">
                <span class="text-info">[{{news.categoryName}}]</span>
                <span class="px-2">|</span>
                <span class="flex-1 text-dark-1 text-elipsis pr-2">{{news.title}}</span>
                <span class="text-grey fs-sm">{{news.createdAt|date}}</span>  
            </router-link>
          </template>
          
      </m-list-card>
      <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
          <!-- 表示和name为item的插槽关联  #为v-slot的简写 也可写作v-slot:item={{category}}-->
          
          <template #item="{category}"> 
            <div class="d-flex flex-warp" style="margin:0 -0.5rem;">
                  <router-link :to="`/heroes/${hero._id}`" tag="div" class="p-2 text-center" style="width:20%;" v-for="(hero,i) in category.heroList":key="i">
                      <img :src="hero.avatar" class="w-100"/>
                      <div>{{hero.name}}</div>
                  </router-link>
            </div>
          </template>
      </m-list-card>      
    </div>
     
  </div>
</template>

<script>

//格式化时间用的包
import dayjs from 'dayjs'
export default {
  //过滤器
  filters:{
    date(val){
        return dayjs(val).format("MM/DD")
    }
  },
  name: 'home',
  data(){
    return {
      swiperOption:{
        pagination:{
          el:".pagination-home"
        }
      },
      newsCats:[],
      heroCats:[]
    }
  },
  methods:{
    async fetchNewsCats(){
      //获取新闻分类
        const res=await this.$http.get("/news/list")
        this.newsCats=res.data;
    },
    async fetchHeroCats(){
      //获取新闻分类
        const res=await this.$http.get("/heroes/list")
        this.heroCats=res.data
    }
  },
  created(){
     this.fetchNewsCats();
     this.fetchHeroCats();
  }
}
</script>

<style lang="scss" scope>

@import '../assets/scss/variables';

.pagination-home{
  opacity: 1;
  .swiper-pagination-bullet{
    
      background: map-get($colors,"white");
      border-radius: 0.3846rem;  
      &.swiper-pagination{
     background: map-get($colors,"info");
  }
  }
}

.nav-icons{
    border-top:1px solid $border-color;
    border-bottom:1px solid $border-color;
  .nav-item{
    width:25%;
    border-right:1px solid $border-color;
    &:nth-child(4n){  //序号÷4 整除的话 用下面的样式
      border-right:none;
    }
  }
}

</style>
