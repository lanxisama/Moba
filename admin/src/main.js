import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
Vue.config.productionTip = false

import '../src/style.css'
// 之后可以在任意界面使用this.$http访问接口
Vue.prototype.$http=http

Vue.mixin({
  methods:{
    getHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token|| ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
