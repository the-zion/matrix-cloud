<template>
  <el-container class="home-container">
    <el-backtop></el-backtop>
    <el-main class="main">
      <el-row class="menu" justify="space-between">
        <el-row v-for="item in menu" class="menu-item" @click="select(item)">
          <span class="label" :class="{'select':current === item.key}">{{ item.label }}</span>
          <el-image fit="fill" class="image" :src="item.image"></el-image>
        </el-row>
      </el-row>
      <router-view v-slot="{ Component }">
        <component :is="Component"/>
      </router-view>
    </el-main>
    <el-aside class="aside">
      <matrix-home-aside></matrix-home-aside>
    </el-aside>
  </el-container>
</template>

<script setup>
import {onMounted, ref} from "vue"
import router from "../../router";
import {useRoute} from "vue-router";

let current = ref()
let menu = ref([{
  key: "blog",
  label: "博客文章",
  image: "../../src/assets/images/blog.svg",
}, {
  key: "column",
  label: "专栏分享",
  image: "../../src/assets/images/column.svg"
}, {
  key: "talk",
  label: "讨论发起",
  image: "../../src/assets/images/talk.svg"
}, {
  key: "news",
  label: "每日新闻",
  image: "../../src/assets/images/news.svg",
}])

function init() {
  initData()
}

function initData() {
  current.value = useRoute().name.split(".")[1]
}

function select(item) {
  current.value = item.key
  router.push({name: "home." + item.key})
}

router.afterEach(function (route) {
  current.value = route.name.split(".")[1]
})

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">
.home-container {
  width: 1040px;
  margin: auto;

  .main {
    padding: 5px 5px 5px 20px;

    .menu {
      width: 100%;
      margin-bottom: 14px;

      .menu-item {
        width: 176px;
        height: 100px;
        background-color: var(--el-color-white);
        border-radius: 8px;
        box-shadow: var(--el-box-shadow-lighter);
        padding: 12px 0 0 16px;
        flex-direction: column;
        cursor: pointer;

        .label {
          font-size: 16px;
          line-height: 22px;
          font-weight: 500;
          color: var(--el-text-color-regular);
        }

        .image {
          width: calc(100% - 82px);
          height: 100%;
        }

        .select {
          color: var(--el-color-primary);
        }
      }
    }
  }

  .aside {
    width: 262px;
    padding: 0 3px;
    margin: 0 8px;
  }
}
</style>