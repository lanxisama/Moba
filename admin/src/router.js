import Vue from 'vue'
import Router from 'vue-router'
import Admin from './views/Admin'
import CategoryEdit from './views/CategoryEdit'
import CategoryList from './views/CategoryList'
import ItemEdit from './views/ItemEdit'
import ItemList from './views/ItemList'

import HeroEdit from './views/HeroEdit'
import HeroList from './views/HeroList'

import ArticleEdit from './views/ArticleEdit'
import ArticleList from './views/ArticleList'

import AdEdit from './views/AdEdit'
import AdList from './views/AdList'

import AdminUserEdit from './views/AdminUserEdit'
import AdminUserList from './views/AdminUserList'

//登陆
import Login from './views/Login'
// import { from } from '_array-flatten@2.1.1@array-flatten';
Vue.use(Router)

//处理因为vue-router而产生的报错信息
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router =new Router({
  // base:'/admin/',
  // mode:"history",
  routes: [
    {
      path:"/",
      redirect:"/categories/list" 
    }, 
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{isPublic:true},
    },
    {
      path: '/',
      name: 'admin',
      component: Admin,
      
      children:[
        {
          path:"/categories/create",
          name: 'categoryedit',
          component:CategoryEdit,
        },
        {
          path:"/categories/list",
          name: 'categorylist',
          component:CategoryList
        },
        {
          path:"/categories/edit/:id",
          name: 'categoryedit',
          component:CategoryEdit,
          props:true
          // props:true 可将url传来的所有参数信息可以在CategoryEdit组件中直接使用
          // 可以不用使用this.$parmas.***
        },


        {
          path:"/items/create",
          name: 'itemedit',
          component:ItemEdit,
        },
        {
          path:"/items/list",
          name: 'itemlist',
          component:ItemList
        },
        {
          path:"/items/edit/:id",
          name: 'itemedit',
          component:ItemEdit,
          props:true
          // props:true 可将url传来的所有参数信息可以在CategoryEdit组件中直接使用
          // 可以不用使用this.$parmas.***
        },


        {
          path:"/heroes/create",
          name: 'heroedit',
          component:HeroEdit,
        },
        {
          path:"/heroes/list",
          name: 'herolist',
          component:HeroList
        },
        {
          path:"/heroes/edit/:id",
          name: 'heroedit',
          component:HeroEdit,
          props:true
          // props:true 可将url传来的所有参数信息可以在CategoryEdit组件中直接使用
          // 可以不用使用this.$parmas.***
        },

        {
          path:"/articles/create",
          name: 'articleedit',
          component:ArticleEdit,
        },
        {
          path:"/articles/list",
          name: 'articlelist',
          component:ArticleList
        },
        {
          path:"/articles/edit/:id",
          name: 'articleedit',
          component:ArticleEdit,
          props:true
          // props:true 可将url传来的所有参数信息可以在CategoryEdit组件中直接使用
          // 可以不用使用this.$parmas.***
        },

        {
          path:"/ads/create",
          name: 'adedit',
          component:AdEdit,
        },
        {
          path:"/ads/list",
          name: 'adlist',
          component:AdList
        },
        {
          path:"/ads/edit/:id",
          name: 'adedit',
          component:AdEdit,
          props:true
          // props:true 可将url传来的所有参数信息可以在CategoryEdit组件中直接使用
          // 可以不用使用this.$parmas.***
        },


        {
          
          path:"/admin_users/create",
          name: 'admin_useredit',
          component:AdminUserEdit,
        },
        {
          path:"/admin_users/list",
          name: 'admin_userlist',
          component:AdminUserList
        },
        {
          path:"/admin_users/edit/:id",
          name: 'admin_useredit',
          component:AdminUserEdit,
          props:true
          // props:true 可将url传来的所有参数信息可以在CategoryEdit组件中直接使用
          // 可以不用使用this.$parmas.***
        }
      ],

    },
  ],
  
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token)
  {
    return next('/login')
  }
  next()
})
export default router