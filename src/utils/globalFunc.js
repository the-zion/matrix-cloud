import {ElLoading, ElMessage, ElMessageBox} from 'element-plus'
import * as echarts from 'echarts/core';
import {HeatmapChart} from 'echarts/charts';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    GraphicComponent,
    VisualMapComponent,
    CalendarComponent,
} from 'echarts/components';
import {LabelLayout, UniversalTransition} from 'echarts/features';
import {CanvasRenderer} from 'echarts/renderers';

export function globalFunc() {

    function loadFullScreen() {
        return ElLoading.service({
            text: "Loading...",
            lock: true,
        })
    }

    function getClassList() {
        return [{
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
    }

    return {loadFullScreen, getClassList}
}

export function echartsInit() {
    echarts.use([
        TitleComponent,
        TooltipComponent,
        GridComponent,
        DatasetComponent,
        TransformComponent,
        LabelLayout,
        UniversalTransition,
        GraphicComponent,
        HeatmapChart,
        CalendarComponent,
        VisualMapComponent,
        CanvasRenderer,
    ])
    return echarts
}

export function scrollTo(location) {
    window.scrollTo({
        top: location || 0,
        behavior: "smooth"
    })
}

export function scrollToTop() {
    window.scrollTo({
        top: 0
    })
}

export function confirm(title, message, type) {
    return ElMessageBox.confirm(
        message,
        title,
        {
            customClass: 'matrix-message-box',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type || "warning",
        }
    )
}