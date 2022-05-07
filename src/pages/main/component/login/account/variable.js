import {ref} from 'vue'

export function variable() {

    let loading = ref(false)
    let form = ref({
        account: "",
        password: ""
    })
    let formRef = ref()

    return {
        loading, form, formRef
    }

}