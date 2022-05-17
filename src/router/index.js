import {
    createRouter,
    createWebHistory,
} from 'vue-router'

const Main = () => import('../pages/main/main.vue')
const Blog1 = () => import('../pages/blog1/blog.vue')
const Message = () => import('../pages/message/message.vue')
const About = () => import('../pages/about/about.vue')
const User = () => import('../pages/user/user.vue')
const write = () => import('../pages/write/write.vue')
const WriteBlog = () => import('../pages/write/blog.vue')
const Home = () => import('../pages/home/home.vue')
const HomeBlog = () => import("../pages/home/blog/blog.vue")
const HomeColumn = () => import("../pages/home/column/column.vue")
const HomeTalk = () => import("../pages/home/talk/talk.vue")
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
                }, {
                    path: 'column',
                    name: "home.column",
                    component: HomeColumn
                }, {
                    path: 'talk',
                    name: "home.talk",
                    component: HomeTalk
                }]
            },
            {
                path: 'blog1',
                name: 'blog1',
                component: Blog1
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
    {
        path: '/write',
        name: 'write',
        redirect: {name: 'write.blog'},
        component: write,
        children: [{
            path: 'blog',
            name: "write.blog",
            component: WriteBlog
        }]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
