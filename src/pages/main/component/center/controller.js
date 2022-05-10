import {variable} from "./variable.js"
import {ref} from "vue"
import router from "../../../../router";
let {name, introduce} = variable()
let menu = ref([
    {
        label: "个人主页",
        icon: "user",
        func: userPage
    },
    {
        label: "用户中心",
        icon: "office-building",
        func: userCenter
    },
    {
        label: "账户设置",
        icon: "setting",
        func: userCenter
    },
    {
        label: "退出登录",
        icon: "circle-close",
        func: signOut
    }
])

export function initVariable() {
    return {name, introduce, menu}
}

export function init() {
    initData()
}

function initData() {
    name.value = "刘小圆sama"
    introduce.value = "海纳百川，有容纳大"
}

function userPage() {
    router.push({name: "user"})
}

function userCenter() {
    router.push({name: "center"})
}

function signOut() {

}