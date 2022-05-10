import router from '../../router/index'
import {useRoute} from "vue-router"
import {variable} from "./variable.js"
let {activeMenu, userLogin, messageValue, menuList, loginVisible, activeColor, scroll} = variable()

export function initVariable() {
    return {activeMenu, userLogin, messageValue, menuList, loginVisible, activeColor, scroll}
}

export function init() {
    initData()
}

function initData(){
    activeMenu.value = useRoute().name
}

export function backToHome() {
    router.push({name: "home"})
}

export function menuSelect() {
    activeColor.value = "#409eff"
}

export function messageCount(value) {
    return value === 0
}

export function add() {
    messageValue.value += 1
}

export function login() {
    loginVisible.value = true
}

export function dropdownClick(item) {
    router.push({name: item})
}