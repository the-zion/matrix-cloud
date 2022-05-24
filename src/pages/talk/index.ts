import {App} from 'vue'

import MatrixTalkList from './component/list.vue'
import MatrixTalkCreate from './component/create.vue'

export default {
    install(app: App) {
        app.component(MatrixTalkList.name, MatrixTalkList)
        app.component(MatrixTalkCreate.name, MatrixTalkCreate)
    }
}