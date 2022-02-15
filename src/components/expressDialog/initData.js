import {ref} from "vue"

export function initData() {
    let mode = ref('picture')
    let textArea = ref("")
    let picturesBox = ref("")
    return {mode, textArea, picturesBox}
}