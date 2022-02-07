import {ref} from 'vue'
import router from '../../../router'
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";

export function controller(count, buttonDisable, phoneNumber, emailNumber, routerParams, isLoading) {

    function init() {
        let route = useRoute()
        routerParams = Object.assign(routerParams, route.params)
        let phone = routerParams.phoneNumber
        let email = routerParams.emailNumber
        if (!phone && !email) {
            back()
            return 0
        }
        phone && (phoneNumber.value = phone.slice(0, 3) + "******" + phone.slice(-2,))
        email && (emailNumber.value = email)
        countDown()

    }

    function countDown() {
        count.value = 60
        let interval = setInterval(() => {
            count.value--
            if (count.value === 0) {
                // this.show = true
                clearInterval(interval)
            }
        }, 1000)
    }

    function codeGet() {
        countDown()
    }

    function codeInput(code) {
        buttonDisable.value = code.length === 6
    }

    function back() {
        router.push({name: 'loginMain', replace: true})
    }

    function passwordLogin() {
        router.push({name: 'password', replace: true, params: routerParams})
    }

    function buttonNext() {
        let state = routerParams.state
        isLoading.value = true
        setTimeout(function () {
            isLoading.value = false
            if (state === 'passwordReset') {
                router.push({name: routerParams.state, replace: true, params: routerParams})
            } else {
                ElMessage({
                    message: '已登录，即将跳转',
                    type: 'success',
                })
                router.push({name: 'home', replace: true})
            }
        }, 1000)
    }

    return {init, countDown, codeGet, codeInput, back, passwordLogin, buttonNext}
}