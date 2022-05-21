<template>
  <el-container class="user-container" direction="vertical">
    <el-backtop></el-backtop>
    <el-header class="user-header">
      <card></card>
    </el-header>
    <el-container>
      <el-aside class="shadow-radius">
        <profile></profile>
      </el-aside>
      <el-main class="user-main">
        <el-space fill class="space" direction="vertical" :size="15">
          <el-row class="shadow-radius">
            <calendar></calendar>
          </el-row>
          <el-row class="shadow-radius">
            <el-main class="main">
              <el-row class="bar">
                <el-row class="menu" :class="{'select':current === menu.name}" v-for="menu in menus" @click="current = menu.name">
                  <el-space>
                    <el-row class="iconfont icon" :class="menu.icon"></el-row>
                    <el-row class="word">{{ menu.label }}</el-row>
                  </el-space>
                </el-row>
              </el-row>
              <el-row class="body">
                <blog v-if="current === 'blog'"></blog>
                <column v-if="current === 'column'"></column>
                <talk v-if="current === 'talk'"></talk>
                <collect v-if="current === 'collect'"></collect>
              </el-row>
            </el-main>
          </el-row>
        </el-space>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {ref} from "vue";
import Card from "./component/card.vue"
import Profile from "./component/profile.vue"
import Calendar from "./component/calendar.vue"
import Blog from "./component/blog.vue"
import Talk from "./component/talk.vue"
import Column from "./component/column.vue"
import Collect from "./component/collect.vue"

let current = ref("blog")
let menus = ref([{
      name: "blog",
      label: "博客",
      icon: "icon-read",
    }, {
      name: "column",
      label: "专栏",
      icon: "icon-folder",
    }, {
      name: "talk",
      label: "讨论发起",
      icon: "icon-message",
    }, {
      name: "collect",
      label: "收藏",
      icon: "icon-star",
    }]
)

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