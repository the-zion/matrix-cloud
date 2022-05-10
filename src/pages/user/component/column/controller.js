import {variable} from "./variable.js"

let {select, search, options} = variable()

export function initVariable() {
    return {select, search, options}
}

export function init(props) {

}

export function pageChange(scroll) {
    scroll.setScrollTop(427)
}