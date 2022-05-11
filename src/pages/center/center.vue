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
      <matrix-center-column v-if="menu === 'column'"></matrix-center-column>
      <matrix-center-talk v-if="menu === 'talk'"></matrix-center-talk>
      <matrix-center-collect v-if="menu === 'collect'"></matrix-center-collect>
    </el-main>
  </el-container>
</template>

<script setup>
import {ref} from "vue";
import {scrollToTop} from "../../utils/globalFunc";

let menu = ref("blog")

function menuChange(value) {
  menu.value = value
  scrollToTop()
}
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