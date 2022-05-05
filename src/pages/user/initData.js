import {ref} from 'vue'

export function initData() {
    let menu = ref([{
            name: "time",
            label: "动态",
            icon: "timer"
        }, {
            name: "blog",
            label: "博客",
            icon: "document"
        }, {
            name: "talk",
            label: "畅所欲言",
            icon: "chat-dot-round"
        }, {
            name: "column",
            label: "专栏",
            icon: "folder"
        }, {
            name: "collect",
            label: "收藏",
            icon: "star"
        }, {
            name: "care",
            label: "我关注的",
            icon: "user"
        }, {
            name: "cared",
            label: "关注我的",
            icon: "user"
        }, {
            name: "message",
            label: "留言",
            icon: "message"
        }]
    )

    let cartoonOptions = {
        graphic: {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: 'HELLO WORLD',
                        fontSize: 60,
                        fontWeight: 'bold',
                        lineDash: [0, 200],
                        lineDashOffset: 0,
                        fill: 'transparent',
                        stroke: '#000',
                        lineWidth: 1
                    },
                    keyframeAnimation: {
                        duration: 3000,
                        loop: true,
                        keyframes: [
                            {
                                percent: 0.7,
                                style: {
                                    fill: 'transparent',
                                    lineDashOffset: 200,
                                    lineDash: [200, 0]
                                }
                            },
                            {
                                // Stop for a while.
                                percent: 0.8,
                                style: {
                                    fill: 'transparent'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }

    let calendarOptions = {
        tooltip: {
            show: true,
            formatter: function (params, ticket, callback) {
                return params.value[0] + ' ' + params.value[1] + '篇'
            }
        },
        gradientColor: [
            'rgba(255, 127, 0, 0.2)',
            'rgba(255, 127, 0, 0.3)',
            'rgba(255, 127, 0, 0.5)',
            'rgba(255, 127, 0, 0.7)',
            'rgba(255, 127, 0, 0.8)'
        ],
        visualMap: {
            show: false,
        },
        calendar: [],
        series: []
    }


    return {
        menu, cartoonOptions, calendarOptions
    }

}