import {variable} from "./variable.js"

export function controller() {

    let {select, search, options} = variable()

    function initData() {
        return {select, search, options}
    }

    function init(props) {

    }

    function pageChange(scroll) {
        scroll.setScrollTop(427)
    }

    return {initData, init, pageChange}
}