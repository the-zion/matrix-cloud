import {App} from 'vue'
import MatrixList from './list.vue'

export default {
    install(app: App) {
        app.component(MatrixList.name, MatrixList)
    }
}
