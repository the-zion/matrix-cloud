import {variable} from "./variable.js"

export function controller() {

    let {nickname, name, menu} = variable()
    let emits = null


    function initVariable() {
        return {nickname, name, menu}
    }

    function init(emitsObject) {
        emits = emitsObject
    }

    function menuSelect(each) {
        menu.value.forEach(function (item) {
            item.select = each.key === item.key
        })
        emits("change", each.key)
    }

    return {initVariable, init, menuSelect}
}