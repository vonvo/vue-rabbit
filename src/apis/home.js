//根据接口文档封装接口函数，发送请求获取数据列表，v-for渲染页面
//封装获取banner的接口函数

import httpInstance from "@/utils/http";

export function getBannerAPI(){
    return httpInstance({   
        url:"/home/banner"
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