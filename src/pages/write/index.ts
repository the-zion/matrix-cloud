import {App} from 'vue'

import MatrixWriteTalk from './talk.vue'
import MatrixWriteColumn from './column.vue'
import MatrixWriteSend from './component/send.vue'
import MatrixSendBlog from './component/blog.vue'

export default {
    install(app: App) {
        app.component(MatrixWriteTalk.name, MatrixWriteTalk)
        app.component(MatrixWriteSend.name, MatrixWriteSend)
        app.component(MatrixSendBlog.name, MatrixSendBlog)
        app.component(MatrixWriteColumn.name, MatrixWriteColumn)
    }
}
