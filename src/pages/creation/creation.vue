<template>
  <el-container class="creation-container" v-if="Object.keys(data).length !== 0">
    <el-backtop></el-backtop>
    <el-affix>
      <el-aside class="aside">
        <Navigation :username="data['username']"></Navigation>
      </el-aside>
    </el-affix>
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
import {setTitle} from "../../utils/globalFunc";

let data = ref({})

function init() {
  setTitle("创作中心")
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