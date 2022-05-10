import {variable} from "./variable.js"
let {menu} = variable()

export function initVariable() {
    return {menu}
}

export function menuChange(value) {
    menu.value = value
}