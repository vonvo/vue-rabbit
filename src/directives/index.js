//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
//useIntersectionObserver对于元素的监听是一直存在的，除非手动停止，存在内存浪费，解决思路：在监听的图片第一次完成加载之后就停止监听



//以对象的方式
export const lazyPlugin={
    //要提供一个方法，必须要做install
    install(app){

        app.directive("img-lazy",{
            mounted(el,binding){
            //el,指令绑定的元素，img
            //binding，是指令对象，binding.value 是 指令等于号，后面绑定的表达式的值 ，图片url
            console.log(el,binding.value)
            const {stop}=useIntersectionObserver(
            el,
            ([{isIntersecting}])=>{
                console.log(isIntersecting);
                if(isIntersecting){
                    //进入视口区域
                    el.src=binding.value
                    stop()
                }
                
            })}
        })

    }
}