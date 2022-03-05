import {ref} from 'vue'

export function initData() {
    let activeMenu = ref()
    let input = ref('')
    let showSearch = ref(false)
    let messageValue = ref(0)
    const menulist = ref([{
        id: 0,
        key: "home",
        name: "首页",
        state: "home",
        icon: "house"
    }, {
        id: 1,
        key: "community",
        name: "畅所欲言",
        state: "community",
        icon: "chat-dot-round"
    }, {
        id: 2,
        key: "about",
        name: "关于Cube",
        state: "about",
        icon: "question-filled"
    }])
    return {
        activeMenu, input, showSearch, messageValue, menulist
    }

}