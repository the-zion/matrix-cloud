import {App} from 'vue'

import MatrixWriteSend from './component/send.vue'
import MatrixSendBlog from './component/blog.vue'

export default {
    install(app: App) {
        app.component(MatrixWriteSend.name, MatrixWriteSend)
        app.component(MatrixSendBlog.name, MatrixSendBlog)
    }
}
