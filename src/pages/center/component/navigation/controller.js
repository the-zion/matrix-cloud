import {variable} from "./variable.js"

let {nickname, name, menu} = variable()
let emits = null

export function initVariable() {
    return {nickname, name, menu}
}

export function init(emitsObject) {
    emits = emitsObject
}

export function menuSelect(each) {
    menu.value.forEach(function (item) {
        item.select = each.key === item.key
    })
    emits("change", each.key)
}