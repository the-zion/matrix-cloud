import {App} from 'vue'

import MatrixColumnCard from './component/card.vue'
import MatrixColumnCreate from './component/create.vue'

export default {
    install(app: App) {
        app.component(MatrixColumnCard.name, MatrixColumnCard)
        app.component(MatrixColumnCreate.name, MatrixColumnCreate)
    }
}