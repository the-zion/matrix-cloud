import {ref} from 'vue'

export function variable() {

    let mode = ref("account")

    return {
        mode
    }

}