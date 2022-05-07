import {ref} from 'vue'

export function variable() {
    let data = ref([])
    let currentPage = ref(1)

    return {data, currentPage}
}