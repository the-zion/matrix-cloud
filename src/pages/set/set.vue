<template>
  <el-container class="set-container">
    <el-row class="set-aside">
      <cube-aside :classList="classList" @select="classSelect"></cube-aside>
    </el-row>
    <el-main class="set-main">
      <cube-security v-if="currentPage === 'security'"></cube-security>
      <cube-bind v-if="currentPage === 'bind'"></cube-bind>
      <cube-message-set v-if="currentPage === 'messageSet'"></cube-message-set>
    </el-main>
  </el-container>
</template>

<script setup>
import {initData} from './initData.js'
import {controller} from "./controller";

const {classList, currentPage} = initData()
const {classSelect} = controller(classList, currentPage)
</script>

<style scoped lang="scss">
.set-container {
  height: 100%;
  width: 1000px;
  margin: auto;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  .set-aside {
    border-right: 1px solid var(--el-border-color-base);
  }
}
</style>