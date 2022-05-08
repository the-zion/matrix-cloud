import {
    createRouter,
    createWebHistory,
} from 'vue-router'
import Main from "../pages/main/main.vue"
import Home from '../pages/home/home.vue'
import Express from '../pages/express/express.vue'
import Blog from '../pages/blog/blog.vue'
import Message from '../pages/message/message.vue'
import About from '../pages/about/about.vue'
import User from "../pages/user/user.vue"
import Set from "../pages/set/set.vue"

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: {name: 'home'},
    },
    {
        path: '/main',
        name: 'main',
        component: Main,
        redirect: {name: 'home'},
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home
            },
            {
                path: 'express',
                name: 'express',
                component: Express
            },
            {
                path: 'blog',
                name: 'blog',
                component: Blog
            },
            {
                path: 'column',
                name: 'column',
                component: Blog
            },
            {
                path: 'message',
                name: 'message',
                component: Message
            },
            {
                path: 'about',
                name: 'about',
                component: About
            },
            {
                path: 'user',
                name: 'user',
                component: User
            },
            {
                path: 'set',
                name: 'set',
                component: Set
            }]

    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router
