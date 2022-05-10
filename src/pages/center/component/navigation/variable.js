import {ref} from 'vue'

export function variable() {

    let nickname = ref("刘小圆sama")
    let name = ref("neo")
    let menu = ref([{
        key: "blog",
        label: "我的博客",
        icon: "document",
        select: true,
    }, {
        key: "column",
        label: "我的专栏",
        icon: "files",
        select: false
    }, {
        key: "talk",
        label: "讨论发起",
        icon: "chat-dot-round",
        select: false
    }, {
        key: "collect",
        label: "我的收藏",
        icon: "star",
        select: false
    }, {
        key: "profile",
        label: "个人资料",
        icon: "user",
        select: false
    }, {
        key: "security",
        label: "账号安全",
        icon: "lock",
        select: false
    }])
    return {
        nickname, name, menu
    }

}