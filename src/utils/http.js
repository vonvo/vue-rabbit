// axio基础的封装

import axios from "axios"

const httpInstance=axios.create({
    baseURL:"http://pcapi-xiaotuxian-front-devtest.itheima.net",
    timeout:5000
})

//拦截器


//axios请求拦截器
httpInstance.interceptors.request.use(config=>{
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