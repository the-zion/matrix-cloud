import {App} from 'vue'

import MatrixArticleList from './component/list.vue'
export default {
    install(app: App) {
        app.component("matrix-article-list", MatrixArticleList)
    }
}
