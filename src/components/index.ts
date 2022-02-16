import {App} from 'vue'
import CubeCommentDialog from './commentDialog/commentDialog.vue'
import CubeExpressDialog from './expressDialog/expressDialog.vue'
import CubeExpress from './express/express.vue'
import CubeComment from './comment/comment.vue'

export default {
    install(app: App) {
        app.component(CubeCommentDialog.name, CubeCommentDialog)
        app.component(CubeExpressDialog.name, CubeExpressDialog)
        app.component(CubeExpress.name, CubeExpress)
        app.component(CubeComment.name, CubeComment)
    }
}
