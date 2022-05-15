import {App} from 'vue'

import MatrixHomeAside from './component/aside/aside.vue'

export default {
    install(app: App) {
        app.component(MatrixHomeAside.name, MatrixHomeAside)
    }
}
