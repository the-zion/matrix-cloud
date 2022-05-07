<template>
  <el-container class="user-container" direction="vertical">
    <el-backtop target=".el-scrollbar__wrap"></el-backtop>
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
                <el-row class="menu" :class="{'select':menu.select}" v-for="menu in menus" @click="menuSelect(menu)">
                  <el-space>
                    <el-row class="iconfont icon" :class="menu.icon"></el-row>
                    <el-row class="word">{{ menu.label }}</el-row>
                  </el-space>
                </el-row>
              </el-row>
              <el-row class="body">
                <matrix-user-blog v-show="current === 'blog'" :scroll="props.scroll"></matrix-user-blog>
                <matrix-user-column v-show="current === 'column'" :scroll="props.scroll"></matrix-user-column>
                <matrix-user-talk v-show="current === 'talk'" :scroll="props.scroll"></matrix-user-talk>
              </el-row>
            </el-main>
          </el-row>
        </el-space>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {defineProps} from "vue"
import {controller} from "./controller.js"

const {initVariable, menuSelect} = controller()
let {current, menus} = initVariable()
const props = defineProps({
  scroll: Object,
})

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