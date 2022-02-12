import {ref} from 'vue'

export function controller(classSelect, subClassSelect, orderSelect) {
    function classClick(item) {
        let index = item.index
        classSelect.value = index
        subClassSelect.value = index === 0 ? "" : "all"
        orderSelect.value = "id"
    }

    return {classClick}
}