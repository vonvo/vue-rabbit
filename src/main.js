import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件,一些标签样式，margin，padding修改
import "@/styles/common.scss"


import { useIntersectionObserver } from '@vueuse/core'

//测试接口函数
// import { getCategory } from './apis/testAPI'
// getCategory().then(res=>{
//     console.log(res);
// })

//引入懒加载指令插件并且注册
import { lazyPlugin } from './directives'

// 引入全局组件插件
import { componentPlugin } from '@/components'



const app = createApp(App)
app.use(lazyPlugin)
app.use(createPinia())
app.use(router)
app.use(componentPlugin)

app.mount('#app')

//懒加载指令的逻辑不能直接写到入口文件，入口文件通常只做一些初始化的事情，不应该包含太多的逻辑代码，可以通过插件的方式把懒加载指令封装为插件，main.js入口文件只需要负责注册插件即可

//图片通过懒加载优化手段可以做到，只有进入视口区域才发送图片请求
//指令用法：在图片img身上绑定指令，该图片只有在正式进入到视口区域时才会发送图片网络请求
//<img v-img-lazy="item.picture">这个图片变成一个懒加载的图片
//核心原理：图片进入视口才发送资源请求
//1.熟悉指令语法，
//2.判断图片是否进入视口（vueuse），
//3. 测试图片监控是否生效，
//4. 如果图片进入视口，发送图片资源请求（img.src=url）
//5.测试图片资源是否发出

//定义全局指令
// app.directive("img-lazy",{
//     mounted(el,binding){
//         //el,指令绑定的元素，img
//         //binding，是指令对象，binding.value 是 指令等于号，后面绑定的表达式的值 ，图片url

//         console.log(el,binding.value)
//         useIntersectionObserver(
//             el,
//             ([{isIntersecting}])=>{
//                 // console.log(isIntersecting);
//                 if(isIntersecting){
//                     //进入视口区域
//                     el.src=binding.value

//                 }
                
//             }

//         )

        
//     }
// })


