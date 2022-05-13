import {App} from 'vue'

import MatrixCenterNavigation from './component/navigation/navigation.vue'
import MatrixCenterBlog from './component/blog/blog.vue'
import MatrixCenterColumn from './component/column/column.vue'
import MatrixCenterTalk from './component/talk/talk.vue'
import MatrixCenterCollect from './component/collect/collect.vue'
import MatrixCenterProfile from './component/profile/profile.vue'
import MatrixCenterProfileEdit from './component/profile/edit/edit.vue'
import MatrixCenterSecurity from './component/security/security.vue'
import MatrixCenterSecurityEdit from './component/security/edit/edit.vue'
import MatrixIdentityVerification from './component/security/edit/identity/identity.vue'

export default {
    install(app: App) {
        app.component(MatrixCenterNavigation.name, MatrixCenterNavigation)
        app.component(MatrixCenterBlog.name, MatrixCenterBlog)
        app.component(MatrixCenterColumn.name, MatrixCenterColumn)
        app.component(MatrixCenterTalk.name, MatrixCenterTalk)
        app.component(MatrixCenterCollect.name, MatrixCenterCollect)
        app.component(MatrixCenterProfile.name, MatrixCenterProfile)
        app.component(MatrixCenterProfileEdit.name, MatrixCenterProfileEdit)
        app.component(MatrixCenterSecurity.name, MatrixCenterSecurity)
        app.component(MatrixCenterSecurityEdit.name, MatrixCenterSecurityEdit)
        app.component(MatrixIdentityVerification.name, MatrixIdentityVerification)
    }
}
