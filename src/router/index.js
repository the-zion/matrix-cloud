import {
    createRouter,
    createWebHistory,
} from 'vue-router'
const Main = () => import('../pages/main/main.vue')
const Home = () => import('../pages/home/home.vue')
const Express = () => import('../pages/express/express.vue')
const Blog = () => import('../pages/blog/blog.vue')
const Message = () => import('../pages/message/message.vue')
const About = () => import('../pages/about/about.vue')
const User = () => import('../pages/user/user.vue')
const HomeBlog = () => import("../pages/home/blog/blog.vue")
const Center = () => import("../pages/center/center.vue")
const CenterBlog = () => import("../pages/center/blog/blog.vue")
const CenterColumn = () => import("../pages/center/column/column.vue")
const CenterTalk = () => import("../pages/center/talk/talk.vue")
const CenterCollect = () => import("../pages/center/collect/collect.vue")
const CenterProfile = () => import("../pages/center/profile/profile.vue")
const CenterSecurity = () => import("../pages/center/security/security.vue")


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
        redirect: {name: 'home.blog'},
        children: [
            {
                path: 'home',
                name: 'home',
                component: Home,
                redirect: {name: 'home.blog'},
                children: [{
                    path: 'blog',
                    name: "home.blog",
                    component: HomeBlog
                }]
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
                path: 'center',
                name: 'center',
                component: Center,
                children: [{
                    path: 'blog',
                    name: 'center.user',
                    component: CenterBlog
                }, {
                    path: 'column',
                    name: 'center.column',
                    component: CenterColumn
                }, {
                    path: 'talk',
                    name: 'center.talk',
                    component: CenterTalk
                }, {
                    path: 'collect',
                    name: 'center.collect',
                    component: CenterCollect
                }, {
                    path: 'profile',
                    name: 'center.profile',
                    component: CenterProfile
                }, {
                    path: 'security',
                    name: 'center.security',
                    component: CenterSecurity
                }]
            }]

    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
