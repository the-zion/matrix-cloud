<template>
  <el-container class="talk-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>讨论</span>
    </el-row>
    <el-row class="body">
      <talk-creation-list @row-delete="rowDelete"></talk-creation-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Talk"
}
</script>

<script setup>
import TalkCreationList from "../../../talk/component/creation.vue";

const emits = defineEmits(["row-delete"])

function rowDelete() {
  emits("row-delete")
}
</script>

<style scoped lang="scss">
.talk-container {
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