import {ref} from "vue"

export function initData() {
    let commentInput = ref('')
    return {commentInput}
}