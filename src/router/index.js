import {
    createRouter,
    createWebHistory,
} from 'vue-router'

const Main = () => import('../pages/main/main.vue')
const Article = () => import('../pages/article/article.vue')
const Talk = () => import('../pages/talk/talk.vue')
const Column = () => import('../pages/column/column.vue')
const Collect = () => import('../pages/collect/collect.vue')
const Message = () => import('../pages/message/message.vue')
const MessageTimeLine = () => import('../pages/message/component/timeline.vue')
const MessageComment = () => import('../pages/message/component/comment.vue')
const MessageNotification = () => import('../pages/message/component/notification.vue')
const Search = () => import('../pages/search/search.vue')
const About = () => import('../pages/about/about.vue')
const User = () => import('../pages/user/user.vue')
const UserTimeLine = () => import('../pages/user/component/timeline.vue')
const UserArticle = () => import('../pages/user/component/article.vue')
const UserColumn = () => import('../pages/user/component/column.vue')
const UserTalk = () => import('../pages/user/component/talk.vue')
const UserCollect = () => import('../pages/user/component/collect.vue')
const UserFollow = () => import('../pages/user/component/follow.vue')
const write = () => import('../pages/write/write.vue')
const ArticleWrite = () => import('../pages/article/write.vue')
const TalkWrite = () => import('../pages/talk/write.vue')
const Home = () => import('../pages/home/home.vue')
const Settings = () => import("../pages/settings/settings.vue")
const SettingsProfile = () => import("../pages/settings/profile.vue")
const SettingsAccount = () => import("../pages/settings/account.vue")
const Result = () => import("../pages/result/result.vue")
const Creation = () => import("../pages/creation/creation.vue")
const CreationHomePage = () => import("../pages/creation/homepage.vue")
const CreationMedal = () => import("../pages/creation/medal.vue")
const CreationReply = () => import("../pages/creation/reply.vue")
const CreationReplied = () => import("../pages/creation/replied.vue")
const CreationContent = () => import("../pages/creation/content.vue")
const CreationPicture = () => import("../pages/creation/picture.vue")
const CreationReview = () => import("../pages/creation/review.vue")
const CreationComment = () => import("../pages/creation/comment.vue")

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: to => {
            return {name: 'home', query: {page: 'news'}}
        },
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        redirect: to => {
            return {name: 'home', query: {page: 'news'}}
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
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
                path: "collect",
                name: "collect",
                component: Collect,
            },
            {
                path: 'message',
                name: 'message',
                component: Message,
                redirect: {name: 'message.timeline'},
                children: [{
                    path: 'timeline',
                    name: 'message.timeline',
                    component: MessageTimeLine
                },{
                    path: 'comment',
                    name: 'message.comment',
                    component: MessageComment
                }, {
                    path: 'notification',
                    name: 'message.notification',
                    component: MessageNotification
                }]
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
                redirect: {name: 'user.timeline'},
                children: [{
                    path: 'timeline',
                    name: 'user.timeline',
                    component: UserTimeLine
                },{
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
                path: 'creation',
                name: 'creation',
                component: Creation,
                redirect: {name: 'creation.homepage'},
                children: [{
                    path: 'homepage',
                    name: 'creation.homepage',
                    component: CreationHomePage
                }, {
                    path: 'medal',
                    name: 'creation.medal',
                    component: CreationMedal
                }, {
                    path: 'content',
                    name: 'creation.content',
                    component: CreationContent
                }, {
                    path: 'reply',
                    name: 'creation.reply',
                    component: CreationReply
                }, {
                    path: 'replied',
                    name: 'creation.replied',
                    component: CreationReplied
                }, {
                    path: 'picture',
                    name: 'creation.picture',
                    component: CreationPicture
                },{
                    path: 'review',
                    name: 'creation.review',
                    component: CreationReview
                },{
                    path: 'comment',
                    name: 'creation.comment',
                    component: CreationComment
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
