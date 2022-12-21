import {App} from 'vue'

import MatrixTalkList from "./component/list.vue"
export default {
    install(app: App) {
        app.component("matrix-talk-list", MatrixTalkList)
    }
}