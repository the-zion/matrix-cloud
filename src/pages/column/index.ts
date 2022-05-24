import {App} from 'vue'

import MatrixColumnList from './component/list.vue'
import MatrixColumnCreate from './component/create.vue'

export default {
    install(app: App) {
        app.component(MatrixColumnList.name, MatrixColumnList)
        app.component(MatrixColumnCreate.name, MatrixColumnCreate)
    }
}