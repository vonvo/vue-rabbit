import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from  "@/apis/Layout"
export const useCategoryStore = defineStore('category', () => {
  
  //导航列表的数据管理
  //state数据 导航列表数据
  const categoryList=ref([])

  //action 获取导航数据的方法
  //修改数据
  const getCategory=async ()=>{
    const res=await getCategoryAPI()
    // console.log(res);
    categoryList.value=res.result    
}

  return { 
    categoryList,
    getCategory  }
})
