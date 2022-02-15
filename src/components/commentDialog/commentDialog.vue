<template>
  <el-dialog v-model="props.visible" title="评论" @closed="dialogClosed" top="4vh" destroy-on-close>
    <el-container class="dialog-container">
      <el-main class="dialog-main">hello</el-main>
      <el-footer class="footer">
        <el-input v-model="commentInput" placeholder="Please input"
                   maxlength="500" show-word-limit>
          <template #append>.com</template>
        </el-input>
      </el-footer>
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
let {commentInput} = initData()

let {dialogClosed} = controller(emit, commentInput)


</script>

<style lang="scss" scoped>

.dialog-container {
  position: relative;

  .dialog-main {
    height: 650px;
  }

  .footer {
    position: absolute;
    height: fit-content;
    width: 100%;
    bottom: 0;
    border-top: 1px solid var(--el-border-color-base);
  }
}
</style>