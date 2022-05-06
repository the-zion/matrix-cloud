import {App} from 'vue'

import MatrixUserProfile from './component/profile/profile.vue'
import MatrixUserCard from './component/card/card.vue'
import MatrixUserCalendar from './component/calendar/calendar.vue'
import MatrixUserBlog from './component/blog/blog.vue'

export default {
    install(app: App) {
        app.component(MatrixUserProfile.name, MatrixUserProfile)
        app.component(MatrixUserCard.name, MatrixUserCard)
        app.component(MatrixUserCalendar.name, MatrixUserCalendar)
        app.component(MatrixUserBlog.name, MatrixUserBlog)
    }
}
