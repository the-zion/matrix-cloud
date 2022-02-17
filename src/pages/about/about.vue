<template>
  <el-space style="width: 300px" fill>
    <el-row>😄</el-row>
    <span style="word-break: break-all" v-html="rawHtml"></span>
  </el-space>
</template>
<script setup>
import { ref } from 'vue'
const tabPosition = ref('left')
let rawHtml = ref('<span style="color:red">利用vue</span>112313213213211111111111111111111')
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  background-color: #f4f5f7;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>