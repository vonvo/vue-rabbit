// axio基础的封装
import { ElMessage } from 'element-plus'
import axios from "axios"
import {useUserStore} from "@/stores/user"

const httpInstance=axios.create({
    baseURL:"http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout:5000
})

//拦截器

// 请求拦截器携带token
// 基础思想：很多接口如果想要获取数据必须要带着有效的Token信息才可以，拦截器中做一次，用到axios实例的其他都可以拿到
//Token作为用户标识，在很多个接口中都需要携带Token才可以正确获取数据，所以需要在接口调用时携带Token。另外，为了统一控制采取请求拦截器携带的方案
//如何配置
//Axios请求拦截器可以在接口正式发起之前对请求参数做一些事情，通常Token数据会被注入到请求header中，格式按照后端要求的格式进行拼接处理

//axios请求拦截器
httpInstance.interceptors.request.use(config=>{
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
    return config
},e=>Promise.reject(e))

//axios响应式拦截器
httpInstance.interceptors.response.use(res=>res.data,e=>{
    // return config
    //统一错误提示
    console.log(e.response.data,"错误出现");
    
    ElMessage({ 
        type: 'warning', 
        message: e.response.data.message
    })
    return Promise.reject(e)
})
// },e=>Promise.reject(e))


export default httpInstance