//第一个，创建路由实例，第二个，来创建history模式的路由（有两个模式的路由，另一个是哈希模式的路由）
import { createRouter, createWebHistory } from 'vue-router'
//路由设计原则：找内容切换的区域，如果是页面整体切换，则为一级路由，先写一级路由对应的组件，写完之后，来到这里，进行路由的绑定配置
//找内容切换的区域，如果是在一级路由页的内部切换，则为二级路由
//把组件导入进来
import Login from "@/views/Login/index.vue"
import Layout from "@/views/Layout/index.vue"
import Home from "@/views/Home/index.vue"
import Category from "@/views/Category/index.vue"
import SubCategory from '@/views/SubCategory/index.vue'


//使用路由懒加载，（异步加载），用到的时候才加载


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //下面配置path， component对应关系的位置，里面是一个一个对象(每一层的路由，都有路由出口)
  routes: [
    {
      path:"/",
      component:Layout,
      children:[
        {
          path:'',
          component:Home,
        },
        {
          path:"/category/:id",
          component:Category,
        },
        {
          path: 'category/sub/:id',
          name: 'subCategory',
          component: SubCategory
        },
      ]

    },
    {
      path:"/login",
      component:Login
    }
  ],
})

export default router
