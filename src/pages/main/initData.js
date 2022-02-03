import {h, ref, watch} from 'vue'
import {ElDivider} from 'element-plus'

export function initData() {
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
        name: "江湖",
        state: "community",
        icon: "chat-dot-round"
    }, {
        id: 2,
        key: "blog",
        name: "我要发表",
        state: "blog",
        icon: "edit-pen"
    }, {
        id: 3,
        key: "message",
        name: "消息中心",
        state: "message",
        icon: "message"
    }, {
        id: 4,
        key: "search",
        name: "站内搜索",
        state: "search",
        icon: "search"
    }, {
        id: 5,
        key: "user",
        name: "个人中心",
        state: "user",
        icon: "user"
    }, {
        id: 6,
        key: "setting",
        name: "账号设置",
        state: "setting",
        icon: "setting"
    }, {
        id: 7,
        key: "about",
        name: "关于Cube",
        state: "about",
        icon: "question-filled"
    }])
    return {
        input, showSearch, messageValue, menulist
    }

}