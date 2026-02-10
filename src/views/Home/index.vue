<!-- //  二级路由，默认home页  路径/  -->
<script setup>
//  一级路由，首页  路径/ 
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeNew from '@/views/Home/components/HomeNew.vue'
import HomeProduct from '@/views/Home/components/HomeProduct.vue'



</script>

<template>
    <!-- <div>
        我是home页
    </div> -->
    <div class="container">
        <HomeCategory />
        <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <homeProduct />
    
</template>



