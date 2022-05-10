import {variable} from "./variable.js"
import {echartsInit} from "../../../../utils/globalFunc";

export function controller() {

    let {time, nums, options, calendarOptions} = variable()


    let echarts = echartsInit()
    let chart = null

    function initVariable() {
        return {time, nums, options}
    }

    function init() {
        chart = echarts.init(document.getElementById('calendar'));
        setCalenderOptions("2022")
    }

    function getVirtulData(year) {
        year = year || '2017';
        let date = +echarts.number.parseDate(year + '-01-01');
        let end = +echarts.number.parseDate(+year + 1 + '-01-01');
        let dayTime = 3600 * 24 * 1000;
        let data = [];
        for (let time = date; time < end; time += dayTime) {
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 5)
            ]);
        }
        return data;
    }

    function setCalenderOptions(year) {
        calendarOptions.calendar.range = year
        calendarOptions.series.data = getVirtulData(year)
        chart.setOption(calendarOptions)
    }

    return {initVariable, init}
}