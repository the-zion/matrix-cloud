import {App} from 'vue'
import MatrixUserMiniCard from './component/mini.vue'

export default {
    install(app: App) {
        app.component(MatrixUserMiniCard.name, MatrixUserMiniCard)
    }
}
