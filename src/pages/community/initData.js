import {ref} from 'vue'

export function initData() {
    let backTopRight = ref(0)
    let backTop = ref()
    let classSelect = ref(0)
    let subClassSelect = ref("")
    let orderSelect = ref("id")
    let carouselBox = ref(["carousel1.png", "carousel2.png", "carousel3.png", "carousel4.png"])
    let expressDialogVisible = ref(false)
    let commentDialogVisible = ref(false)
    let classList = ref(
        [{
            "value": "All",
            "label": "全部",
            "icon": "monitor",
        }, {
            "value": "language",
            "label": "编程语言",
            "icon": "chat-dot-round",
            "children": [{
                "value": "all",
                "label": "全部",
            }, {
                "value": "python",
                "label": "Python",
            }, {
                "value": "go",
                "label": "Go",
            }, {
                "value": "java",
                "label": "Java",
            }, {
                "value": "javaScript",
                "label": "JavaScript",
            }, {
                "value": "c++",
                "label": "C++",
            }, {
                "value": "c",
                "label": "C",
            }],
        }, {
            "value": "middleware",
            "label": "中间件",
            "icon": "connection",
            "children": [{
                "value": "all",
                "label": "全部",
            }, {
                "value": "redis",
                "label": "Redis",
            }, {
                "value": "rabbitmq",
                "label": "Rabbitmq",
            }]
        }, {
            "value": "virtualization",
            "label": "云原生",
            "icon": "mostly-cloudy",
            "children": [{
                "value": "all",
                "label": "全部",
            }, {
                "value": "docker",
                "label": "Docker",
            }, {
                "value": "kubernetes",
                "label": "kubernetes",
            }, {
                "value": "microServices",
                "label": "微服务",
            }]
        }, {
            "value": "database",
            "label": "数据库",
            "icon": "coin",
            "children": [{
                "value": "all",
                "label": "全部",
            }, {
                "value": "mysql",
                "label": "Mysql",
            }]
        }, {
            "value": "basics",
            "label": "计算机基础",
            "icon": "cpu",
            "children": [{
                "value": "all",
                "label": "全部",
            }, {
                "value": "network",
                "label": "网络",
            }, {
                "value": "dataStructure",
                "label": "数据结构和算法",
            }, {
                "value": "operatingSystem",
                "label": "操作系统",
            }, {
                "value": "computerComposition",
                "label": "计算机组成原理",
            }]
        }, {
            "value": "live",
            "label": "生活",
            "icon": "shopping-bag",
            "children": [{
                "value": "all",
                "label": "全部",
            }, {
                "value": "live",
                "label": "摄影",
            }]
        }]
    )

    return {
        backTopRight,
        backTop,
        carouselBox,
        classList,
        classSelect,
        subClassSelect,
        orderSelect,
        expressDialogVisible,
        commentDialogVisible
    }

}