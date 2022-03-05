import {App} from 'vue'

import CubeUserBlog from './user/component/userblog/userblog.vue'
import CUbeUserTalk from './user/component/usertalk/usertalk.vue'
import CubeInfo from './user/component/userInfo/userInfo.vue'
import CubeUserColumn from './user/component/usercolumn/usercolumn.vue'
import CubeUserCollect from './user/component/usercollect/usercollect.vue'
import CubeUserCare from './user/component/usercare/usercare.vue'
import CubeUserMessage from './user/component/usermessage/usermessage.vue'
import CubeSecurity from './set/component/security/security.vue'
import CubeBind from './set/component/bind/bind.vue'
import CubeMessageSet from './set/component/messageSet/messageSet.vue'
import CubeBlogDetail from './blog/component/blogdetail/blogdetail.vue'
import CubeColumnCatalogue from './blog/component/columncatalogue/columncatalogue.vue'

export default {
    install(app: App) {
        app.component(CubeUserBlog.name, CubeUserBlog)
        app.component(CUbeUserTalk.name, CUbeUserTalk)
        app.component(CubeInfo.name, CubeInfo)
        app.component(CubeUserColumn.name, CubeUserColumn)
        app.component(CubeUserCollect.name, CubeUserCollect)
        app.component(CubeUserCare.name, CubeUserCare)
        app.component(CubeUserMessage.name, CubeUserMessage)
        app.component(CubeSecurity.name, CubeSecurity)
        app.component(CubeBind.name, CubeBind)
        app.component(CubeMessageSet.name, CubeMessageSet)
        app.component(CubeBlogDetail.name, CubeBlogDetail)
        app.component(CubeColumnCatalogue.name, CubeColumnCatalogue)
    }
}
