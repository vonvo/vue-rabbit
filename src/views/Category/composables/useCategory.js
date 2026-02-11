//封装分类数据相关的业务代码

// 使用逻辑函数拆分业务  指的是把同一个组件中的独立的业务代码通过函数做封装处理，提升代码的可维护性
// 具体怎么做
// 实现步骤
// 1.按照业务声明以use打头的逻辑函数
// 2.把独立的业务逻辑封装到各个函数内部
// 3.函数内部把组件中需要用到的数据或者方法return出去
// 4.在组件中调用函数，把数据或者方法组合回来使用

import {getTopCategoryAPI} from "@/apis/category"
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { onMounted,ref } from "vue";

export function useCategory(){
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id=route.params.id) => {
// 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        const res = await getTopCategoryAPI(id)
        console.log(res);
        
        categoryData.value = res.result
    }
    onBeforeRouteUpdate((to)=>{
//存在问题：使用最新的路由参数，请求最新的分类数据
        console.log(to);
        getCategory(to.params.id)
    })

    onMounted(()=>{
        getCategory()
    })
    return{
        categoryData
    }
}