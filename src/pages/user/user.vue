<template>
  <el-container class="user-container">
    <el-aside class="user-aside">
      <cube-user-info></cube-user-info>
    </el-aside>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
const test = ref(true)
</script>

<style scoped lang="scss">
.user-container {
  height: 100%;

  .user-aside {
    padding: 24px;
    border-right: 1px solid var(--el-border-color-base);
  }
}
</style>