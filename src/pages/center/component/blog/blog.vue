<template>
  <el-container class="blog">
    <el-space class="bar" size="large">
      <el-space v-for="item in bar" class="each" :class="{'select':item.select}" @click="filterSelect(item)">
        <el-icon class="iconfont" :class="item.icon"></el-icon>
        <span class="label">{{ item.label }}</span>
      </el-space>
    </el-space>
    <el-row class="body">
      <matrix-list :mode="1" @current-page="pageChange"></matrix-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "MatrixCenterBlog"
}
</script>

<script setup>
import {initVariable, filterSelect, pageChange} from "./controller";

let {bar} = initVariable()

</script>

<style scoped lang="scss">
.blog {
  width: 100%;
  flex-direction: column;

  .bar {
    width: 100%;
    margin-bottom: 20px;

    .each {
      padding: 6px 12px;
      border-radius: 100px;
      background-color: var(--el-fill-color);
      color: var(--el-text-color-regular);
      cursor: pointer;

      .label {
        font-size: 14px;
      }
    }

    .select {
      background-color: var(--el-text-color-primary);
      color: var(--el-color-white);
    }
  }

  .body {
    width: 100%;
    padding: 20px;
    min-height: 100px;
    background-color: var(--el-color-white);
    border-radius: 8px;
    box-shadow: var(--el-box-shadow-lighter);
  }
}

</style>