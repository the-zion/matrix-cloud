import {App} from 'vue'

import MatrixComment from "./comment.vue"
export default {
    install(app: App) {
        app.component("matrix-comment", MatrixComment)
    }
}
