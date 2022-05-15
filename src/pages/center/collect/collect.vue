<template>
  <el-container class="collect">
    <el-space class="bar" size="large">
      <el-space v-for="item in bar" class="each" :class="{'select':item.select}" @click="filterSelect(item)">
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span class="label">{{ item.label }}</span>
      </el-space>
    </el-space>
    <el-row class="body">
      <matrix-list v-if="current === 'blog'" :operation="['star']" :mode="1" @current-page="pageChange"></matrix-list>
      <matrix-list v-if="current === 'column'" :operation="['star']" :mode="2" @current-page="pageChange"></matrix-list>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref} from "vue";
import {scrollTo} from "../../../utils/scroll";

let current = ref("blog")
let bar = ref([{
  key: "blog",
  label: "博客",
  icon: "document",
  select: true
}, {
  key: "column",
  label: "专栏",
  icon: "files",
  select: false
}])

function filterSelect(each) {
  bar.value.forEach(function (item) {
    item.select = each.key === item.key
  })
  current.value = each.key
}

function pageChange() {
  scrollTo()
}

</script>

<style scoped lang="scss">
.collect {
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