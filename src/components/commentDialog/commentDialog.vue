<template>
  <el-dialog v-model="props.visible" title="评论" @close="dialogClose">
    <el-container>
      <el-main>hello word</el-main>
    </el-container>
  </el-dialog>
</template>

<script>
export default {
  name: "CubeCommentDialog"
}
</script>
<script setup>
import {defineProps, computed, ref} from 'vue';
import {initData} from "./initData.js"
import {controller} from "./controller.js"


let props = defineProps({
  visible: Boolean
})
let emit = defineEmits(["update:visible"])
let {} = initData()

let {dialogClose} = controller(emit)

</script>

<style scoped>

</style>