import {ref} from 'vue'
import router from '../../../router'

export function controller(activeName, inputPhone, inputEmail, buttonDisable, currentNote, isLoading) {

    let notes = [
        "注：未注册的手机号会自动注册",
        "注：未注册的邮箱会自动注册",
    ]

    function visitor() {
        router.push({name: 'home', replace: true})
    }

    function phoneInput(number) {
        let reg = /^1[0-9]{10}$/
        buttonDisable.value = !reg.test(number)
        currentNote.value = notes[0]
    }

    function emailInput(email) {
        let reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
        buttonDisable.value = !reg.test(email)
        currentNote.value = notes[1]
    }

    function handleClick() {
        let tab = activeName.value
        tab === 'phone' && phoneInput(inputPhone.value)
        tab === 'email' && emailInput(inputEmail.value)
    }

    function buttonNext() {
        isLoading.value = true
        let tab = activeName.value
        let params = {}
        params[tab + "Number"] = tab === 'phone' ? inputPhone.value : inputEmail.value
        params['state'] = tab
        setTimeout(function () {
            isLoading.value = false
            // router.push({name: 'code', replace: true, params: params})
            router.push({name: 'code', params: params})
        }, 1000)
    }

    return {visitor, phoneInput, emailInput, handleClick, buttonNext}
}