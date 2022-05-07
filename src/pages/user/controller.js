import {variable} from "./variable.js"

export function controller() {
    let {current, menus} = variable()

    function initVariable() {
        return {current, menus}
    }

    function menuSelect(menu) {
        menus.value.forEach(function (item) {
            item.select = menu.name === item.name
        })
        current.value = menu.name
    }

    return {initVariable, menuSelect}
}