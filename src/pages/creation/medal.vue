<template>
  <el-container class="medal-container">
    <el-header class="medal-header" height="50px">
      <el-row v-for="item in menu" class="option" align="middle" @click="currentMenu = item.key">
        <span>{{ item.label }}</span>
        <span class="bottom-line" v-show="currentMenu === item.key"></span>
      </el-row>
    </el-header>
    <MedalAll v-if="currentMenu === 'all'"></MedalAll>
    <MedalEquipment v-if="currentMenu === 'equipment'"></MedalEquipment>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import MedalAll from "./component/medal/medal.vue";
import MedalEquipment from "./component/medal/equipment.vue";

const menu = [{
  key: "all",
  label: "全部"
}, {
  key: "equipment",
  label: "装配"
}]

let currentMenu = ref("all")

function init() {
}


onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.medal-container {
  width: 100%;
  flex-direction: column;
  background-color: var(--el-color-white);

  .medal-header {
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    align-items: center;
    line-height: 22px;
    display: flex;

    .option {
      height: 100%;
      margin-right: 40px;
      position: relative;
      cursor: pointer;

      .bottom-line {
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: 50px;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        z-index: 10;
        background-color: var(--el-color-primary);
      }
    }
  }
}
</style>