import {App} from 'vue'

import MatrixCenterNavigation from './component/navigation/navigation.vue'
import MatrixCenterBlog from './component/blog/blog.vue'

export default {
    install(app: App) {
        app.component(MatrixCenterNavigation.name, MatrixCenterNavigation)
        app.component(MatrixCenterBlog.name, MatrixCenterBlog)
    }
}
