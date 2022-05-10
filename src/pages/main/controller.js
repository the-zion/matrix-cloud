import router from '../../router/index'
import {useRoute} from "vue-router"
import {variable} from "./variable.js"

export function controller() {

    let {activeMenu, userLogin, messageValue, menuList, loginVisible, activeColor, scroll} = variable()

    function initVariable() {
        return {activeMenu, userLogin, messageValue, menuList, loginVisible, activeColor, scroll}
    }

    function init() {
        initData()
    }

    function initData(){
        activeMenu.value = useRoute().name
    }

    function backToHome() {
        router.push({name: "home"})
    }

    function menuSelect() {
        activeColor.value = "#409eff"
    }

    function messageCount(value) {
        return value === 0
    }

    function add() {
        messageValue.value += 1
    }

    function login() {
        loginVisible.value = true
    }

    function dropdownClick(item) {
        router.push({name: item})
    }

    return {
        initVariable,
        init,
        backToHome,
        menuSelect,
        messageCount,
        add,
        login,
        dropdownClick
    }
}