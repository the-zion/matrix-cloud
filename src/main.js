import App from './App.vue'
import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import Components from './components/index.ts'
import PageMainComponents from './pages/main/index.ts'
import PageUserComponents from './pages/user/index.ts'
import router from './router/index'
import store from "./store/index"
import * as ElIconModules from '@element-plus/icons-vue'
import './assets/icon/iconfont.css'
import 'element-plus/dist/index.css'


const app = createApp(App).use(store)
    .use(Components)
    .use(PageMainComponents)
    .use(PageUserComponents)
    .use(ElementPlus)
    .use(router)


Object.keys(ElIconModules).forEach(function (key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})

app.mount('#app')