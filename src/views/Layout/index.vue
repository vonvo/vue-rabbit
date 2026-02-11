<script setup>
//  一级路由，首页  路径/ 
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed.vue'
import { onMounted, ref } from 'vue'
import { useCategoryStore } from "@/stores/category"

//触发获取导航数据列表的action
const categoryStore=useCategoryStore()

onMounted(()=>{
    categoryStore.getCategory()        

})



</script>

<template>
    <div>
        <LayoutFixed />
        <LayoutNav />
        <LayoutHeader />
        
        <!-- 这是二级路由出口组件 -->
        
        <!-- 路由缓存问题 -->
        <!-- 路由只有参数变化时，会复用组件实例，意味着组件的生命周期钩子函数不会被调用 -->
        <!-- 解决办法，2种 -->
        <!-- 1. 给 routerv-view 添加key属性，破坏缓存 -->
        <!-- <RouterView :key="$route.fullPath"/> -->

        <!-- 2. 使用 onBeforeRouteUpdate钩子函数，做精确更新 -->
        <RouterView/>
        <LayoutFooter />
    </div>
</template>