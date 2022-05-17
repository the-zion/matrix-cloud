<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"/>
  </router-view>
</template>

<script setup>
</script>

<style scoped lang="scss">

</style>