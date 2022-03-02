<template>
  <el-container class="user-container">
    <el-aside class="user-aside">
      <cube-user-info></cube-user-info>
    </el-aside>
    <el-main class="user-main">
      <el-backtop target=".user-main" ref="backTop"></el-backtop>
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
        <cube-user-blog v-if="activeName === 'blog'" :upToTop="upToTop"></cube-user-blog>
        <cube-user-talk v-if="activeName === 'talk'" :upToTop="upToTop"></cube-user-talk>
        <cube-user-column v-if="activeName === 'column'" :upToTop="upToTop"></cube-user-column>
        <cube-user-collect v-if="activeName === 'collect'" :upToTop="upToTop"></cube-user-collect>
        <cube-user-care v-if="activeName === 'care' || activeName === 'cared'" :upToTop="upToTop"></cube-user-care>
        <cube-user-message v-if="activeName === 'message'" :upToTop="upToTop"></cube-user-message>
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
  height: 100%;

  .user-aside {
    padding: 24px;
    border-right: 1px solid var(--el-border-color-base);
  }
}
</style>