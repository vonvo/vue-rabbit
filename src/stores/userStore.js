// 基本思想：Pinia负责用户数据相关的state和action，组件中只负责触发action函数并传递参数
// 管理用户数据相关


import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'
import {useCartStore} from "@/stores/cartStore"

import { countdownEmits } from 'element-plus'

export const useUserStore = defineStore('user', () => {

  const cartStore=useCartStore()
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //在用户登录时，把本地的购物车数据和服务端购物车数据进行合并操作
    await mergeCartAPI(cartStore.cartList.map(item=>{
      return {
        skuId:item.skuId,
        selected:item.selected,
        count:item.count
      }
    }))
    cartStore.updateNewList()

  }

//退出时清除用户信息
  const clearUserInfo= () => {
    userInfo.value={}
    //执行清除购物车的action，在用户退出登录时，除了清除用户信息之外，也需要把购物车数据清空
    cartStore.clearCart()
  }


  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
    //持久化配置，存入localstorage
  persist: true,
})

// 持久化用户数据说明
// 1.用户数据中有一个关键的数据叫做Token(用来标识当前用户是否登录)，而Token持续一段时间才会过期
// 2.Pinia的存储是基于内存的，刷新就丢失，为了保持登录状态就要做到刷新不丢失，需要配合持久化进行存储

// 目的:保持token不丢失，保持登录状态最终效果:操作state时会自动把用户数据在本地的localStorage也存一份，刷新的时候会从localStorage中先取
//npm i pinia-plugin-persistedstate

// 运行机制:
// 在设置state的时候会自动把数据同步给localstorage，在获取state数据的时候会优先从localStorage中取
