import {App} from 'vue'
import MatrixList from './list/list.vue'
import MatrixCard from './card/card.vue'

export default {
    install(app: App) {
        app.component(MatrixList.name, MatrixList)
        app.component(MatrixCard.name, MatrixCard)
    }
}
