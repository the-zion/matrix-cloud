import {variable} from "./variable.js"
import {scrollTo} from "../../../../utils/globalFunc";

let {bar} = variable()

export function initVariable() {
    return {bar}
}

export function filterSelect(each) {
    bar.value.forEach(function (item) {
        item.select = each.key === item.key
    })
}

export function pageChange() {
    scrollTo()
}