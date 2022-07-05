import {App, defineAsyncComponent} from 'vue'

const MatrixArticleList = defineAsyncComponent(() =>
    import('./component/list.vue')
)
export default {
    install(app: App) {
        app.component("matrix-article-list", MatrixArticleList)
    }
}
