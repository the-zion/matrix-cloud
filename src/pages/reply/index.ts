import {App, defineAsyncComponent} from 'vue'

const MatrixReply = defineAsyncComponent(() =>
    import('./reply.vue')
)

export default {
    install(app: App) {
        app.component("matrix-reply", MatrixReply)
    }
}
