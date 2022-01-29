import {ref} from 'vue'

export function metaData() {
    let activeName = ref('all')
    let menuList = ref(
        [{
            "key": "language",
            "name": "语言",
            "icon": "reading",
            "child": [{
                "key": "all",
                "name": "All",
            }, {
                "key": "python",
                "name": "Python",
            }, {
                "key": "go",
                "name": "Go",
            }, {
                "key": "java",
                "name": "Java",
            }, {
                "key": "javaScript",
                "name": "JavaScript",
            }, {
                "key": "c++",
                "name": "C++",
            }, {
                "key": "c",
                "name": "C",
            }],
        }, {
            "key": "middleware",
            "name": "中间件",
            "icon": "connection",
            "child": [{
                "key": "all",
                "name": "All",
            }, {
                "key": "redis",
                "name": "Redis",
            }, {
                "key": "rabbitmq",
                "name": "Rabbitmq",
            }]
        }, {
            "key": "virtualization",
            "name": "云原生",
            "icon": "cloud",
            "child": [{
                "key": "all",
                "name": "All",
            }, {
                "key": "docker",
                "name": "Docker",
            }, {
                "key": "kubernetes",
                "name": "kubernetes",
            }, {
                "key": "microServices",
                "name": "微服务",
            }]
        }, {
            "key": "database",
            "name": "数据库",
            "icon": "coin",
            "child": [{
                "key": "all",
                "name": "All",
            }, {
                "key": "mysql",
                "name": "Mysql",
            }]
        }, {
            "key": "basics",
            "name": "计算机基础",
            "icon": "cpu",
            "child": [{
                "key": "all",
                "name": "All",
            }, {
                "key": "network",
                "name": "网络",
            }, {
                "key": "dataStructure",
                "name": "数据结构和算法",
            }, {
                "key": "operatingSystem",
                "name": "操作系统",
            }, {
                "key": "computerComposition",
                "name": "计算机组成原理",
            }]
        }, {
            "key": "other",
            "name": "其他",
            "icon": "more",
            "child": [{
                "key": "all",
                "name": "All",
            }, {
                "key": "live",
                "name": "生活",
            }]
        }]
    )
    return {menuList, activeName}
}