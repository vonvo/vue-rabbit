//根据接口文档封装接口函数，发送请求获取数据列表，v-for渲染页面
//封装获取分类的接口函数

import httpInstance from "@/utils/http";

export function getCategoryAPI(){
    return httpInstance({   
        url:"/home/category/head"
    })
}