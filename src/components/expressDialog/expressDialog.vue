<template>
  <el-dialog v-model="props.visible" title="我要发表" @closed="dialogClosed" width="652px" destroy-on-close>
    <cube-express v-model:mode="mode" @update-textarea="textareaChange" @update-picture="pictureChange"></cube-express>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false"
        >发表</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>

export default {
  name: "CubeExpressDialog",
}
</script>
<script setup>
import {defineProps} from 'vue'
import {initData} from "./initData.js"
import {controller} from "./controller.js"

let props = defineProps({
  visible: Boolean
})
let emit = defineEmits(["update:visible"])
let {mode, textArea, picturesBox} = initData()

let {textareaChange, pictureChange, dialogClosed} = controller(emit, textArea, picturesBox)
</script>

<style scoped>

</style>