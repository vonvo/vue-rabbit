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
import Detail from "@/views/Detail/index.vue"
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import MemberInfo from '@/views/Member/components/UserInfo.vue'
import MemberOrder from '@/views/Member/components/UserOrder.vue'
//使用路由懒加载，（异步加载），用到的时候才加载


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //下面配置path， component对应关系的位置，里面是一个一个对象(每一层的路由，都有路由出口)
  //在 children 数组中，子路由的 path 前面加不加 / 有本质区别，
  //path: 'category'	相对路径
  //path: '/category'	绝对路径
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
          path:"category/:id",
          component:Category,
        },
        {
          path: 'category/sub/:id',
          name: 'subCategory',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback', // 注意路径，必须是paycallback
          component: PayBack
        },
        {
          path: 'member',
          component: Member,
          children:[
            {
              path: 'user',
              component: MemberInfo
            },
            {
              path: 'order',
              component: MemberOrder
            }
          ]
        }
      ]

    },
    {
      path:"/login",
      component:Login
    }
  ],
  //定制路由行为可以解决什么问题
//在不同路由切换的时候，可以自动滚动到页面的顶部，而不是停留在原先的位置
//如何配置：vue-router支持scrollBehavior配置项，可以指定路由切换时的滚动位置
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
