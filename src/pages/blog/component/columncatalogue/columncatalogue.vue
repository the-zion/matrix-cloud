<template>
  <el-row class="catalogue-block">
    <el-row class="title-block">
      <el-row class="title">{{ title }}</el-row>
      <el-space class="author-block">
        <el-avatar :size="34" :src="'../../src/assets/images/user1.png'"></el-avatar>
        <el-row class="author" align="middle">刘思圆</el-row>
        <el-row class="date" align="middle">2022-03-05 创建</el-row>
      </el-space>
    </el-row>
    <el-menu
        default-active="2"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-row class="catalogue">目录</el-row>
      <el-menu-item :index="index" v-for="(item, index) in catalogue">
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: "CubeColumnCatalogue"
}
</script>
<script setup>
import {ref} from "vue"

const catalogue = ref([])
const title = ref("玩转 Vue 3 全家桶")
for (let i = 0; i < 20; i++) {
  catalogue.value.push({
    "name": ((i + 1) >= 10 ? (i + 1) : ("0" + (i + 1))) + " | 新特性：初探Vue 3新特性"
  })
}
</script>

<style scoped lang="scss">
.catalogue-block {
  width: 100%;
  height: 100%;

  .title-block {
    height: 120px;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-base);

    .title {
      font-size: 24px;
      line-height: 31px;
      color: #404040;
      font-weight: 500;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .author-block {
      margin-top: 10px;

      .date, .author {
        font-size: 13px;
        color: var(--el-text-color-secondary);
      }

    }
  }

  .menu {
    border: unset;
    height: calc(100% - 120px);
    overflow: auto;
    padding: 20px 0 20px 0;

    .catalogue {
      width: 332px;
      font-size: 20px;
      color: #404040;
      font-weight: 500;
    }
  }
}
</style>