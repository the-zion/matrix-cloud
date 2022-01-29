import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import App from './App.vue'
import store from "./store/index"
import * as ElIconModules from '@element-plus/icons-vue'

const app = createApp(App).use(store)
    .use(ElementPlus)
    .use(router)


Object.keys(ElIconModules).forEach(function(key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})

app.mount('#app')