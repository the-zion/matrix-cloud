import {
    createRouter,
    createWebHistory,
} from 'vue-router'

const Main = () => import('../pages/main/main.vue')
const Blog = () => import('../pages/blog/blog.vue')
const Talk = () => import('../pages/talk/talk.vue')
const Column = () => import('../pages/column/column.vue')
const Message = () => import('../pages/message/message.vue')
const Search = () => import('../pages/search/search.vue')
const About = () => import('../pages/about/about.vue')
const User = () => import('../pages/user/user.vue')
const write = () => import('../pages/write/write.vue')
const BlogWrite = () => import('../pages/blog/write.vue')
const ColumnWrite = () => import('../pages/column/write.vue')
const TalkWrite = () => import('../pages/talk/write.vue')
const Home = () => import('../pages/home/home.vue')
const HomeBlog = () => import("../pages/home/blog.vue")
const HomeColumn = () => import("../pages/home/column.vue")
const HomeTalk = () => import("../pages/home/talk.vue")
const Center = () => import("../pages/center/center.vue")
const CenterBlog = () => import("../pages/center/blog.vue")
const CenterColumn = () => import("../pages/center/column.vue")
const CenterTalk = () => import("../pages/center/talk.vue")
const CenterCollect = () => import("../pages/center/collect.vue")
const CenterProfile = () => import("../pages/center/profile.vue")
const CenterSecurity = () => import("../pages/center/security.vue")


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
                path: 'blog',
                name: 'blog',
                component: Blog
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
        component: write,
        redirect: {name: "blog.write"},
        children: [{
            path: 'blog',
            name: 'blog.write',
            component: BlogWrite
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
