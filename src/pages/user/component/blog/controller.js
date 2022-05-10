import {variable} from "./variable.js"
import {scrollTo} from "../../../../utils/globalFunc";

export function controller() {

    let {select, search, options} = variable()

    function initVariable() {
        return {select, search, options}
    }

    function init(props) {

    }

    function pageChange() {
        scrollTo(427)
    }

    return {initVariable, init, pageChange}
}