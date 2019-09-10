<template>    
    <m-card  :icon=icon :title=title>
      <div class="card-body mt-2 ">
          <div class="nav jc-between">
            <div class="nav-item" :class="{active:showactive===index}" 
            v-for="(categorie,index) in categories":key="index"
            @click="$refs.list.swiper.slideTo(index)">
              <div class="nav-link">{{categorie.name}}</div>
            </div>

          </div>
        <div class="pt-2">
          <!-- ref类似于html中的id 是给vue使用的 -->
          <!-- options设置每个swiper独立高度 不设置的话默认是按照最高的高度来算的 -->
        <swiper ref="list" :options="{autoHeight:true}"
        @slide-change="()=>showactive=$refs.list.swiper.realIndex">  
                <swiper-slide v-for="(category,index) in categories":key="index">
                  <div class="py-2">
                    <slot name="item" :category="category"></slot>
                  </div>
                </swiper-slide>
          </swiper>
        </div>
      </div>
    </m-card>
     
</template>

<script>
export default {
    props:{
        icon:{type:String,required:true},
        title:{type:String,required:true},
        categories:{type:Array,required:true},
    },
    data(){
        return{
            showactive:0
        }
    }
}
</script>


