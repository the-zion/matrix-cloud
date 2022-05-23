<template>
  <el-container class="reply-container">
    <el-dialog
        custom-class="reply-dialog"
        v-model="props.visible"
        :title="'回复评论 @' + props.name"
        top="0vh"
        :width="740"
        :show-close="false"
        destroy-on-close
        @closed="closed"
    >
      <reply-form></reply-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="send" icon="Promotion">发送</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "MatrixTalkCreate"
}
</script>

<script setup>
import ReplyForm from "./reply-form.vue"

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
  name: String
})

function closed() {
  emits("update:visible", false)
}

function close() {
  closed()
}

function send() {

}
</script>

<style scoped lang="scss">
.reply-container {
  ::v-deep(.reply-dialog) {
    margin: auto;
    height: 100%;

    .el-dialog__header {
      //display: none;
    }

    .el-dialog__body {
      padding: unset;
      height: calc(100% - 110px);
    }

    .el-dialog__footer {
      padding: 10px;
    }
  }
}
</style>