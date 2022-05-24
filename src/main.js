import App from './App.vue'
import {createApp} from 'vue'
import ListComponent from './pages/list/index.ts'
import ReplyComponent from './pages/reply/index.ts'
import CommentComponent from './pages/comment/index.ts'
import BlogComponents from './pages/blog/index.ts'
import TalkComponents from './pages/talk/index.ts'
import ColumnComponents from './pages/column/index.ts'
import TagComponents from './pages/tag/index.ts'
import UserComponent from './pages/user/index.ts'
import router from './router/index'
import store from "./store/index"
import * as ElIconModules from '@element-plus/icons-vue'
import './assets/icon/iconfont.css'
import 'element-plus/dist/index.css'
import '@wangeditor/editor/dist/css/style.css'
import "~/styles/index.scss";
import 'uno.css'


const app = createApp(App).use(store)
    .use(ListComponent)
    .use(ReplyComponent)
    .use(CommentComponent)
    .use(BlogComponents)
    .use(TalkComponents)
    .use(ColumnComponents)
    .use(TagComponents)
    .use(UserComponent)
    .use(router)


Object.keys(ElIconModules).forEach(function (key) {
    app.component(ElIconModules[key].name, ElIconModules[key])
})

app.mount('#app')