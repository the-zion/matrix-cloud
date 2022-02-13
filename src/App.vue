<template>
  <!--  <router-view></router-view>-->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
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

body {
  margin: unset;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s linear;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
