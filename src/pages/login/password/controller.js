import {ref} from 'vue'
import router from '../../../router'
import {useRoute} from "vue-router";

export function controller(buttonDisable, routerParams) {

    function init() {
        let route = useRoute()
        routerParams = Object.assign(routerParams, route.params)
        let phone = routerParams.phoneNumber
        phone || back()
    }

    function passwordInput(password) {
        buttonDisable.value = password.length > 0
    }

    function back() {
        router.push({name: 'loginMain', replace: true})
    }

    function passwordReset() {
        router.push({
            name: 'phoneCode',
            replace: true,
            params: {phoneNumber: routerParams.phoneNumber, state: "passwordReset"}
        })
    }

    return {init, passwordInput, back, passwordReset}
}