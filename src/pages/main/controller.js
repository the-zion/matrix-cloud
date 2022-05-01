import router from '../../router/index'
import {useRoute} from "vue-router"

export function controller(activeMenu, activeColor, messageValue) {

    function init() {
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
        router.push({name: 'login'})
    }

    function dropdownClick(item) {
        router.push({name: item})
    }

    function editBlog() {
        router.push({name: "express"})
    }

    return {
        init,
        backToHome,
        menuSelect,
        messageCount,
        add,
        login,
        dropdownClick,
        editBlog
    }
}