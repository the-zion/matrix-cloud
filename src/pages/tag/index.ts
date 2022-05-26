import {App, defineAsyncComponent} from 'vue'

const MatrixTag = defineAsyncComponent(() =>
    import('./tag.vue')
)

export default {
    install(app: App) {
        app.component("matrix-tag", MatrixTag)
    }
}
