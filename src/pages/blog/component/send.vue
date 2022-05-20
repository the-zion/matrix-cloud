<template>
  <el-dialog
      :title="props.title"
      v-model="props.visible"
      destroy-on-close
      @closed="closed"
      :width="670"
      top="2vh"
      custom-class="send-class"
  >
    <matrix-send-blog v-if="props.mode === 'blog'" @open="sendBlogOpen"></matrix-send-blog>
    <template #footer>
          <span>
            <el-button @click="close" round>取消</el-button>
            <el-button @click="send" round type="primary"
            >{{ props.title }}</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "Send"
}
</script>

<script setup>

import {error} from "../../../utils/message";

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
  title: String,
  mode: String
})

let form = null;

function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}

function send() {
  if (form.tags.length === 0) {
    error("标签不能为空")
    return
  }
}

function sendBlogOpen(f, ref) {
  form = f.value
}
</script>

<style scoped lang="scss">
</style>