<template>
  <el-dialog
      :title="props.title"
      v-model="props.visible"
      destroy-on-close
      @closed="closed"
  >
    <matrix-send-blog></matrix-send-blog>
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="close" round>取消</el-button>
            <el-button @click="send" round type="primary"
            >{{ props.title }}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "MatrixWriteSend"
}
</script>

<script setup>

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
  title: String,
  mode: String
})

function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}

function send() {

}
</script>

<style scoped lang="scss">

</style>