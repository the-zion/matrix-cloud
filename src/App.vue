<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"/>
  </router-view>

</template>

<script setup>
</script>
<style lang="scss">

:root{
  --el-overlay-color-lighter: rgba(0, 0, 0, 0.2) !important;
}

body {
  margin: unset;
  overflow: auto;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;

  .dropdown {
    border-radius: 0.5rem;

    .el-popper__arrow {
      display: none;
    }
  }

  .matrix-message-box {
    vertical-align: unset;
    border-radius: 8px;
  }

  .popover {
    padding: 16px 0 !important;
    border-radius: 10px !important;
  }

}
</style>
