import {variable} from "./variable.js"
let {select, options} = variable()

export function initVariable() {
    return {select, options}
}

export function init(props) {

}

export function pageChange(scroll) {
    scroll.setScrollTop(427)
}