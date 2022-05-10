import {variable} from "./variable.js"

export function controller() {

    let {menu} = variable()

    function initVariable() {
        return {menu}
    }

    function menuChange(value) {
        menu.value = value
    }

    return {initVariable, menuChange}
}