import {App} from 'vue'

import MatrixTalkList from './component/list.vue'

export default {
    install(app: App) {
        app.component(MatrixTalkList.name, MatrixTalkList)
    }
}