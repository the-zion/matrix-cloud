import {ref} from 'vue'

export function initData() {
    let menu = ref([{
            name: "time",
            label: "动态",
            icon: "timer"
        }, {
            name: "blog",
            label: "博客",
            icon: "document"
        }, {
            name: "talk",
            label: "畅所欲言",
            icon: "chat-dot-round"
        }, {
            name: "column",
            label: "专栏",
            icon: "folder"
        }, {
            name: "collect",
            label: "收藏",
            icon: "star"
        }, {
            name: "care",
            label: "我关注的",
            icon: "user"
        }, {
            name: "cared",
            label: "关注我的",
            icon: "user"
        }, {
            name: "message",
            label: "留言",
            icon: "message"
        }]
    )

    return {
        menu
    }

}