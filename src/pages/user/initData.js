import {ref} from 'vue'

export function initData() {
    let menus = ref([{
            name: "blog",
            label: "博客",
            icon: "icon-read",
            select: true,
        }, {
            name: "column",
            label: "专栏",
            icon: "icon-folder",
            select: false
        }, {
            name: "talk",
            label: "讨论发起",
            icon: "icon-message",
            select: false
        }, {
            name: "collect",
            label: "收藏",
            icon: "icon-star",
            select: false
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
            formatter: function (params) {
                return params.value[0] + ' ' + params.value[1] + '篇';
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
            min: 1,
            max: 5,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            contentColor: '#5793f3',
            categories: [1, 2, 3, 4, 5],
            top: 130,
            formatter: function (value) {
                return value + '篇'
            }
        },
        calendar: {
            top: 20,
            left: 0,
            right: 0,
            dayLabel: {
                show: false
            },
            cellSize: ['auto', 15],
            range: 2016,
            splitLine: {
                show: false,
            },
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: {show: false},
            monthLabel: {
                color: 'rgb(175, 180, 189)',
                nameMap: 'ZH'
            }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: [[]]
        }
    }

    return {
        menus, cartoonOptions, calendarOptions
    }

}