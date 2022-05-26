import {App, defineAsyncComponent} from 'vue'
const MatrixColumnList = defineAsyncComponent(() =>
    import('./component/list.vue')
)

export default {
    install(app: App) {
        app.component("matrix-column-list", MatrixColumnList)
    }
}