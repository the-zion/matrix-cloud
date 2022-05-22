import {App} from 'vue'

import MatrixTalkCard from './component/talk-card.vue'
import MatrixTalkCreate from './component/create.vue'

export default {
    install(app: App) {
        app.component(MatrixTalkCard.name, MatrixTalkCard)
        app.component(MatrixTalkCreate.name, MatrixTalkCreate)
    }
}