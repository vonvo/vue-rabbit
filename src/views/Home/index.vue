<!-- //  二级路由，默认home页  路径/  -->
<script setup>
//  一级路由，首页  路径/ 
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeNew from '@/views/Home/components/HomeNew.vue'
import HomeProduct from '@/views/Home/components/HomeProduct.vue'
import HomePanel from '@/views/Home/components/HomePanel.vue'


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
    <HomeProduct />
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
        <div> 主体内容 </div>
    </HomePanel>

    <HomePanel title="人气推荐" subTitle="人气推荐 好多商品">
        <div> 主体内容 </div>
    </HomePanel>


    
</template>



