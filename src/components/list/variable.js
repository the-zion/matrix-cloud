import {ref} from 'vue'

export function variable() {

    let mode = null
    let data = ref([])

    return {mode, data}
}