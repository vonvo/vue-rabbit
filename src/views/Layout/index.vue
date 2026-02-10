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
        我是首页
        <!-- 这是二级路由出口组件 -->
        <RouterView/>
        <LayoutFooter />
    </div>
</template>