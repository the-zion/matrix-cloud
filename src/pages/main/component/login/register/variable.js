import {ref} from 'vue'

export function variable() {

    let form = ref({
        email: "",
        password: ""
    })
    let formRef = ref()
    let loading = ref(false)

    return {
        form, formRef, loading
    }

}