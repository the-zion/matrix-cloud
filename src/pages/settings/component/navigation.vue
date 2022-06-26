<template>
  <el-container class="navigation-container">
    <el-row class="navigation-block">
      <el-space v-for="item in menu" :key="item.key" class="each"
                :class="{'select': currentMenu === item.key}"
                @click="menuSelect(item)">
        <el-icon class="icon" :class="{'select': currentMenu === item.key}">
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
  key: "profile",
  label: "个人资料",
  icon: "user",
  router: "settings.profile"
}, {
  key: "account",
  label: "账号设置",
  icon: "setting",
  router: "settings.account"
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
  background-color: var(--el-color-white);
  padding: 8px;
  height: 600px;

  .navigation-block {
    width: 100%;

    .each {
      cursor: pointer;
      width: 100%;
      padding: 14px 18px;

      .label {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }

      .select {
        color: var(--el-color-primary) !important;
      }

      .icon {
        color: var(--el-text-color-regular);
      }
    }

    .each:hover {
      background-color: #e8f3ff;

      .label, .icon {
        color: var(--el-color-primary);
      }
    }

    .select {
      background-color: #e8f3ff;
    }
  }
}
</style>