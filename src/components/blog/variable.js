import {ref} from 'vue'

export function variable() {

    let avatar = null
    let data = ref([])

    return {avatar, data}
}