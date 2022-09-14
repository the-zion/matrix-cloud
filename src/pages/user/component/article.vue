<template>
  <el-container class="article-container">
    <el-row class="bar" justify="space-between" align="middle">
      <span>文章</span>
    </el-row>
    <el-row class="body">
      <article-user-list></article-user-list>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Article"
}
</script>

<script setup>
import ArticleUserList from "../../article/component/user.vue";

</script>

<style scoped lang="scss">
.article-container {
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