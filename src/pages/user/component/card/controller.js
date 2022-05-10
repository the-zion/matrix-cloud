import {variable} from "./variable.js"
import {echartsInit} from "../../../../utils/globalFunc";
let {username, introduce, tags, cartoonOptions} = variable()
let echarts = echartsInit()
let chart = null

export function initVariable() {
    return {username, introduce, tags}
}

export function init() {
    chart = echarts.init(document.getElementById('cartoon'));
    chart.setOption(cartoonOptions)
}
