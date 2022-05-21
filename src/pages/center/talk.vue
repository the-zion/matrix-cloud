<template>
  <el-container class="talk-container">
    <matrix-talk-create v-model:visible="visible"></matrix-talk-create>
    <el-row class="bar" justify="space-between">
      <el-space size="large">
        <el-space v-for="item in bar" :key="item.key" class="each" :class="{'select':item.select}" @click="filterSelect(item)">
          <el-icon class="iconfont" :class="item.icon"></el-icon>
          <span class="label">{{ item.label }}</span>
        </el-space>
      </el-space>
      <el-button round type="primary" icon="EditPen" @click="visible = true">讨论发起</el-button>
    </el-row>
    <el-row class="body">
      <matrix-list component="MatrixTalkCard" :operation="['delete']"></matrix-list>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref} from "vue";

let visible = ref(false)
let bar = ref([{
  key: "new",
  label: "最新发表",
  icon: "icon-time-circle",
  select: true
}, {
  key: "hot",
  label: "最多点赞",
  icon: "icon-like",
  select: false
}, {
  key: "collect",
  label: "最多收藏",
  icon: "icon-star",
  select: false
}, {
  key: "view",
  label: "最多观看",
  icon: "icon-eye",
  select: false
}])

function filterSelect(each) {
  bar.value.forEach(function (item) {
    item.select = each.key === item.key
  })
}

</script>

<style scoped lang="scss">
.talk-container {
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