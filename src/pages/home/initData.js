import {h, ref, watch} from 'vue'
import {ElDivider} from 'element-plus'

export function initData() {
    let classIndex = ref(0)
    let subClassIndex = ref(0)
    let date = ref('')
    let orderValue = ref('id')
    let spacer = h(ElDivider, {direction: 'vertical'})
    let testBox = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
    let loading = ref(false)
    let dataLoading = ref(false)
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
            label: '收藏最多',
        },
        {
            value: 'week',
            label: '一周热榜',
        }
    ])
    let classList = ref(
        [{
            "value": "language",
            "label": "编程语言",
            "icon": "reading",
            "child": [{
                "value": "all",
                "label": "不限",
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
            "child": [{
                "value": "all",
                "label": "不限",
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
            "icon": "cloud",
            "child": [{
                "value": "all",
                "label": "不限",
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
            "child": [{
                "value": "all",
                "label": "不限",
            }, {
                "value": "mysql",
                "label": "Mysql",
            }]
        }, {
            "value": "basics",
            "label": "计算机基础",
            "icon": "cpu",
            "child": [{
                "value": "all",
                "label": "不限",
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
            "value": "other",
            "label": "其他",
            "icon": "more",
            "child": [{
                "value": "all",
                "label": "不限",
            }, {
                "value": "live",
                "label": "生活",
            }]
        }]
    )

    return {
        classIndex, subClassIndex, classList, orderValue, orderOptions, date, spacer, testBox, loading, dataLoading
    }

}