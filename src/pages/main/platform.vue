<template>
  <el-container class="platform">
    <router-view v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
  </el-container>
</template>

<script setup>

</script>

<style scoped lang="scss">
.platform {
  width: 100%;
}
</style>