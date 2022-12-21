import {App} from 'vue'

import MatrixCollectList from './component/list.vue'
export default {
    install(app: App) {
        app.component("matrix-collect-list", MatrixCollectList)
    }
}
