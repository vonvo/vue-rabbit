<script setup>
//组件封装
//新鲜好物和人气推荐模块，在结构上非常相似，只是内容不同，通过组件封装可以实现复用结构的效果
//核心思路：把可复用的结构只写一次，把可能发生变化的部分抽象成组件参数（父传子  props/插槽）
//实现步骤：
//1.不做任何抽象，准备静态模板
//2.抽象可变的部分：
// 主标题和副标题是纯文本，可以抽象成prop传入
// 主体内容是复杂的模板，抽象成插槽传入


//定义props
defineProps({
    //主标题
    title:{
        type:String
    },
    subTitle:{
        type:String
    }
})



</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <slot/>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>