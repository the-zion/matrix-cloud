import {variable} from "./variable.js"

export function controller() {

    let {bar} = variable()

    function initVariable() {
        return {bar}
    }

    function init(props) {
    }

    function filterSelect(each) {
        bar.value.forEach(function (item) {
            item.select = each.key === item.key
        })
    }


    return {initVariable, init, filterSelect}
}