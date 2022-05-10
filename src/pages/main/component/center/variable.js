import {ref} from 'vue'

export function variable() {

    let name = ref("")
    let introduce = ref("")
    return {
        name, introduce
    }

}