import {variable} from "./variable.js"

export function controller() {

    let {select, options} = variable()

    function initVariable() {
        return {select, options}
    }

    function init(props) {

    }

    function pageChange(scroll) {
        scroll.setScrollTop(427)
    }

    return {initVariable, init, pageChange}
}