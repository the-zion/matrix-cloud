import {App} from 'vue'

import MatrixUserMiniCard from "./component/mini.vue"
import MatrixUserList from "./component/list.vue"

export default {
    install(app: App) {
        app.component("matrix-user-mini-card", MatrixUserMiniCard)
        app.component("matrix-user-list", MatrixUserList)
    }
}
