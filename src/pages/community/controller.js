import {ref, defineEmits} from 'vue'
import {globalFunc} from '../../utils/globalFunc.js'

export function controller(classSelect, subClassSelect, orderSelect, backTop) {
    let {loadFullScreen} = globalFunc()

    function classClick(item) {
        let index = item.index
        classSelect.value = index
        subClassSelect.value = index === 0 ? "" : "all"
        orderSelect.value = "id"
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
        backTop.value.handleClick()
    }

    function classSelectChange(item) {
        console.log(item)
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
    }

    function orderSelectChange(item) {
        console.log(item)
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
    }

    function pageCurrentChange(item) {
        console.log(item)
        let loading = loadFullScreen()
        setTimeout(() => {
            loading.close()
        }, 1000)
        backTop.value.handleClick()
    }


    return {classClick, classSelectChange, orderSelectChange, pageCurrentChange}
}