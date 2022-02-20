<template>
  <el-affix position="bottom" :offset="20">
    <el-button type="primary">距离底部 20px</el-button>
  </el-affix>
  <div class="affix-container">
    <el-affix target=".affix-container" :offset="80" position="top">
      <el-button type="primary">Target container</el-button>
    </el-affix>
  </div>
  <div class="bffix-container">
    <el-affix target=".bffix-container" :offset="80" position="bottom">
      <el-button type="primary">Target</el-button>
    </el-affix>
  </div>
</template>
<style scoped lang="scss">
.affix-container,.bffix-container {
  text-align: center;
  height: 2000px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>