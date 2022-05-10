<template>
  <el-container class="set-container">
    <el-backtop></el-backtop>
    <el-aside class="aside">
      <el-affix :offset="0">
        <matrix-center-navigation @change="menuChange"></matrix-center-navigation>
      </el-affix>
    </el-aside>
    <el-main>
      <matrix-center-blog v-if="menu === 'blog'"></matrix-center-blog>
    </el-main>
  </el-container>
</template>

<script setup>
import {controller} from "./controller";

const {initVariable, menuChange} = controller()
let {menu} = initVariable()
</script>

<style scoped lang="scss">
.set-container {
  width: 1200px;
  margin: auto;

  .aside {
    width: 240px;
    height: fit-content;
  }
}
</style>