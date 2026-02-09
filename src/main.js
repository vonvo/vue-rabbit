import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件,一些标签样式，margin，padding修改
import "@/styles/common.scss"

//测试接口函数
import { getCategory } from './apis/testAPI'
getCategory().then(res=>{
    console.log(res);
})



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
