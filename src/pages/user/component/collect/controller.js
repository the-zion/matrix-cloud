import {variable} from "./variable.js"
import {scrollTo} from "../../../../utils/globalFunc";
let {select, options} = variable()

export function initVariable() {
    return {select, options}
}

export function init() {

}

export function pageChange() {
    scrollTo(427)
}