import {App} from 'vue'
import MatrixUserMiniCard from './component/mini.vue'
import MatrixUserList from './component/list.vue'

export default {
    install(app: App) {
        app.component(MatrixUserMiniCard.name, MatrixUserMiniCard)
        app.component(MatrixUserList.name, MatrixUserList)
    }
}
