import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'
import Home from '../pages/home/home.vue'
import Community from '../pages/community/community.vue'
import Blog from '../pages/blog/blog.vue'
import Message from '../pages/message/message.vue'
import Search from '../pages/search/search.vue'
import About from '../pages/about/about.vue'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/community',
        name: 'community',
        component: Community
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog
    },
    {
        path: '/message',
        name: 'message',
        component: Message
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
