<template>
  <el-container class="collect-container">
    <el-space class="bar" size="large">
      <el-space v-for="item in bar" class="each" :class="{'select':current === item.key}" @click="filterSelect(item)">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span class="label">{{ item.label }}</span>
      </el-space>
    </el-space>
    <el-row class="body">
      <matrix-list v-if="current === 'blog'" :operation="['star']" component="MatrixBlogCard"></matrix-list>
      <matrix-list v-if="current === 'column'" :operation="['star']" component="MatrixColumnCard"></matrix-list>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref} from "vue";

let current = ref("blog")
let bar = ref([{
  key: "blog",
  label: "博客",
  icon: "document",
}, {
  key: "column",
  label: "专栏",
  icon: "files",
}])

function filterSelect(each) {
  current.value = each.key
}

</script>

<style scoped lang="scss">
.collect-container {
  width: 100%;
  min-width: 848px;
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