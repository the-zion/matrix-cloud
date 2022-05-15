import {App} from 'vue'

import MatrixCenterNavigation from './component/navigation/navigation.vue'
import MatrixCenterProfileEdit from './component/profile/edit.vue'
import MatrixCenterSecurityEdit from './component/security/edit.vue'
import MatrixIdentityVerification from './component/identity/identity.vue'
import MatrixSecurityEmail from './component/email/email.vue'
import MatrixSecurityPhone from './component/phone/phone.vue'
import MatrixSecurityPassword from './component/password/password.vue'

export default {
    install(app: App) {
        app.component(MatrixCenterNavigation.name, MatrixCenterNavigation)
        app.component(MatrixCenterProfileEdit.name, MatrixCenterProfileEdit)
        app.component(MatrixCenterSecurityEdit.name, MatrixCenterSecurityEdit)
        app.component(MatrixIdentityVerification.name, MatrixIdentityVerification)
        app.component(MatrixSecurityEmail.name, MatrixSecurityEmail)
        app.component(MatrixSecurityPhone.name, MatrixSecurityPhone)
        app.component(MatrixSecurityPassword.name, MatrixSecurityPassword)
    }
}
