<script setup>
import {useUserStore} from "@/stores/user"
import { useRouter } from 'vue-router'
const userStore=useUserStore()
const router = useRouter()
const confirm = () => {
  console.log('用户要退出登录了')
  // 退出登录业务逻辑实现
  // 1.清除用户信息 触发action
  userStore.clearUserInfo()
  // 2.跳转到登录页
  router.push('/login')
}



</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染，区分登陆状态和非登陆状态 -->
         <!-- 多模版适配的通用思路:有几个需要适配的模版就准备几个template片段，通过条件渲染控制显示即可 -->
        <template v-if="userStore.userInfo?.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo?.account }}</a></li>
          <li>
            <!-- 点击退出登录弹确认框，点击确定按钮实现退出登录逻辑，登录逻辑包括:1.清除当前用户信息2.跳转到登录页面 -->
            <!-- > 基础思想：
            > 1. 清除用户信息
            > 2. 跳转到登录页 -->
            <el-popconfirm title="确认退出吗?" @confirm="confirm" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>