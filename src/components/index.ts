import {App} from 'vue'
import CubeCommentDialog from './commentDialog/commentDialog.vue'

export default {
    install(app: App) {
        app.component(CubeCommentDialog.name, CubeCommentDialog)
    }
}
