<template>
  <el-container class="navigation-container">
    <el-space class="avatar-block">
      <el-avatar class="avatar" shape="square" :size="60" :src="'../../src/assets/images/boy.png'"></el-avatar>
      <el-space fill>
        <span class="nickname">{{ nickname }}</span>
        <span class="name">{{ name }}</span>
      </el-space>
    </el-space>
    <el-row class="navigation-block">
      <el-space v-for="item in menu.slice(0,4)" :key="item.key" class="each" :class="{'select': currentMenu === item.key}"
                @click="menuSelect(item)">
        <el-icon color="var(--el-text-color-regular)" :class="{'select': currentMenu === item.key}">
          <component :is="item.icon"></component>
        </el-icon>
        <span class="label" :class="{'select': currentMenu === item.key}">{{ item.label }}</span>
      </el-space>
      <el-divider class="divider"/>
      <el-space v-for="item in menu.slice(4,)" :key="item.key" class="each" :class="{'select': currentMenu === item.key}"
                @click="menuSelect(item)">
        <el-icon color="var(--el-text-color-regular)" :class="{'select': currentMenu === item.key}">
          <component :is="item.icon"></component>
        </el-icon>
        <span class="label" :class="{'select': currentMenu === item.key}">{{ item.label }}</span>
      </el-space>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "MatrixCenterNavigation"
}
</script>

<script setup>
import {ref} from "vue";
import {useRoute} from "vue-router";
import {scrollToTop} from "../../../utils/scroll";
import router from "../../../router";

let nickname = ref("刘小圆sama")
let name = ref("neo")
let currentMenu = ref(useRoute().query["menu"])
let menu = ref([{
  key: "blog",
  label: "我的博客",
  icon: "document",
  router: "center.user"
}, {
  key: "column",
  label: "我的专栏",
  icon: "files",
  router: "center.column"
}, {
  key: "talk",
  label: "讨论发起",
  icon: "chat-dot-round",
  router: "center.talk"
}, {
  key: "collect",
  label: "我的收藏",
  icon: "star",
  router: "center.collect"
}, {
  key: "profile",
  label: "个人资料",
  icon: "user",
  router: "center.profile"
}, {
  key: "security",
  label: "账号安全",
  icon: "lock",
  router: "center.security"
}])

function menuSelect(each) {
  currentMenu.value = each.key
  scrollToTop()
  router.push({name: each.router, query: {menu: each.key}})
}

</script>

<style scoped lang=scss>
.navigation-container {
  width: 100%;
  flex-direction: column;

  .avatar-block {
    width: 100%;
    padding: 24px 0;
    border-bottom: 1px solid var(--el-border-color);

    .avatar {
      border-radius: 5px;
    }

    .nickname {
      font-size: 16px;
      color: var(--el-text-color-primary);
    }

    .name {
      font-size: 13px;
      color: var(--el-text-color-secondary);
    }
  }

  .navigation-block {
    width: 100%;

    .divider {
      margin: 15px 0;
    }

    .each {
      cursor: pointer;
      width: 100%;
      border-radius: 5px;
      padding: 14px 18px;

      .label {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }

      .select {
        color: var(--el-color-primary);
      }
    }

    .each:hover {
      background-color: var(--el-fill-color);
    }

    .select {
      background-color: var(--el-fill-color);
    }
  }
}
</style>