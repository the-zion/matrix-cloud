import {ref, watch} from "vue";

export function watchData(classIndex, subClassIndex, date, orderValue) {
    watch(classIndex, (i) => {
        subClassIndex.value = 0
        date.value = ""
        orderValue.value = "id"
    })

}