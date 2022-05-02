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

.el-loading-parent--relative {
  position: unset !important;
}


//.el-dialog {
//  border-radius: 10px;
//}

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
