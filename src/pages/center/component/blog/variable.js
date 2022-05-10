import {ref} from 'vue'

export function variable() {

    let bar = ref([{
        key: "new",
        label: "最新发表",
        icon: "icon-time-circle",
        select: true
    }, {
        key: "hot",
        label: "最多点赞",
        icon: "icon-like",
        select: false
    }, {
        key: "collect",
        label: "最多收藏",
        icon: "icon-star",
        select: false
    }, {
        key: "view",
        label: "最多观看",
        icon: "icon-eye",
        select: false
    }])

    return {
        bar
    }

}