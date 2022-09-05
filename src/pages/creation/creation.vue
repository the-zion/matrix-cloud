<template>
  <el-container class="creation-container">
    <el-backtop></el-backtop>
    <el-aside class="aside">
      <el-affix :offset="0">
        <Navigation :username="data['username']"></Navigation>
      </el-affix>
    </el-aside>
    <el-row class="main">
      <router-view v-slot="{ Component }">
        <component :is="Component" :data="data"/>
      </router-view>
    </el-row>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import Navigation from "./component/navigation.vue"
import {get} from "../../utils/axios";

let data = ref({})

function init() {
  getData()
}

function getData() {
  get("/v1/get/user/info").then(function (reply) {
    data.value = reply.data
  })
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.creation-container {
  width: 1020px;
  margin: auto;
  justify-content: space-around;
  padding: 20px 0;

  .aside {
    width: 200px;
    height: fit-content;
    border-radius: 6px;
  }

  .main {
    width: 800px;
  }
}
</style>