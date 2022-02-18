<!--<template>-->
<!--  <el-space style="width: 300px" fill>-->
<!--    <el-row>😄</el-row>-->
<!--    <span style="word-break: break-all" v-html="rawHtml"></span>-->
<!--  </el-space>-->
<!--</template>-->
<!--<script setup>-->
<!--import { ref } from 'vue'-->
<!--const tabPosition = ref('left')-->
<!--let rawHtml = ref('<span style="color:red">利用vue</span>112313213213211111111111111111111')-->
<!--</script>-->
<!--<style>-->
<!--.demo-tabs > .el-tabs__content {-->
<!--  padding: 32px;-->
<!--  background-color: #f4f5f7;-->
<!--  color: #6b778c;-->
<!--  font-size: 32px;-->
<!--  font-weight: 600;-->
<!--}-->

<!--.el-tabs&#45;&#45;right .el-tabs__content,-->
<!--.el-tabs&#45;&#45;left .el-tabs__content {-->
<!--  height: 100%;-->
<!--}-->
<!--</style>-->
<template>
  <el-button type="text" @click="dialogVisible = true"
  >click to open the Dialog</el-button
  >

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
        >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>