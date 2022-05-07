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
    }])

    return {
        select, search, options
    }

}