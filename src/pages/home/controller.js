import {ref} from 'vue'

export function controller() {
    let classSelect = function (index) {
        console.log(index)
    }
    let subClassSelect = function (index) {
        console.log(index)
    }
    let orderSelect = function (value) {
        console.log(value)
    }
    let dateSelect = function (value) {
        console.log(value)
    }
    return {classSelect, subClassSelect, orderSelect, dateSelect}
}