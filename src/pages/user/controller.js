import {variable} from "./variable.js"
let {current, menus} = variable()

export function initVariable() {
    return {current, menus}
}

export function menuSelect(menu) {
    menus.value.forEach(function (item) {
        item.select = menu.name === item.name
    })
    current.value = menu.name
}