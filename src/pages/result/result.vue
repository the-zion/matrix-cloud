<template>
  <el-container class="result-container">
    <el-header class="header" height="50px">
      <el-row class="block">
        <el-image class="logo" @click="backToHome"
                  :src="logo"
                  fit="contain"
        ></el-image>
      </el-row>
    </el-header>
    <el-main>
      <el-result
          class="result"
          :icon="type"
          :title="title"
          :sub-title="description"
      >
      </el-result>
    </el-main>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import {useRoute} from "vue-router";
import {backToHome, getAssets} from "../../utils/globalFunc";

const logo = getAssets('matrix.svg')
let type = ref("success")
let title = ref("")
let description = ref("")

function init() {
  initData()
}

function initData() {
  type.value = useRoute().query["type"]
  title.value = useRoute().query["title"]
  description.value = useRoute().query["description"]
}

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang="scss">
.result-container {
  width: 100%;

  .header {
    width: 100%;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--el-border-color-lighter);

    .block {
      width: 1200px;
      height: 100%;
      margin: auto;

      .logo {
        width: 95px;
        height: 100%;
        cursor: pointer;
      }
    }
  }

  .result {
    height: 400px;
  }
}
</style>