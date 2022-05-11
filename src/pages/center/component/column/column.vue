<template>
  <el-container class="column">
    <el-space class="bar" size="large">
      <el-space v-for="item in bar" class="each" :class="{'select':item.select}" @click="filterSelect(item)">
        <el-icon class="iconfont" :class="item.icon"></el-icon>
        <span class="label">{{ item.label }}</span>
      </el-space>
    </el-space>
    <el-row class="body">
      <matrix-list :mode="2" :operation="['edit', 'delete']" @current-page="pageChange"></matrix-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "MatrixCenterColumn"
}
</script>

<script setup>
import {ref} from "vue";
import {scrollTo} from "../../../../utils/globalFunc";

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

function pageChange() {
  scrollTo()
}

</script>

<style scoped lang="scss">
.column {
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