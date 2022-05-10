import {variable} from "./variable.js"
import {echartsInit} from "../../../../utils/globalFunc";

export function controller() {

    let {username, introduce, tags, cartoonOptions} = variable()

    let echarts = echartsInit()
    let chart = null

    function initVariable() {
        return {username, introduce, tags}
    }

    function init() {
        chart = echarts.init(document.getElementById('cartoon'));
        chart.setOption(cartoonOptions)
    }

    return {initVariable, init}
}