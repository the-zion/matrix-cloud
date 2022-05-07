import {ref} from 'vue'

export function variable() {

    let width = ref(68)
    let text = ref("获取验证码")
    let codeSending = ref(false)
    let interval = ref(null)
    let loading = ref(false)

    let form = ref({
        phone: "",
        code: ""
    })
    let formRef = ref()

    return {
        width, text, codeSending, interval, loading, form, formRef
    }
}