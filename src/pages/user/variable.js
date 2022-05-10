import {ref} from 'vue'

export function variable() {

    let current = ref("blog")
    let menus = ref([{
            name: "blog",
            label: "博客",
            icon: "icon-read",
            select: true,
        }, {
            name: "column",
            label: "专栏",
            icon: "icon-folder",
            select: false
        }, {
            name: "talk",
            label: "讨论发起",
            icon: "icon-message",
            select: false
        }, {
            name: "collect",
            label: "收藏",
            icon: "icon-star",
            select: false
        }]
    )

    return {
        current, menus
    }
}