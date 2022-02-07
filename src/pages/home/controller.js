import {ref} from 'vue'

export function controller(treeRef) {

    function treeCheck() {
        console.log(treeRef.value.getCheckedKeys(true))
    }

    return {treeCheck}
}