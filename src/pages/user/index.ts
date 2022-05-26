import {App, defineAsyncComponent} from 'vue'

const MatrixUserMiniCard = defineAsyncComponent(() =>
    import('./component/mini.vue')
)
const MatrixUserList = defineAsyncComponent(() =>
    import('./component/list.vue')
)

export default {
    install(app: App) {
        app.component("matrix-user-mini-card", MatrixUserMiniCard)
        app.component("matrix-user-list", MatrixUserList)
    }
}
