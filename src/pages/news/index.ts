import {App, defineAsyncComponent} from 'vue'

const MatrixNewsList = defineAsyncComponent(() =>
    import('./news.vue')
)
export default {
    install(app: App) {
        app.component("matrix-news-list", MatrixNewsList)
    }
}
