//根据接口文档封装接口函数，发送请求获取数据列表，v-for渲染页面
//封装获取banner的接口函数

import httpInstance from "@/utils/http";

// export function getBannerAPI(){
//     return httpInstance({   
//         url:"/home/banner"
//     })
// }


//分类轮播图和首页轮播图的区别只有一个，接口参数不同，其余逻辑一致
export function getBannerAPI (params = {}) {
  // 默认为1 商品为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}


/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return httpInstance({
    url:'/home/new'
  })
}


/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
  return  httpInstance({
    url:'home/hot'
  })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}