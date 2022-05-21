<template>
  <el-container class="column-container">
    <matrix-column-create v-model:visible="visible"></matrix-column-create>
    <el-row class="bar" justify="space-between">
      <el-space size="large">
        <el-space v-for="item in bar" :key="item.key" class="each" :class="{'select':current === item.key}" @click="filterSelect(item)">
          <el-icon class="iconfont" :class="item.icon"></el-icon>
          <span class="label">{{ item.label }}</span>
        </el-space>
      </el-space>
      <el-button round type="primary" icon="Plus" @click="visible = true">专栏创建</el-button>
    </el-row>
    <el-row class="body">
      <matrix-list component="MatrixColumnCard" :operation="['delete']"></matrix-list>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref} from "vue";

let visible = ref(false)
let current = ref("new")
let bar = ref([{
  key: "new",
  label: "最新发表",
  icon: "icon-time-circle",
}, {
  key: "hot",
  label: "最多点赞",
  icon: "icon-like",
}, {
  key: "collect",
  label: "最多收藏",
  icon: "icon-star",
}, {
  key: "view",
  label: "最多观看",
  icon: "icon-eye",
}])

function filterSelect(each) {
  current.value = each.key
}

</script>

<style scoped lang="scss">
.column-container {
  width: 100%;
  min-width: 848px;
  flex-direction: column;

  .bar {
    width: 100%;
    margin-bottom: 20px;
    padding: 0 10px;

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