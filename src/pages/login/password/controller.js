import router from '../../../router'
import {useRoute} from "vue-router"
import {ElMessage} from "element-plus"

export function controller(buttonDisable, routerParams, isLoading) {

    function init() {
        let route = useRoute()
        routerParams = Object.assign(routerParams, route.params)
        let phone = routerParams.phoneNumber
        let email = routerParams.emailNumber
        phone || email || back()
    }

    function passwordInput(password) {
        buttonDisable.value = password.length > 0
    }

    function back() {
        router.push({name: 'loginMain', replace: true})
    }

    function passwordReset() {
        let params = {}
        let key = routerParams.state + "Number"
        params[key] = routerParams[key]
        params['state'] = "passwordReset"
        router.push({
            name: 'code',
            replace: true,
            params: params
        })
    }

    function buttonNext() {
        isLoading.value = true
        setTimeout(function () {
            isLoading.value = false
            ElMessage({
                message: '已登录，即将跳转',
                type: 'success',
            })
            setTimeout(function () {
                router.push({name: 'home', replace: true})
            }, 1000)
        }, 1000)
    }

    function codeLogin() {
        router.push({
            name: 'code',
            replace: true,
            params: routerParams
        })
    }

    return {init, passwordInput, back, passwordReset, buttonNext, codeLogin}
}