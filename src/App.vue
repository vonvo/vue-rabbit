<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'

</script>

<template>
   <LayoutNav />
   <LayoutHeader />
   <!-- //这是一级路由出口组件,在这里渲染 -->
   <RouterView/>
   <el-button type="primary">主要按钮</el-button>
   <LayoutFooter />
</template>

<style scoped></style>
