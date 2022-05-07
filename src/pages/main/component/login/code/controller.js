import {variable} from "./variable.js"
import {ref} from "vue";
import {message} from "../../../../../utils/message"

export function controller() {

    let {width, text, codeSending, interval, loading, form, formRef} = variable()
    const rules = ref({
        phone: [{validator: validatePhone, trigger: 'blur'}],
        code: [{validator: validateCode, trigger: 'blur'}],
    })

    let emits = null
    const {success, error} = message()

    function initVariable() {
        return {width, text, codeSending, interval, loading, form, formRef, rules}
    }

    function init(emitsObject) {
        emits = emitsObject
    }

    function sendCode() {
        if (interval.value || !checkPhone("+86" + form.value.phone)) {
            interval.value || error("手机号有误，请检查")
            return null
        }
        codeSending.value = true
        setTimeout(function () {
            countDown()
        }, 500)
    }

    function countDown() {
        let countdown = 300
        codeSending.value = false
        width.value = 90
        text.value = countdown
        interval.value = setInterval(() => {
            countdown--
            text.value = countdown
            if (countdown === 0) {
                cancelInterval()
            }
        }, 1000)
    }

    function cancelInterval() {
        if (!interval.value) {
            return null
        }
        width.value = 68
        text.value = "获取验证码"
        clearInterval(interval.value)
        interval.value = null
    }

    function mode(mode) {
        cancelInterval()
        emits("update:mode", mode)
    }

    function validatePhone(rule, value, callback) {
        if (!checkPhone("+86" + value)) {
            value || callback(new Error("手机号不能为空"))
            callback(new Error("手机号格式错误"))
        }
        callback()
    }

    function validateCode(rule, value, callback) {
        if (!checkCode(value)) {
            value || callback(new Error("验证码不能为空"))
            callback(new Error("验证码为6位数字"))
        }
        callback()
    }

    function checkPhone(value) {
        return value.match("^\\+[1-9]?[0-9]{7,14}$")
    }

    function checkCode(value) {
        return value.match("^[0-9]{6}$")
    }

    function login(formRef) {
        if (!formRef) {
            error("未知错误")
            return
        }
        formRef.validate((valid) => {
            if (!valid) {
                error("手机号或验证码有误，请检查")
            } else {
                loading.value = true
                setTimeout(function () {
                    loading.value = false
                    success("登录成功")
                    closeDialog()
                }, 500)
                return true
            }
        })
    }

    function closeDialog() {
        emits("close", "")
    }

    return {initVariable, init, sendCode, mode, login}
}