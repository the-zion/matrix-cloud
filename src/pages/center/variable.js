import {ref} from 'vue'

export function variable() {

    let menu = ref("blog")

    return {
        menu
    }

}