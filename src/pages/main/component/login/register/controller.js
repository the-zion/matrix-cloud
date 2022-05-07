import {variable} from "./variable.js"
import {message} from "../../../../../utils/message"
import {ref} from "vue";

export function controller() {

    let {form, formRef, loading} = variable()
    const rules = ref({
        email: [{validator: validateEmail, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}]
    })

    let emits = null
    const {success, error} = message()

    function initData() {
        return {form, formRef, loading, rules}
    }

    function init(emitsObject) {
        emits = emitsObject
    }

    function validateEmail(rule, value, callback) {
        if (!checkEmail(value)) {
            value || callback(new Error("邮箱不能为空"))
            callback(new Error("邮箱格式错误"))
        }
        callback()
    }

    function validatePassword(rule, value, callback) {
        value || callback(new Error("密码不能为空"))
        callback()
    }

    function checkEmail(value) {
        return value.match("^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
    }

    function register(formRef) {
        if (!formRef) {
            error("未知错误")
            return
        }
        formRef.validate((valid) => {
            if (!valid) {
                error("邮箱输入有误，请检查")
            } else {
                loading.value = true
                setTimeout(function () {
                    loading.value = false
                    success("账号注册成功")
                    closeDialog()
                }, 500)
                return true
            }
        })
    }

    function mode(mode) {
        emits("update:mode", mode)
    }

    function closeDialog() {
        emits("close", "")
    }

    return {initData, init, register, mode}
}