import {variable} from "./variable.js"
let {bar} = variable()

export function initVariable() {
    return {bar}
}

export function init(props) {
}

export function filterSelect(each) {
    bar.value.forEach(function (item) {
        item.select = each.key === item.key
    })
}