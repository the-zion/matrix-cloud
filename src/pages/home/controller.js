import {ref} from 'vue'

export function controller() {
    let classSelect = function (index) {
        console.log(index)
    }
    let subClassSelect = function (index) {
        console.log(index)
    }
    return {classSelect, subClassSelect}
}