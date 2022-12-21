import {App} from 'vue'

import MatrixTag from "./tag.vue"
export default {
    install(app: App) {
        app.component("matrix-tag", MatrixTag)
    }
}
