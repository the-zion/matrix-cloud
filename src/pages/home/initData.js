import {h, ref, onMounted} from 'vue'
import {ElDivider} from 'element-plus'

export function initData() {
    let tableList = ref([{
        key: "title",
        label: "标题",
        width: "2"
    }, {
        key: "introduction",
        label: "简介",
        width: "3"
    }, {
        key: "tag",
        label: "标签",
        width: "2"
    }, {
        key: "date",
        label: "发布时间",
        width: "1"
    }, {
        key: "name",
        label: "作者",
        width: "1"
    }, {
        key: "operate",
        label: "操作",
        width: "2"
    }])
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
            "value": "All",
            "label": "全部",
            "children": [{
                "value": "all",
                "label": "不限",
            }],
        }, {
            "value": "language",
            "label": "编程语言",
            "children": [{
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
            "children": [{
                "value": "redis",
                "label": "Redis",
            }, {
                "value": "rabbitmq",
                "label": "Rabbitmq",
            }]
        }, {
            "value": "virtualization",
            "label": "云原生",
            "children": [{
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
            "children": [{
                "value": "mysql",
                "label": "Mysql",
            }]
        }, {
            "value": "basics",
            "label": "计算机基础",
            "children": [{
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
            "children": [{
                "value": "live",
                "label": "生活",
            }]
        }]
    )

    return {
        classList, tableList, orderOptions
    }

}