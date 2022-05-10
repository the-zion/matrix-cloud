import {ref} from 'vue'

export function variable() {
    let activeMenu = ref()
    let userLogin = ref(false)
    let messageValue = ref(0)
    let loginVisible = ref(false)
    let activeColor = ref()
    let scroll = ref()
    let menuList = ref([{
        id: 0,
        key: "home",
        name: "学习与讨论",
        state: "home",
    }, {
        id: 1,
        key: "about",
        name: "关于matrix",
        state: "about",
    }])
    return {
        activeMenu, userLogin, messageValue, menuList, loginVisible, activeColor, scroll
    }
}