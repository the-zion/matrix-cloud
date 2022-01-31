import {h, ref, watch} from 'vue'
import {ElDivider} from 'element-plus'

export function initData() {
    let classIndex = ref(0)
    let subClassIndex = ref(0)
    let date = ref('')
    watch(classIndex, (i) => {
        subClassIndex.value = 0
    })
    let orderValue = ref('id')
    let spacer = h(ElDivider, {direction: 'vertical'})
    let orderOptions = ref([
        {
            value: 'id',
            label: '默认排序',
        },
        {
            value: 'love',
            label: '点赞最多',
        },
        {
            value: 'collect',
            label: '收藏越多',
        },
        {
            value: 'week',
            label: '一周热榜',
        }
    ])
    let classList = ref(
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

    return {
        classIndex, subClassIndex, classList, orderValue, orderOptions, date, spacer
    }

}