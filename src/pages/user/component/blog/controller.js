import {variable} from "./variable.js"
import {scrollTo} from "../../../../utils/globalFunc";
let {select, search, options} = variable()


export function initVariable() {
    return {select, search, options}
}

export function init() {

}

export function pageChange() {
    scrollTo(427)
}