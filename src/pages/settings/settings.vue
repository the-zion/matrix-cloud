<template>
  <el-container class="center-container">
    <el-backtop></el-backtop>
    <el-aside class="aside">
      <el-affix :offset="0">
        <Navigation></Navigation>
      </el-affix>
    </el-aside>
    <el-row class="main">
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </el-row>
  </el-container>
</template>

<script setup>
import Navigation from "./component/navigation.vue"
</script>

<style scoped lang="scss">
.center-container {
  width: 1200px;
  margin: auto;
  justify-content: space-between;
  padding: 20px 0;

  .aside {
    width: 230px;
    height: fit-content;
    border: 1px solid var(--el-border-color-lighter);
  }

  .main {

    width: calc(100% - 254px);
    border: 1px solid var(--el-border-color-lighter);
  }
}
</style>