<template>
  <div class="article">
    <div class="page-article" v-if="model">
      <div class="d-flex border-bottom py-2 ai-center jc-center">
        <a @click="goBack()">
          <svg  t="1567308424455" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1935" width="22" height="22"><path d="M674.22000122 836.44000244c-6.5177679 0-13.10795546-2.31742859-18.10491084-6.95228577L331.67508793 528.80135728c-9.99391079-9.26971435-9.99391079-24.33300019 0-33.60271456L656.11509038 194.51228333c9.99391079-9.26971435 26.21591092-9.26971435 36.20982169 0 9.99391079 9.26971435 9.99391079 24.33300019 0 33.60271454L385.98982048 512l306.33509159 283.88500214c9.99391079 9.26971435 9.99391079 24.33300019 0 33.60271453-4.9969554 4.63485718-11.58714294 6.95228576-18.10491085 6.95228577z" p-id="1936"></path></svg>
        </a>
        <strong class="text-blue pl-2 flex-1 fs-xl ">
        {{model.title}}
        </strong>
        <div class="text-grey fs-sm px-1">
          {{model.createdAt}}
        </div> 
      </div>
       <div v-html="model.content" class="px-3 article-body fs-lg">
    </div class="px-3 border-top py-3"> 
      <div class="d-flex jc-center ai-center">
        <i class="iconfont icon-tubiao111"></i>
        <strong class="text-blue fs-lg ml-1">相关文章</strong>
     </div>
      <div class="pt-2">
       <router-link tag="div" :to="`/articles/${item._id}`" 
      class="py-1 pl-3"
      v-for="item in model.related":key="item._id">
       {{item.title}}
     </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props:{
    id:{required:true},
  },
  data(){
    return{
      model:null
    }
  },
  methods:{
      goBack(){
        this.$router.push({name:'home'})
      },
      async fetch(){
          const res=await this.$http.get(`/articles/${this.id}`)
          this.model=res.data
          console.log(this.model)
      }
  },
  watch:{
      //监听某个数据变化 执行某个方法
      // id:'fetch'
      id(){
        this.fetch()
      }
  },
  created(){
      this.fetch()
  }
}
</script>


<style lang="scss">
.page-article{
  .article-body{
      img{
        max-width: 100%;
        height: auto;
      }
      iframe{
        width:100%;
        height: auto;
      }
  }
}
</style>