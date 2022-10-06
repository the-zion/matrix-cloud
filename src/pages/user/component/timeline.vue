<template>
  <el-container class="timeline-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>动态</span>
    </el-row>
    <el-row class="body">
      <time-line-list></time-line-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "TimeLine"
}
</script>

<script setup>
import TimeLineList from "../../timeline/component/list.vue";

</script>

<style scoped lang="scss">
.timeline-container {
  width: 100%;
  flex-direction: column;

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