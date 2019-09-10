<template>
 <div class="card p-3 mt-3 bg-white">
      <div class="card-header d-flex ai-center jc-center pb-3"
      :class="{'border-bottom':!plain}">
          <i class="iconfont" :class='`icon-${icon}`'></i>
          <div class="fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
          <svg v-if="!plain" t="1567065610066" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1070" width="15" height="15"><path d="M113.777778 398.222222c-62.577778 0-113.777778 51.2-113.777778 113.777778s51.2 113.777778 113.777778 113.777778 113.777778-51.2 113.777778-113.777778-51.2-113.777778-113.777778-113.777778z m398.222222 0c-62.577778 0-113.777778 51.2-113.777778 113.777778s51.2 113.777778 113.777778 113.777778 113.777778-51.2 113.777778-113.777778-51.2-113.777778-113.777778-113.777778z m398.222222 0c-62.577778 0-113.777778 51.2-113.777778 113.777778s51.2 113.777778 113.777778 113.777778 113.777778-51.2 113.777778-113.777778-51.2-113.777778-113.777778-113.777778z" fill="#726F6A" p-id="1071"></path></svg>
      </div>
      <div class="card-body mt-2 ">
         <slot></slot> 
      </div>
    </div>

</template>


<script>
export default {
    props:{
        title:{type:String,default:"",required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean}
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';
.card{
    border-bottom:1px solid $border-color;
}
</style>