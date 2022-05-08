import {ref} from 'vue'

export function variable() {

    let select = ref("blog")
    const options = ref([{
        key: "blog",
        label: "博客"
    }, {
        key: "column",
        label: "专栏"
    }])

    return {
        select, options
    }

}