import {createPinia} from 'pinia'
import {createApp} from 'vue'
import App from './App.vue'
import ReplyComponent from './pages/reply/index.ts'
import CommentComponent from './pages/comment/index.ts'
import ArticleComponents from './pages/article/index.ts'
import CollectComponents from './pages/collect/index.ts'
import TalkComponents from './pages/talk/index.ts'
import ColumnComponents from './pages/column/index.ts'
import NewsComponent from './pages/news/index.ts'
import TagComponents from './pages/tag/index.ts'
import UserComponent from './pages/user/index.ts'
import router from './router/index'
// import * as ElIconModules from '@element-plus/icons-vue'
import './assets/icon/iconfont.js'
import './assets/icon/iconfont.css'
// import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
import 'uno.css'
import './styles/index.scss'

const pinia = createPinia()
const app = createApp(App).use(pinia)
    .use(ReplyComponent)
    .use(CommentComponent)
    .use(ArticleComponents)
    .use(CollectComponents)
    .use(TalkComponents)
    .use(ColumnComponents)
    .use(NewsComponent)
    .use(TagComponents)
    .use(UserComponent)
    .use(router)


// Object.keys(ElIconModules).forEach(function (key) {
//     app.component(ElIconModules[key].name, ElIconModules[key])
// })

app.mount('#app')