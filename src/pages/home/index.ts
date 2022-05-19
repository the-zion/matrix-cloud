import {App} from 'vue'

import MatrixHomeAside from './component/aside/aside.vue'
import MatrixHomeCreate from './component/create/create.vue'

export default {
    install(app: App) {
        app.component(MatrixHomeAside.name, MatrixHomeAside)
        app.component(MatrixHomeCreate.name, MatrixHomeCreate)
    }
}
