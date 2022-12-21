import {
    createRouter,
    createWebHistory,
} from 'vue-router'

import Main from "../pages/main/main.vue"
import Platform from "../pages/main/platform.vue"
import Wechat from "../pages/main/component/wechat.vue"
import QQ from "../pages/main/component/qq.vue"
import Gitee from "../pages/main/component/gitee.vue"
import Github from "../pages/main/component/github.vue"
import Article from "../pages/article/article.vue"
import Talk from "../pages/talk/talk.vue"
import Column from "../pages/column/column.vue"
import Collect from "../pages/collect/collect.vue"
import Message from "../pages/message/message.vue"
import MessageTimeLine from "../pages/message/component/timeline.vue"
import MessageComment from "../pages/message/component/comment.vue"
import MessageNotification from "../pages/message/component/notification.vue"
import Search from "../pages/search/search.vue"
import About from "../pages/about/about.vue"
import User from "../pages/user/user.vue"
import UserTimeLine from "../pages/user/component/timeline.vue"
import UserArticle from "../pages/user/component/article.vue"
import UserColumn from "../pages/user/component/column.vue"
import UserTalk from "../pages/user/component/talk.vue"
import UserCollect from "../pages/user/component/collect.vue"
import UserFollow from "../pages/user/component/follow.vue"
import Write from "../pages/write/write.vue"
import ArticleWrite from "../pages/article/write.vue"
import TalkWrite from "../pages/talk/write.vue"
import Home from "../pages/home/home.vue"
import Settings from "../pages/settings/settings.vue"
import SettingsProfile from "../pages/settings/profile.vue"
import SettingsAccount from "../pages/settings/account.vue"
import Result from "../pages/result/result.vue"
import Creation from "../pages/creation/creation.vue"
import CreationHomePage from "../pages/creation/homepage.vue"
import CreationMedal from "../pages/creation/medal.vue"
import CreationReply from "../pages/creation/reply.vue"
import CreationReplied from "../pages/creation/replied.vue"
import CreationContent from "../pages/creation/content.vue"
import CreationPicture from "../pages/creation/picture.vue"
import CreationReview from "../pages/creation/review.vue"
import CreationComment from "../pages/creation/comment.vue"

function loginCheck() {
    if (!localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)) {
        return {name: 'home', query: {page: 'news'}}
    }
}

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: {name: 'home', query: {page: 'news'}}
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        redirect: {name: 'home', query: {page: 'news'}},
        children: [
            {
                path: 'login',
                name: 'login',
                component: Platform,
                children: [{
                    path: 'wechat',
                    name: 'login.wechat',
                    component: Wechat
                }, {
                    path: 'qq',
                    name: 'login.qq',
                    component: QQ
                }, {
                    path: 'gitee',
                    name: 'login.gitee',
                    component: Gitee
                }, {
                    path: 'github',
                    name: 'login.github',
                    component: Github
                }]
            },
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
                beforeEnter: [loginCheck],
                children: [{
                    path: 'timeline',
                    name: 'message.timeline',
                    component: MessageTimeLine
                }, {
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
                }, {
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
                beforeEnter: [loginCheck],
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
                }, {
                    path: 'review',
                    name: 'creation.review',
                    component: CreationReview
                }, {
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
                beforeEnter: [loginCheck],
                children: [{
                    path: 'profile',
                    name: 'settings.profile',
                    component: SettingsProfile
                }, {
                    path: 'account',
                    name: 'settings.account',
                    component: SettingsAccount,
                }]
            }]
    },
    {
        path: '/write',
        name: 'write',
        component: Write,
        redirect: {name: "article.write"},
        beforeEnter: [loginCheck],
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
