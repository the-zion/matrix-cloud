import {
    createRouter,
    createWebHistory,
} from 'vue-router'
import Main from "../pages/main/main.vue"
import Home from '../pages/home/home.vue'
import Community from '../pages/community/community.vue'
import Blog from '../pages/blog/blog.vue'
import Message from '../pages/message/message.vue'
import Search from '../pages/search/search.vue'
// import About from '../pages/about/about.vue'
import Login from "../pages/login/login.vue"
import LoginMain from "../pages/login/main/main.vue"
import Code from "../pages/login/code/code.vue"
import Password from "../pages/login/password/password.vue"
import PasswordReset from "../pages/login/passwordReset/passwordReset.vue"


const routes = [
    {
        path: '/',
        name: 'root',
        redirect: { name: 'home' },
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        redirect: { name: 'home' },
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home
            },
            {
                path: 'community',
                name: 'community',
                component: Community
            },
            {
                path: 'blog',
                name: 'blog',
                component: Blog
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
            // {
            //     path: 'about',
            //     name: 'about',
            //     component: About
            // }]
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        redirect: { name: 'loginMain' },
        children: [
            {
                path: 'loginMain',
                name: 'loginMain',
                component: LoginMain
            },
            {
                path: 'code',
                name: 'code',
                component: Code
            },
            {
                path: 'password',
                name: 'password',
                component: Password
            },
            {
                path: 'passwordReset',
                name: 'passwordReset',
                component: PasswordReset
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
