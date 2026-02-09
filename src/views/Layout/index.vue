<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'

</script>

<template>
    <div>
        <LayoutNav />
        <LayoutHeader />
        我是首页
        <!-- 这是二级路由出口组件 -->
        <RouterView/>
        <LayoutFooter />
    </div>
</template>