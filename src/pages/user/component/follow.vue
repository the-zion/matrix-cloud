<template>
  <el-container class="follow-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>关注</span>
      <el-space spacer="|" class="operation">
        <span v-for="item in barMeta" :class="{'select': currentSelect === item.key}" @click="barSelect(item)"
        >{{ item.label }}</span>
      </el-space>
    </el-row>
    <el-row class="body">
      <matrix-user-list ref="listRef" :follows="props.follows"></matrix-user-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Follow"
}
</script>

<script setup>
import {ref} from "vue"

const props = defineProps({
  follows: {
    type: Object,
    default: {}
  }
})

let barMeta = [{
  key: "follow",
  label: "关注的用户"
}, {
  key: "followed",
  label: "关注者"
}]
let listRef = ref()
let currentSelect = ref("follow")

function barSelect(item) {
  currentSelect.value = item.key
  listRef.value.modeChange(item.key)
}
</script>

<style scoped lang="scss">
.follow-container {
  width: 100%;
  flex-direction: column;

  .bar {
    width: 100%;
    height: 50px;
    padding: 0 20px;
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
  }
}
</style>