<template>
  <router-view v-slot="{ Component }">
    <transition name="app" mode="out-in">
      <component :is="Component"/>
    </transition>
  </router-view>

</template>

<script setup>
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
  display: none
}

.el-avatar>img {
  width: 100%;
}

.el-loading-parent--relative {
  position: unset !important;
}

.el-timeline-item__tail {
  left: 8px;
}

.el-timeline-item__node--large {
  width: 22px;
  height: 22px;
}

.el-timeline-item__wrapper {
  padding-left: 35px;
  top: 3px;
}

.el-dialog {
  border-radius: 10px;
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 148px;
  height: 148px;
  object-fit: cover;
}

body {
  margin: unset;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.app-enter-active, .app-leave-active {
  transition: opacity 0.3s linear;
}

.app-enter-from, .app-leave-to {
  opacity: 0;
}
</style>
