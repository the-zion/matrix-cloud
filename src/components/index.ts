import {App} from 'vue'
import MatrixList from './list/list.vue'
import MatrixBlog from './blog/blog.vue'
import MatrixColumn from './column/column.vue'
import MatrixTalk from './talk/talk.vue'
import MatrixCard from './card/card.vue'
import MatrixTag from './tag/tag.vue'

export default {
    install(app: App) {
        app.component(MatrixList.name, MatrixList)
        app.component(MatrixBlog.name, MatrixBlog)
        app.component(MatrixColumn.name, MatrixColumn)
        app.component(MatrixTalk.name, MatrixTalk)
        app.component(MatrixCard.name, MatrixCard)
        app.component(MatrixTag.name, MatrixTag)
    }
}
