<template>
  <el-container class="user-container">
    <el-aside class="user-aside">
      <cube-user-info></cube-user-info>
    </el-aside>
    <el-main class="user-main">
<!--      <el-backtop target=".user-main" ref="backTop"></el-backtop>-->
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
        <cube-user-blog v-if="activeName === 'blog'"></cube-user-blog>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"

const {menu} = initData()

const test = ref(true)
const activeName = ref("time")
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