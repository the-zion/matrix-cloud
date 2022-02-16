<template>
  <el-dialog v-model="props.visible" title="我要发表" @closed="dialogClosed" width="652px" destroy-on-close>
    <cube-express v-model:mode="mode" v-model:textArea="textArea" v-model:picturesBox="picturesBox"></cube-express>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="expressSubmit"
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
import {defineProps, ref} from 'vue'

const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(["update:visible"])
const mode = ref('picture')
const textArea = ref("")
const picturesBox = ref()


function expressSubmit() {
  console.log(textArea.value)
  console.log(picturesBox.value)
}

function dialogClosed() {
  emit("update:visible", false)
}
</script>

<style scoped>

</style>