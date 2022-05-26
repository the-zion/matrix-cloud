import {App, defineAsyncComponent} from 'vue'

const MatrixBlogList = defineAsyncComponent(() =>
    import('./component/list.vue')
)
export default {
    install(app: App) {
        app.component("matrix-blog-list", MatrixBlogList)
    }
}
