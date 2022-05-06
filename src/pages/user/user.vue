<template>
  <el-container class="user-container" direction="vertical">
    <el-backtop target=".el-scrollbar__wrap" ref="backTop"></el-backtop>
    <el-header class="user-header">
      <matrix-user-card></matrix-user-card>
    </el-header>
    <el-container>
      <el-aside class="shadow-radius">
        <matrix-user-profile></matrix-user-profile>
      </el-aside>
      <el-main class="user-main">
        <el-space fill class="space" direction="vertical" :size="15">
          <el-row class="shadow-radius">
            <matrix-user-calendar></matrix-user-calendar>
          </el-row>
          <el-row class="shadow-radius">
            <el-main class="main">
              <el-row class="bar">
                <el-row class="menu" :class="{'select':menu.select}" v-for="menu in menus">
                  <el-space @click="menuSelect(menu)">
                    <el-row class="iconfont icon" :class="menu.icon"></el-row>
                    <el-row class="word">{{ menu.label }}</el-row>
                  </el-space>
                </el-row>
              </el-row>
              <el-row class="body">
                <matrix-user-blog v-if="current === 'blog'"></matrix-user-blog>
              </el-row>
            </el-main>
          </el-row>
        </el-space>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"

const backTop = ref()

const {menus} = initData()
const {upToTop} = controller(backTop)

let current = ref("blog")

function menuSelect(menu) {
  menus.value.forEach(function (item) {
    item.select = menu.name === item.name
  })
  current.value = menu.name
}
</script>

<style scoped lang="scss">
.user-container {
  width: 1200px;
  margin: auto;

  .shadow-radius {
    border-radius: 0.5rem;
    box-shadow: var(--el-box-shadow-light);
    background-color: var(--el-color-white);
    height: fit-content;
  }

  .user-header {
    padding: unset;
    height: fit-content;
  }

  .user-main {
    padding: 0 var(--el-main-padding);
    overflow: unset;

    .space {
      width: 100%;

      .main {
        padding: 1rem;

        .bar {
          width: 100%;
          height: 45px;

          .menu {
            padding: 10px 1rem 10px 1rem;
            color: var(--el-text-color-regular);
            cursor: pointer;

            .icon {
              font-size: 1.5rem;
            }

            .word {
              font-size: 14px;
            }
          }

          .select {
            color: var(--el-text-color-primary);
            background-color: var(--el-fill-color);
            border-radius: 5px;
          }
        }

        .body {
          width: 100%;
          margin-top: 1rem;
        }
      }
    }
  }

}
</style>