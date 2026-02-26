// 1.整个购物车的实现分为俩个大分支，本地购物车操作和接口购物车操作
// 2.由于购物车数据的特殊性，采取Pinia管理购物车列表数据并添加持久化缓存

// 本地购物车
// ## 1. 添加购物车
// > 基础思想：如果已经添加过相同的商品，就在其数量count上加一，如果没有添加过，就直接push到购物车列表中

// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { insertCartAPI ,findNewCartListAPI,delCartAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  
  
  // 1. 定义state - cartList
  const cartList = ref([])

 
  // 2. 定义action - addCart

  // 1.调用加入购物车接口
  // 2.调用获取购物车列表接口
  // 3.用接口购物车列表覆盖本地购物车列表
  const addCart = async(goods) => {
    const { skuId, count } = goods
    // 登录
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      // const res=await findNewCartListAPI()
      // cartList.value=res.result
      updateNewList()

    }else {
      // 未登录
      console.log('添加', goods)
      // 添加购物车操作
      // 已添加过 - count + 1
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        // 找到了
        item.count=item.count + goods.count
      } else {
        // 没找到
        cartList.value.push(goods)
      }
    }
  }

  //清除本地购物车
  const clearCart=()=>{
    cartList.value=[]
  }

  // 删除购物车

  // 1.调用删除购物车接口
  // 2.调用获取购物车列表接口
  // 3.用接口购物车列表覆盖本地购物车列表

  const delCart = async (skuId) => {

      if(isLogin.value){
        // 调用接口实现接口购物车中的删除功能
        await delCartAPI([skuId])
        // const res=await findNewCartListAPI()
        // cartList.value=res.result
        updateNewList()
      }else{
              // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
      }
  }

  //获取最新购物车列表action
  const updateNewList=async ()=>{
        const res=await findNewCartListAPI()
        cartList.value=res.result
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
  // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
  const item = cartList.value.find((item) => item.skuId === skuId)
  item.selected = selected
  }

  // 全选功能action
  const allCheck = (selected) => {
  // 把cartList中的每一项的selected都设置为当前的全选框状态
  cartList.value.forEach(item => item.selected = selected)
}

  // 是否全选计算属性
  const isAll = computed(() => cartList.value.every((item) => item.selected))

  //计算属性
  //1.总的数量 所有项的count之和
  const allCount = computed(() => {
    return cartList.value.reduce((pre, item) => pre + item.count, 0)
  })

  //2.总价 所有项的count*price之和
  const allPrice = computed(() => {
    return cartList.value.reduce((pre, item) => pre + item.count * item.price, 0)
  })

  // 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))




  return {
    cartList,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart,
    selectedCount,
    selectedPrice,
    isAll,
    allCount,
    allPrice,
    updateNewList
  }
}, {
  persist: true,
})