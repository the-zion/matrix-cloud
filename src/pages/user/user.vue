<template>
  <el-container class="user-container" direction="vertical">
    <el-backtop target=".main-scrollbar" ref="backTop"></el-backtop>
    <!--    <el-aside class="user-aside">-->
    <!--      <cube-user-info></cube-user-info>-->
    <!--    </el-aside>-->
    <el-row class="user-info">
      <cube-user-info></cube-user-info>
    </el-row>
    <el-main class="user-main">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane v-for="item in menu" :name="item.name">
          <template #label>
            <el-space>
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <el-row>{{ item.label }}</el-row>
            </el-space>
          </template>
        </el-tab-pane>
      </el-tabs>
      <el-row :style="activeName !== 'time' && {'height':'calc(100% - 45px)'}">
        <cube-time-line v-if="activeName === 'time'"></cube-time-line>
        <cube-user-blog v-if="activeName === 'blog'" @upToTop="upToTop"></cube-user-blog>
        <cube-user-talk v-if="activeName === 'talk'" @upToTop="upToTop"></cube-user-talk>
        <cube-user-column v-if="activeName === 'column'" @upToTop="upToTop"></cube-user-column>
        <cube-user-collect v-if="activeName === 'collect'" @upToTop="upToTop"></cube-user-collect>
        <cube-user-care v-if="activeName === 'care' || activeName === 'cared'" @upToTop="upToTop"></cube-user-care>
        <cube-user-message v-if="activeName === 'message'" @upToTop="upToTop"></cube-user-message>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"

const activeName = ref("time")
const backTop = ref()

const {menu} = initData()
const {upToTop} = controller(backTop)
</script>

<style scoped lang="scss">
.user-container {
  //height: 100%;
  width: 1000px;
  margin: auto;

  .user-info {
    height: 275px;
    width: 100%;
    background: var(--el-color-white);
    margin: 10px 0;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgb(18 18 18 / 10%)
  }

  .user-main {
    background: var(--el-color-white);
    box-shadow: 0 1px 3px rgb(18 18 18 / 10%)
  }

}
</style>