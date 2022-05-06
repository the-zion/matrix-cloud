import {App} from 'vue'

import MatrixLogin from './component/login/main.vue'
import MatrixLoginAccount from './component/login/account/account.vue'
import MatrixLoginCode from './component/login/code/code.vue'
import MatrixLoginRegister from './component/login/register/register.vue'
import MatrixLoginForget from './component/login/forget/forget.vue'

export default {
    install(app: App) {
        app.component(MatrixLogin.name, MatrixLogin)
        app.component(MatrixLoginAccount.name, MatrixLoginAccount)
        app.component(MatrixLoginCode.name, MatrixLoginCode)
        app.component(MatrixLoginRegister.name, MatrixLoginRegister)
        app.component(MatrixLoginForget.name, MatrixLoginForget)
    }
}
