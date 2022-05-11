import {App} from 'vue'

import MatrixCenterNavigation from './component/navigation/navigation.vue'
import MatrixCenterBlog from './component/blog/blog.vue'
import MatrixCenterColumn from './component/column/column.vue'
import MatrixCenterTalk from './component/talk/talk.vue'
import MatrixCenterCollect from './component/collect/collect.vue'

export default {
    install(app: App) {
        app.component(MatrixCenterNavigation.name, MatrixCenterNavigation)
        app.component(MatrixCenterBlog.name, MatrixCenterBlog)
        app.component(MatrixCenterColumn.name, MatrixCenterColumn)
        app.component(MatrixCenterTalk.name, MatrixCenterTalk)
        app.component(MatrixCenterCollect.name, MatrixCenterCollect)
    }
}
