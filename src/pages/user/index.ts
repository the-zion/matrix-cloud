import {App} from 'vue'

import MatrixUserProfile from './component/profile/profile.vue'
import MatrixUserCard from './component/card/card.vue'
import MatrixUserCalendar from './component/calendar/calendar.vue'
import MatrixUserBlog from './component/blog/blog.vue'
import MatrixUserColumn from './component/column/column.vue'
import MatrixUserTalk from './component/talk/talk.vue'

export default {
    install(app: App) {
        app.component(MatrixUserProfile.name, MatrixUserProfile)
        app.component(MatrixUserCard.name, MatrixUserCard)
        app.component(MatrixUserCalendar.name, MatrixUserCalendar)
        app.component(MatrixUserBlog.name, MatrixUserBlog)
        app.component(MatrixUserColumn.name, MatrixUserColumn)
        app.component(MatrixUserTalk.name, MatrixUserTalk)
    }
}
