import {watch} from "vue";

export function watchData(classIndex, subClassIndex, date, orderValue) {
    watch(classIndex, (i) => {
        subClassIndex.value = 'all'
        date.value = ""
        orderValue.value = "id"
    })

}