<template>
  <el-container class="home-container">
<!--    <el-aside class="home-aside">-->
<!--      <el-scrollbar>-->
<!--        <el-row class="tac home-menu-row">-->
<!--          <el-col :span="24">-->
<!--            <el-menu-->
<!--                default-active="0"-->
<!--                class="el-menu-vertical-demo home-menu"-->
<!--            >-->
<!--              <el-menu-item index="0">-->
<!--                <el-icon>-->
<!--                  <house/>-->
<!--                </el-icon>-->
<!--                <span>全部</span>-->
<!--              </el-menu-item>-->
<!--              <el-menu-item :index="index+1+''" v-for="(item,index) in menuList">-->
<!--                <template #title>-->
<!--                  <el-icon>-->
<!--                    <component :is="item.icon"></component>-->
<!--                  </el-icon>-->
<!--                  <span>{{ item.name }}</span>-->
<!--                </template>-->
<!--              </el-menu-item>-->
<!--            </el-menu>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </el-scrollbar>-->
<!--    </el-aside>-->
    <el-main>
      <div class="home-main-select">
        <div style="flex-grow: 1">
          <el-tabs class="home-tabs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="按热度" name="hot"></el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <el-tabs>
            <el-tab-pane :disabled=true name="time">
              <template #label>
                <el-select v-model="value" class="m-2" placeholder="Select">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import {ref} from "vue"
import {metaData} from "./metaData.js"
import {controller} from "./controller.js"

let {menuList, activeName} = metaData()
let {handleClick} = controller()

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped lang="scss">
.home-container {
  height: 100%;

  .home-aside {
    padding: 2px 0 0 0;
    width: 180px;
    .home-menu-row {
      height: 100%;

      .home-menu {
        height: 100%;
      }

    }
  }

  .home-main-select {
    display: flex;

    .home-tabs {
      width: 100%;
    }
  }
}
</style>