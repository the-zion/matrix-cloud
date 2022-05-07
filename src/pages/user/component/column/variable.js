import {ref} from 'vue'

export function variable() {

    let select = ref("new")
    let search = ref()
    const options = ref([{
        key: "new",
        label: "最新发表"
    }, {
        key: "hot",
        label: "最多点赞"
    }, {
        key: "collect",
        label: "最多收藏"
    }])

    return {
        select, search, options
    }

}