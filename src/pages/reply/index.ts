import {App} from 'vue'
import MatrixReply from './reply.vue'

export default {
    install(app: App) {
        app.component(MatrixReply.name, MatrixReply)
    }
}
