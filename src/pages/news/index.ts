import {App} from 'vue'

import MatrixNewsList from "./news.vue"
export default {
    install(app: App) {
        app.component("matrix-news-list", MatrixNewsList)
    }
}
