import {ref} from 'vue'
import router from '../../../router'
import {useRoute} from "vue-router";

export function controller(count, buttonDisable, phoneNumber, routerParams, isLoading) {

    function init() {
        let route = useRoute()
        routerParams = Object.assign(routerParams, route.params)
        let phone = routerParams.phoneNumber
        if (!phone) {
            back()
            return 0
        }
        phoneNumber.value = phone.slice(0, 3) + "******" + phone.slice(-2,)
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
        router.push({name: 'password', replace: true, params: {phoneNumber: routerParams.phoneNumber}})
    }

    function buttonNext() {
        isLoading.value = true
        setTimeout(function () {
            isLoading.value = false
            router.push({name: routerParams.state, replace: true, params: {phoneNumber: routerParams.phoneNumber}})
        }, 1000)
    }

    return {init, countDown, codeGet, codeInput, back, passwordLogin, buttonNext}
}