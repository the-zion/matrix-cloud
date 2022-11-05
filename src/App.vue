<template>
  <el-config-provider>
    <router-view v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
  </el-config-provider>
</template>

<script setup>
import {onBeforeMount} from "vue";
import {userMainStore} from "./store/user";

const userStore = userMainStore()
onBeforeMount(function () {
  userStore.getUserProfile()
  userStore.getUserCos()
})
</script>

