// 1.整个购物车的实现分为俩个大分支，本地购物车操作和接口购物车操作
// 2.由于购物车数据的特殊性，采取Pinia管理购物车列表数据并添加持久化缓存

// 本地购物车
// ## 1. 添加购物车
// > 基础思想：如果已经添加过相同的商品，就在其数量count上加一，如果没有添加过，就直接push到购物车列表中

// 封装购物车模块

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useCartStore = defineStore('cart', () => {
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = (goods) => {
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

  // 删除购物车
  const delCart = async (skuId) => {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
  }

  //计算属性
  //1.总的数量 所有项的count之和
  const allCount = computed(() => {
    return cartList.value.reduce((pre, item) => pre + item.count, 0)
  })

  //2.总价 所有项的count*price之和
  const allPrice = computed(() => {
    return cartList.value.reduce((pre, item) => pre + item.count * item.price, 0)
  })

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice
  }
}, {
  persist: true,
})