import {
    createRouter,
    createWebHistory,
} from 'vue-router'

const Main = () => import('../pages/main/main.vue')
const Article = () => import('../pages/article/article.vue')
const Talk = () => import('../pages/talk/talk.vue')
const Column = () => import('../pages/column/column.vue')
const Message = () => import('../pages/message/message.vue')
const Search = () => import('../pages/search/search.vue')
const About = () => import('../pages/about/about.vue')
const User = () => import('../pages/user/user.vue')
const UserArticle = () => import('../pages/user/component/article.vue')
const UserColumn = () => import('../pages/user/component/column.vue')
const UserTalk = () => import('../pages/user/component/talk.vue')
const UserCollect = () => import('../pages/user/component/collect.vue')
const UserFollow = () => import('../pages/user/component/follow.vue')
const write = () => import('../pages/write/write.vue')
const ArticleWrite = () => import('../pages/article/write.vue')
const ColumnWrite = () => import('../pages/column/write.vue')
const TalkWrite = () => import('../pages/talk/write.vue')
const Home = () => import('../pages/home/home.vue')
const HomeBlog = () => import("../pages/home/blog.vue")
const HomeColumn = () => import("../pages/home/column.vue")
const HomeTalk = () => import("../pages/home/talk.vue")
const Settings = () => import("../pages/settings/settings.vue")
const SettingsProfile = () => import("../pages/settings/profile.vue")
const SettingsAccount = () => import("../pages/settings/account.vue")
const Result = () => import("../pages/result/result.vue")


const routes = [
    {
        path: '/',
        name: 'root',
        redirect: {name: 'home.blog'},
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        redirect: to => {
            return {name: 'home', query: {page: 'article'}}
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                // children: [{
                //     path: 'blog?page=article',
                //     name: "home.blog",
                //     component: HomeBlog
                // }, {
                //     path: 'column',
                //     name: "home.column",
                //     component: HomeColumn
                // }, {
                //     path: 'talk',
                //     name: "home.talk",
                //     component: HomeTalk
                // }]
            },
            {
                path: 'article',
                name: 'article',
                component: Article
            },
            {
                path: 'talk',
                name: 'talk',
                component: Talk
            },
            {
                path: 'column',
                name: "column",
                component: Column,
            },
            {
                path: 'message',
                name: 'message',
                component: Message
            },
            {
                path: 'search',
                name: 'search',
                component: Search
            },
            {
                path: 'about',
                name: 'about',
                component: About
            },
            {
                path: 'user',
                name: 'user',
                component: User,
                redirect: {name: 'user.article'},
                children: [{
                    path: 'article',
                    name: 'user.article',
                    component: UserArticle
                }, {
                    path: 'column',
                    name: 'user.column',
                    component: UserColumn
                }, {
                    path: 'talk',
                    name: 'user.talk',
                    component: UserTalk
                }, {
                    path: 'collect',
                    name: 'user.collect',
                    component: UserCollect
                }, {
                    path: 'follow',
                    name: 'user.follow',
                    component: UserFollow
                }]
            },
            {
                path: 'settings',
                name: 'settings',
                component: Settings,
                redirect: {name: 'settings.profile'},
                children: [{
                    path: 'profile',
                    name: 'settings.profile',
                    component: SettingsProfile
                }, {
                    path: 'account',
                    name: 'settings.account',
                    component: SettingsAccount
                }]
            }]
    },
    {
        path: '/write',
        name: 'write',
        component: write,
        redirect: {name: "article.write"},
        children: [{
            path: 'article',
            name: 'article.write',
            component: ArticleWrite
        }, {
            path: 'column',
            name: "column.write",
            component: ColumnWrite
        }, {
            path: "talk",
            name: "talk.write",
            component: TalkWrite
        }]
    },
    {
        path: '/result',
        name: 'result',
        component: Result,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
