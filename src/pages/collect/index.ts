import {App, defineAsyncComponent} from 'vue'

const MatrixCollectList = defineAsyncComponent(() =>
    import('./component/list.vue')
)
export default {
    install(app: App) {
        app.component("matrix-collect-list", MatrixCollectList)
    }
}
