<template>
  <el-container class="collect-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>收藏集</span>
    </el-row>
    <el-row class="body">
      <matrix-collect-list ref="listRef"></matrix-collect-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Collect"
}
</script>

<script setup>
</script>

<style scoped lang="scss">
.collect-container {
  width: 100%;
  flex-direction: column;

  ::v-deep(.collections-create) {
    border-radius: 4px;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 20px 24px 0 24px;
    }
  }

  .bar {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    border-bottom: 1px solid var(--el-border-color-light);
  }

  .body {
    width: 100%;
  }
}
</style>