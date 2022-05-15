<template>
  <el-container class="center-container">
    <el-backtop></el-backtop>
    <el-aside class="aside">
      <el-affix :offset="0">
        <matrix-center-navigation></matrix-center-navigation>
      </el-affix>
    </el-aside>
    <el-main>
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </el-main>
  </el-container>
</template>

<script setup>
</script>

<style scoped lang="scss">
.center-container {
  max-width: 1128px;
  width: fit-content;
  margin: auto;

  .aside {
    width: 240px;
    height: fit-content;
  }
}
</style>