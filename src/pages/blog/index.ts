import {App} from 'vue'
import MatrixBlogList from './component/list.vue'

export default {
    install(app: App) {
        app.component(MatrixBlogList.name, MatrixBlogList)
    }
}
