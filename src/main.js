import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import Components from './components/index.ts'
import PageComponents from './pages/index.ts'
import PageMainComponents from './pages/main/index.ts'
import 'element-plus/dist/index.css'
import router from './router/index'
import App from './App.vue'
import store from "./store/index"
import * as ElIconModules from '@element-plus/icons-vue'
import './assets/icon/iconfont.css'
import * as echarts from 'echarts/core';


const app = createApp(App).use(store)
    .use(Components)
    .use(PageComponents)
    .use(PageMainComponents)
    .use(ElementPlus)
    .use(echarts)
    .use(router)


Object.keys(ElIconModules).forEach(function (key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})

app.mount('#app')