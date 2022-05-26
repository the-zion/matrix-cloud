import {App, defineAsyncComponent} from 'vue'

const MatrixTalkList = defineAsyncComponent(() =>
    import('./component/list.vue')
)

export default {
    install(app: App) {
        app.component("matrix-talk-list", MatrixTalkList)
    }
}