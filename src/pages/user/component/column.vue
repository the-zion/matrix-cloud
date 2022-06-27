<template>
  <el-container class="column-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>专栏</span>
      <el-space spacer="|" class="operation">
        <span v-for="item in barMeta" :class="{'select': currentSelect === item.key}" @click="barSelect(item)"
        >{{ item.label }}</span>
      </el-space>
    </el-row>
    <el-row class="body">
      <matrix-column-list></matrix-column-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Column"
}
</script>

<script setup>
import {ref} from "vue"

let barMeta = [{
  key: "hot",
  label: "热门"
}, {
  key: "new",
  label: "最新"
}]

let currentSelect = ref("hot")

function barSelect(item) {
  currentSelect.value = item.key
}
</script>

<style scoped lang="scss">
.column-container {
  width: 100%;
  flex-direction: column;

  .bar {
    width: 100%;
    height: 50px;
    padding: 0 28px;
    border-bottom: 1px solid var(--el-border-color-light);

    .operation {
      font-size: 14px;
      color: var(--el-text-color-secondary);
      cursor: pointer;

      .select {
        color: var(--el-color-primary);
      }
    }
  }

  .body {
    width: 100%;
    margin-bottom: 1rem;
  }
}
</style>