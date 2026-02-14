<script setup>
import {getCategoryFilterAPI} from "@/apis/category"
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GoodItem from '@/views/Home/components/GoodItem.vue';
import { getSubCategoryAPI } from "@/apis/category";


//获取面包屑导航数据
const route=useRoute()
const categoryFilterList=ref({})
const getcategoryFilterList=async ()=>{
    const res=await getCategoryFilterAPI(route.params.id)
    console.log(res);
    categoryFilterList.value=res.result
    
}

onMounted(()=>{
    getcategoryFilterList()
})


//获取基础列表数据渲染

const gooddata=ref({ 
     categoryId: route.params.id,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime'
   })

const goodList=ref({})
const getgoodList=async ()=>{
    const res=await getSubCategoryAPI(gooddata.value)
    console.log(res);
    goodList.value=res.result.items
    
}

onMounted(()=>{
    getgoodList()
})

// # 列表筛选实现
// > 思路：tab组件切换时修改reqData中的sortField字段，重新拉取接口列表

const tabChange = () => {
  console.log('tab切换了', gooddata.value.sortField)
  gooddata.value.page = 1
  getgoodList()
}



</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryFilterList.parentId}` }">{{ categoryFilterList.parentName }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilterList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="gooddata.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
         <!-- 商品列表-->
        <GoodItem  v-for="good in goodList" :good="good"  :key="good.id"/>

      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>