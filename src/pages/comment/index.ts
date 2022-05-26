import {App, defineAsyncComponent} from 'vue'

const MatrixComment = defineAsyncComponent(() =>
    import('./comment.vue')
)

export default {
    install(app: App) {
        app.component("matrix-comment", MatrixComment)
    }
}
