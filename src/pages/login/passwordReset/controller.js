import {ref} from 'vue'
import router from '../../../router'
import {useRoute} from "vue-router";

export function controller(buttonDisable, routerParams, passWordPass, repeatPass, passwordError, repeatError) {

    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let inputPassword = null
    let repeatPassword = null
    let passwordWord = "密码需同时包含字母和数字，至少 8 个字符"
    let repeatWord = "两次密码输入不一致"

    function init() {
        let route = useRoute()
        routerParams = Object.assign(routerParams, route.params)
        routerParams.phoneNumber || back()
    }

    function passwordInput(password) {
        inputPassword = password
        passwordError.value = ''
        passWordPass.value = passwordCheck(password)
        buttonDisable.value = passWordPass.value && inputPassword === repeatPassword
    }

    function passwordRepeat(repeat) {
        repeatPassword = repeat
        repeatError.value = ''
        repeatPass.value = inputPassword === repeatPassword
        buttonDisable.value = passWordPass.value && repeatPass.value
    }

    function back() {
        router.push({name: 'loginMain', replace: true})
    }

    function passwordCheck(value) {
        return reg.test(value)
    }

    function passwordBlur() {
        !passWordPass.value && (passwordError.value = passwordWord)
        if (inputPassword !== repeatPassword) {
            repeatError.value = repeatWord
        }else{
            repeatError.value = ''
        }
    }

    function repeatBlur() {
        !repeatPass.value && (repeatError.value = repeatWord)
        if (!passWordPass.value) {
            passwordError.value = passwordWord
        }else{
            passwordError.value = ''
        }
    }

    return {init, passwordInput, passwordRepeat, back, passwordBlur, repeatBlur}
}