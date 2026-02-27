//放置通用的逻辑函数
// 编写一个函数useCountDown可以把秒数格式化为倒计时的显示状态，函数使用样例如下:
// const { formatTime, start } = useCountDown()
// {{ formatTime }}

// start(60)
// 1.formatTime为显示的倒计时时间 2.start是倒计时启动函数，调用时可以设置初始值并且开始倒计时

// 实现思路
// 编写函数框架，确定参数和返回值
// 编写核心倒计时逻辑实现基础倒计时
// 实现格式化
import { computed, ref ,onUnmounted} from 'vue'
import dayjs from 'dayjs'
export const useCountDown = () => {
    let timer = null
    // 1. 响应式的数据
    const time = ref(0)
    // 格式化时间 为 xx分xx秒
    //这个有返回值，所以不用{}
    // 这个带{}，错误，没有return，如果非要写{}，就要带上return
    // const formatTime=computed(()=>{
    //      dayjs.unix(time.value).format('mm分ss秒')
    // })
    const formatTime=computed(()=>
        dayjs.unix(time.value).format('mm分ss秒')
    )
    // 2. 开启倒计时的函数
    const start=(currentTime)=>{
        // 开始倒计时的逻辑
        // 核心逻辑的编写：每隔1s就减一
        time.value = currentTime
        timer = setInterval(() => {
            if(time.value > 0){
                time.value--
            }else{
                clearInterval(timer)
            }
        }, 1000)
    }
      // 组件销毁时清除定时器
    onUnmounted(() => {
    timer && clearInterval(timer)
      })
    return{
        formatTime,
        start
    }
}
