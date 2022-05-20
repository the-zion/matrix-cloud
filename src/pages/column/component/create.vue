<template>
  <el-container class="create-container">
    <el-dialog
        custom-class="create-dialog"
        v-model="props.visible"
        top="0vh"
        :width="740"
        :show-close="false"
        destroy-on-close
        @closed="closed"
    >
      <form ref="formRef" :verify="props.verify"/>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button @click="create" type="primary">专栏创建</el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "MatrixColumnCreate"
}
</script>

<script setup>
import {onMounted, ref} from "vue"
import Form from './form.vue'
import {error} from "../../../utils/message";

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
  verify: Boolean,
})

let formRef = ref()

function closed() {
  emits("update:visible", false)
}

function close() {
  closed()
}

function create() {
  if (!check()) {
    return
  }
  return true
}

function check() {
  if (formRef.value.imageUrl.length === 0) {
    error("封面不能为空")
    return null
  }
  if (formRef.value.title.length === 0) {
    error("标题不能为空")
    return null
  }
  if (formRef.value.introduce.length === 0) {
    error("简介不能为空")
    return null
  }
  if (formRef.value.tags.length === 0) {
    error("标签不能为空")
    return null
  }
}

</script>

<style scoped lang="scss">
.create-container {
  ::v-deep(.create-dialog) {
    margin: auto;
    height: 100%;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 30px 30px 0 30px;
      height: calc(100% - 85px);
    }

    .el-dialog__footer {
      padding: 10px;
    }
  }
}
</style>