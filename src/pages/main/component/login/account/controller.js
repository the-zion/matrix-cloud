import {variable} from "./variable.js"
import {ref} from "vue";
import {message} from "../../../../../utils/message";

export function controller() {

    let {loading, form, formRef} = variable()
    const rules = ref({
        account: [{validator: validateAccount, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}],
    })

    let emits = null
    const {success, error} = message()

    function initVariable() {
        return {loading, form, formRef, rules}
    }

    function init(emitsObject) {
        emits = emitsObject
    }

    function validateAccount(rule, value, callback) {
        if (!(checkPhone("+86" + value) || checkEmail(value))) {
            value || callback(new Error("账号不能为空"))
            callback(new Error("手机/邮箱 格式错误"))
        }
        callback()
    }

    function validatePassword(rule, value, callback) {
        value || callback(new Error("密码不能为空"))
        callback()
    }

    function checkPhone(value) {
        return value.match("^\\+[1-9]?[0-9]{7,14}$")
    }

    function checkEmail(value) {
        return value.match("^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
    }

    function login(formRef) {
        if (!formRef) {
            error("未知错误")
            return
        }
        formRef.validate((valid) => {
            if (!valid) {
                error("账号或密码有误，请检查")
            } else {
                loading.value = true
                setTimeout(function () {
                    success("登录成功")
                    loading.value = false
                    closeDialog()
                }, 500)
                return true
            }
        })
    }

    function closeDialog() {
        emits("close", "")
    }

    function mode(mode) {
        emits("update:mode", mode)
    }

    return {initVariable, init, login, mode}
}