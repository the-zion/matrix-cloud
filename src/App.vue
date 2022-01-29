<template>
  <el-container class="main-container">
    <!--    <el-scrollbar class="main-scrollbar">-->
    <!--    </el-scrollbar>-->
    <el-header class="main-header">
      <el-menu class="main-menu" mode="horizontal" :router=true :default-active="defaultActiveIndex">
        <el-image class="main-cube-logo"
                  :src="logoImageUrl"
                  fit="contain"
        ></el-image>
        <div style="flex-grow: 1"></div>
        <!--          <el-menu-item class="main-menu-item" :route="item.state" :index="item.state" v-for="item in menulist">-->
        <!--            {{ item.name }}-->
        <!--          </el-menu-item>-->
        <!--          <div style="flex-grow: 1"></div>-->
        <!--          <el-row class="main-search">-->
        <!--            <el-input v-model="input4" class="w-50 m-2" placeholder="Type something">-->
        <!--              <template #prefix>-->
        <!--                <el-icon class="el-input__icon">-->
        <!--                  <search/>-->
        <!--                </el-icon>-->
        <!--              </template>-->
        <!--            </el-input>-->
        <!--          </el-row>-->
        <!--          <el-tooltip content="我要发表" placement="bottom" effect="light">-->
        <!--            <el-badge :hidden=true class="main-menu-icon">-->
        <!--              <el-icon :size="20">-->
        <!--                <edit/>-->
        <!--              </el-icon>-->
        <!--            </el-badge>-->
        <!--          </el-tooltip>-->
        <el-icon :size="20">
          <message/>
        </el-icon>
        <el-badge :value="messageValue" :max="99" class="main-menu-icon" :hidden=messageCount(messageValue)>
          <el-icon :size="20" @click="add">
            <message/>
          </el-icon>
        </el-badge>
        <el-dropdown trigger="hover" :show-timeout=50 :hide-timeout=50>
          <el-avatar class="main-user-image" :size="35" :src="userImageUrl"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <div style="width: 220px;height: 140px;display: flex;align-items: center;justify-content: center">
                <el-avatar :size="60" :src="userImageUrl"></el-avatar>
              </div>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-menu>
    </el-header>
    <el-container class="main-sub-container">
      <el-aside class="main-aside">
        <el-scrollbar>
          <el-row class="tac main-menu-row">
            <el-col :span="24">
              <el-menu
                  default-active="0"
                  class="el-menu-vertical-demo main-menu"
              >
                <el-menu-item index="0">
                  <el-icon>
                    <house/>
                  </el-icon>
                  <span>全部</span>
                </el-menu-item>
                <el-menu-item :index="index+1+''" v-for="(item,index) in menulist">
                  <template #title>
                    <el-icon>
                      <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                  </template>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-scrollbar class="main-scrollbar">
          <el-main class="main-area">
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-scrollbar>
      </el-container>
    </el-container>
    <!--      <el-footer class="main-footer">Footer</el-footer>-->
  </el-container>
</template>

<script setup>
import {ref, reactive, toRefs} from 'vue'

const url = reactive({
  userImageUrl: new URL(`./assets/images/user.jpg`, import.meta.url).href,
  logoImageUrl: new URL(`./assets/images/cube.svg`, import.meta.url).href
})
const {userImageUrl, logoImageUrl} = toRefs(url)
const defaultActiveIndex = "home"
const menulist = ref([{
  id: 0,
  key: "home",
  name: "首页",
  state: "home",
}, {
  id: 1,
  key: "community",
  name: "江湖",
  state: "community",
}, {
  id: 2,
  key: "about",
  name: "关于Cube",
  state: "about",
}])
let messageValue = ref(0)

function messageCount(value) {
  return value === 0
}

function add() {
  messageValue.value += 1
}

</script>
<style lang="scss">
body {
  margin: unset;
  overflow: hidden;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;;
}

.main-container {
  position: absolute;
  top: 0;
  bottom: -60px;
  left: 0;
  right: 0;

  .main-header {
    padding: unset;
    height: 50px;

    .main-menu {
      display: flex;
      padding: 0 20px;
      height: 50px;
      align-items: center;
      background: #001529;

      .main-cube-logo {
        width: 100px;
        margin-right: 100px;
      }

      .main-search {
        margin-left: 10px;
        margin-right: 10px;
      }

      .main-menu-icon {
        color: white;
        margin: 0 15px;
        cursor: pointer;
        display: flex;

        .el-badge__content.is-fixed {
          border: unset;
        }
      }

      .main-user-image {
        margin: 0 15px;
      }
    }
  }

  .main-sub-container {
    height: calc(100% - 50px);

    .main-aside {
      width: 180px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

      .main-menu-row {
        height: 100%;

        .main-menu {
          height: 100%;
        }

      }
    }

    .main-scrollbar {
      position: absolute;
      top: 0;
      bottom: -60px;
      left: 0;
      right: 0;

      .el-scrollbar__view {
        height: 100%;
      }

      .main-area {
        min-height: 100%;
        padding: unset;
      }
    }
  }


  .main-footer {
    background: #f6f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
