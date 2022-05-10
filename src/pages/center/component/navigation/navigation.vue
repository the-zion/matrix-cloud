<template>
  <el-container class="navigation">
    <el-space class="avatar-block">
      <el-avatar class="avatar" shape="square" :size="60" :src="'../src/assets/images/boy.png'"></el-avatar>
      <el-space fill>
        <span class="nickname">{{ nickname }}</span>
        <span class="name">{{ name }}</span>
      </el-space>
    </el-space>
    <el-row class="navigation-block">
      <el-space v-for="item in menu.slice(0,4)" class="each" :class="{'select': item.select}"
                @click="menuSelect(item)">
        <el-icon color="var(--el-text-color-regular)">
          <component :is="item.icon"></component>
        </el-icon>
        <span class="label">{{ item.label }}</span>
      </el-space>
      <el-divider class="divider"/>
      <el-space v-for="item in menu.slice(4,)" class="each" :class="{'select': item.select}"
                @click="menuSelect(item)">
        <el-icon color="var(--el-text-color-regular)">
          <component :is="item.icon"></component>
        </el-icon>
        <span class="label">{{ item.label }}</span>
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
import {controller} from "./controller";
import {onMounted} from "vue";

const emits = defineEmits(["change"])
const {initVariable, init, menuSelect} = controller()
let {nickname, name, menu} = initVariable()
onMounted(function () {
  init(emits)
})
</script>

<style scoped lang=scss>
.navigation {
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