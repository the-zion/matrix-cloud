<template>
  <el-dialog
      custom-class="create-dialog"
      v-model="props.visible"
      :top="props.top"
      :width="props.write"
      :show-close="props.showClose"
      destroy-on-close
      @closed="closed"
  >
    <matrix-write-talk v-if="props.mode === 'talk'" @close="close"></matrix-write-talk>
    <matrix-write-column v-if="props.mode === 'column'" @close="close"></matrix-write-column>
  </el-dialog>
</template>

<script>
export default {
  name: "MatrixHomeCreate"
}
</script>

<script setup>


const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
  showClose: Boolean,
  write: Number,
  top: String,
  mode: String
})

function closed() {
  emits("update:visible", false)
}

function close() {
  closed()
}
</script>

<style scoped lang="scss">

</style>