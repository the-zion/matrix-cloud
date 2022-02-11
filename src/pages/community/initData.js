import {h, ref, watch} from 'vue'
import {ElDivider} from 'element-plus'

export function initData() {
    let carouselBox = ref(["carousel5.png", "carousel6.png"])
    return {carouselBox}
}