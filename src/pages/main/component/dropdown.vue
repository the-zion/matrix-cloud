<template>
  <el-container class="center">
    <el-space class="info">
      <el-avatar class="icon" :size="56" icon="UserFilled"></el-avatar>
      <el-space class="word" direction="vertical" alignment="start" :size="2">
        <span class="name">{{ name }}</span>
        <span class="introduce">{{ introduce }}</span>
      </el-space>
    </el-space>
    <el-space class="menu" direction="vertical" alignment="start" fill :size="10">
      <el-space v-for="item in menu" :key="item.label" class="each" @click="item.func">
        <el-icon :size="18" color="var(--el-text-color-regular)">
          <component :is="item.icon"></component>
        </el-icon>
        <span class="word">{{ item.label }}</span>
      </el-space>
    </el-space>
  </el-container>
</template>
<script>
export default {
  name: "Dropdown"
}
</script>

<script setup>
import {ref, onMounted} from "vue";
import router from "../../../router";
import {userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia";

const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)

let name = ref("")
let introduce = ref("")
let menu = ref([
  {
    label: "个人主页",
    icon: "user",
    func: userPage
  },
  {
    label: "用户中心",
    icon: "office-building",
    func: userCenter
  },
  {
    label: "账户设置",
    icon: "setting",
    func: userSettings
  },
  {
    label: "退出登录",
    icon: "circle-close",
    func: signOut
  }
])

function init() {
  initData()
}

function initData() {
  name.value = "刘小圆sama"
  introduce.value = "海纳百川，有容纳大"

}

function userPage() {
  router.push({name: "user", query: {id: uuid.value, menu: 'article'}})
}

function userCenter() {
  router.push({name: "center.user", query: {menu: 'blog'}})
}

function userSettings() {
  router.push({name: "settings.profile", query: {menu: 'profile'}})
}

function signOut() {

}

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">
.center {
  width: calc(270px - 1rem);
  padding: 1rem;
  flex-direction: column;

  .info {
    width: 100%;
    padding-top: 0.25rem;
    padding-bottom: 1rem;

    .icon {
      font-size: 30px;
    }

    .word {
      width: calc(100% - 56px);

      .name {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
        color: var(--el-text-color-primary)
      }

      .introduce {
        font-size: .75rem;
        line-height: 1rem;
        color: var(--el-text-color-secondary);
        word-break: break-word;
        align-self: stretch;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }
  }

  .menu {
    width: 100%;
    padding-top: 1rem;

    .each {
      padding: 0.5rem;
      width: 100%;
      border-radius: 5px;
      cursor: pointer;

      .icon {
        color: var(--el-text-color-regular)
      }

      .word {
        font-size: 14px;
        color: var(--el-text-color-primary)
      }
    }

    .each:hover {
      background-color: var(--el-fill-color-lighter);
    }
  }
}
</style>