import {App} from 'vue'

import CubeLogin from './component/login/main.vue'
import CubeLoginAccount from './component/login/account/account.vue'
import CubeLoginCode from './component/login/code/code.vue'
import CubeLoginRegister from './component/login/register/register.vue'
import CubeLoginForget from './component/login/forget/forget.vue'

export default {
    install(app: App) {
        app.component(CubeLogin.name, CubeLogin)
        app.component(CubeLoginAccount.name, CubeLoginAccount)
        app.component(CubeLoginCode.name, CubeLoginCode)
        app.component(CubeLoginRegister.name, CubeLoginRegister)
        app.component(CubeLoginForget.name, CubeLoginForget)
    }
}
