import {ref} from 'vue'

export function controller(dataLoading, treeRef) {
    let classSelect = function (index) {
        dataLoading.value = true
        console.log(index)
    }
    let subClassSelect = function (index) {
        dataLoading.value = true
        console.log(index)
    }
    let orderSelect = function (value) {
        dataLoading.value = true
        console.log(value)
    }
    let dateSelect = function (value) {
        dataLoading.value = true
        console.log(value)
    }

    function treeCheck() {
        console.log(treeRef.value.getCheckedKeys(true))
    }

    return {classSelect, subClassSelect, orderSelect, dateSelect, treeCheck}
}