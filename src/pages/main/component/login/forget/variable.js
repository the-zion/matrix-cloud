import {ref} from 'vue'

export function variable() {

    let width = ref(68)
    let text = ref("获取验证码")
    let codeSending = ref(false)
    let interval = ref(null)
    let step = ref("step1")
    let loading = ref(false)
    let formRef1 = ref()
    let formRef2 = ref()

    let options = ref([{
        key: "phone",
        value: "phone",
        label: "用手机号重设"
    }, {
        key: "email",
        value: "email",
        label: "用邮箱重设"
    }])
    let form1 = ref({
        select: "phone",
        phone: "",
        email: "",
        code: ""
    })
    let form2 = ref({
        password: "",
        repeat: "",
    })

    return {
        width, text, codeSending, interval, step, loading, formRef1, formRef2, options, form1, form2
    }

}