import httpInstance from "@/utils/http";

//登录业务流程，表单校验通过，封装登录接口，调用登录接口，登陆成功后逻辑处理（提示用户，跳转首页），登录失败的业务逻辑（抛出错误提示）

export function loginAPI({account,password}){
    return httpInstance({   
        url:"/login",
        method:"POST",
        data:{
            account,
            password
        }

    })
}