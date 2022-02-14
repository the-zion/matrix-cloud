import {watch} from "vue"

export function watchData(classIndex, subClassIndex, date, orderValue) {
    watch(classIndex, () => {
        subClassIndex.value = 'all'
        date.value = ""
        orderValue.value = "id"
    })

}