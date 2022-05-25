import {App} from 'vue'

import MatrixColumnList from './component/list.vue'

export default {
    install(app: App) {
        app.component(MatrixColumnList.name, MatrixColumnList)
    }
}