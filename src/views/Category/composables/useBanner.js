//封装banner轮播图相关的业务代码

// 使用逻辑函数拆分业务  指的是把同一个组件中的独立的业务代码通过函数做封装处理，提升代码的可维护性
// 具体怎么做
// 实现步骤
// 1.按照业务声明以use打头的逻辑函数
// 2.把独立的业务逻辑封装到各个函数内部
// 3.函数内部把组件中需要用到的数据或者方法return出去
// 4.在组件中调用函数，把数据或者方法组合回来使用

import {getBannerAPI} from  "@/apis/home"

import { onMounted,ref } from "vue";

export function useBanner(){
    const bannerList=ref([]) 
    const getBanner=async ()=>{
        const res=await getBannerAPI({
        distributionSite : '2' })
        console.log(res);
        bannerList.value=res.result
    }

    onMounted(()=>{
        getBanner()
    })

    return {
        bannerList
    }

}