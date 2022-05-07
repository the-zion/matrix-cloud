import {ref} from 'vue'

export function variable() {

    let date = new Date()
    let year = date.getFullYear()
    let time = ref(year)
    let nums = ref(0)
    const options = [year, year - 1, year - 2]

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
        time, nums, options, calendarOptions
    }

}