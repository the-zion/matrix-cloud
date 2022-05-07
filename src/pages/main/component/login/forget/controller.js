import {variable} from "./variable.js"
import {ref} from "vue";
import {message} from "../../../../../utils/message";

export function controller() {

    let {width, text, codeSending, interval, step, loading, formRef1, formRef2, options, form1, form2} = variable()
    const rules1 = ref({
        phone: [{validator: validatePhone, trigger: 'blur'}],
        code: [{validator: validateCode, trigger: 'blur'}],
        email: [{validator: validateEmail, trigger: 'blur'}]
    })
    const rules2 = ref({
        password: [{validator: validatePassword, trigger: 'blur'}],
        repeat: [{validator: validateRepeat, trigger: 'blur'}],
    })

    let emit = null
    const {success, error} = message()

    function initVariable() {
        return {
            width,
            text,
            codeSending,
            interval,
            step,
            loading,
            formRef1,
            formRef2,
            options,
            form1,
            form2,
            rules1,
            rules2
        }
    }

    function init(emitObject) {
        emit = emitObject
    }


    function validatePhone(rule, value, callback) {
        if (!checkPhone("+86" + value)) {
            value || callback(new Error("手机号不能为空"))
            callback(new Error("手机号格式错误"))
        }
        callback()
    }

    function validateEmail(rule, value, callback) {
        if (!checkEmail(value)) {
            value || callback(new Error("邮箱不能为空"))
            callback(new Error("邮箱格式错误"))
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

    function validatePassword(rule, value, callback) {
        if (!checkPassword(value)) {
            value || callback(new Error("密码不能为空"))
            callback(new Error("密码需同时包含字母和数字，至少 8 个字符"))
        }
        callback()
    }

    function validateRepeat(rule, value, callback) {
        if (!checkRepeat(value)) {
            value || callback(new Error("密码不能为空"))
            callback(new Error("密码需同时包含字母和数字，至少 8 个字符"))
        }
        callback()
    }


    function checkPhone(value) {
        return value.match("^\\+[1-9]?[0-9]{7,14}$")
    }

    function checkEmail(value) {
        return value.match("^[a-z0-9]+([._\\\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
    }

    function checkCode(value) {
        return value.match("^[0-9]{6}$")
    }

    function checkPassword(value) {
        return value.match("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$")
    }

    function checkRepeat(value) {
        return value === form2.value.password
    }

    function selectChange() {
        form1.value.phone = ""
        form1.value.email = ""
        form1.value.code = ""
        cancelInterval()
    }

    function sendCode() {
        if (interval.value || !(form1.value.select === 'phone' ? checkPhone("+86" + form1.value.phone) : checkEmail(form1.value.email))) {
            interval.value || error(form1.value.select === 'phone' ? "手机号有误，请检查" : "邮箱有误，请检查")
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

    function nextStep(formRef) {
        if (!formRef) {
            error("未知错误")
            return
        }
        formRef.validate((valid) => {
            if (!valid) {
                error("账号或验证码有误，请检查")
            } else {
                loading.value = true
                setTimeout(function () {
                    loading.value = false
                    cancelInterval()
                    step.value = "step2"
                }, 500)
                return true
            }
        })
    }

    function passwordReset(formRef) {
        if (!formRef) {
            error("未知错误")
            return
        }
        formRef.validate((valid) => {
            if (!valid) {
                error("密码输入有误，请检查")
            } else {
                success("密码重置成功，请重新登录")
                mode("account")
                return true
            }
        })
    }

    function mode(mode) {
        cancelInterval()
        emit("update:mode", mode)
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

    return {initVariable, init, selectChange, sendCode, nextStep, passwordReset, mode}
}