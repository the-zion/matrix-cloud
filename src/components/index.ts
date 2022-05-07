import {App} from 'vue'
import MatrixList from './list/list.vue'
import MatrixBlog from './blog/blog.vue'
import MatrixColumn from './column/column.vue'
import MatrixTalk from './talk/talk.vue'
import CubeCommentDialog from './commentDialog/commentDialog.vue'
import CubeExpressDialog from './expressDialog/expressDialog.vue'
import CubeExpress from './express/express.vue'
import CubeComment from './comment/comment.vue'
import CubeEmoji from './emoji/emoji.vue'
import CubePopoverEmoji from './popoverEmoji/popoverEmoji.vue'
import CubeShare from './share/share.vue'
import CubeReply from './reply/reply.vue'
import CubeInput from './input/input.vue'
import CubeTimeLine from './timeline/timeline.vue'
import CubeBlogIntroduce from './blogIntroduce/blogIntroduce.vue'
import CubeDialog from './dialog/dialog.vue'
import CubeForm from './form/form.vue'
import CubeColumnCard from './card/column/column.vue'
import CubeUserCard from './card/user/user.vue'
import CubeAside from './aside/aside.vue'

export default {
    install(app: App) {
        app.component(MatrixList.name, MatrixList)
        app.component(MatrixBlog.name, MatrixBlog)
        app.component(MatrixColumn.name, MatrixColumn)
        app.component(MatrixTalk.name, MatrixTalk)
        app.component(CubeCommentDialog.name, CubeCommentDialog)
        app.component(CubeExpressDialog.name, CubeExpressDialog)
        app.component(CubeExpress.name, CubeExpress)
        app.component(CubeComment.name, CubeComment)
        app.component(CubeEmoji.name, CubeEmoji)
        app.component(CubePopoverEmoji.name, CubePopoverEmoji)
        app.component(CubeShare.name, CubeShare)
        app.component(CubeReply.name, CubeReply)
        app.component(CubeInput.name, CubeInput)
        app.component(CubeTimeLine.name, CubeTimeLine)
        app.component(CubeBlogIntroduce.name, CubeBlogIntroduce)
        app.component(CubeDialog.name, CubeDialog)
        app.component(CubeForm.name, CubeForm)
        app.component(CubeColumnCard.name, CubeColumnCard)
        app.component(CubeUserCard.name, CubeUserCard)
        app.component(CubeAside.name, CubeAside)
    }
}
