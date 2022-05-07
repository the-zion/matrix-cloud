import {variable} from "./variable.js"

export function controller() {
    let {current, menus} = variable()

    function initData() {
        return {current, menus}
    }

    function menuSelect(menu) {
        menus.value.forEach(function (item) {
            item.select = menu.name === item.name
        })
        current.value = menu.name
    }

    return {initData, menuSelect}
}