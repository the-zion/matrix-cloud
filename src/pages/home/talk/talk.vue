<template>
  <el-container class="talk">
    <el-row class="head" justify="space-between">
      <el-space class="menu" :size="32">
        <el-row class="each" :class="{'menu-select':current === item.key}" v-for="item in menu"
                @click="current = item.key" align="middle">
          {{ item.label }}
        </el-row>
      </el-space>
      <el-space class="operate">
        <el-input
            class="input"
            v-model="input"
            placeholder="题目/标签/作者/内容"
            suffix-icon="Search"
        />
        <el-button round type="primary" icon="EditPen">讨论发起</el-button>
      </el-space>
    </el-row>
    <matrix-list :mode="3" shape="card" :gap="10" :tag="true" :pageBackground="true"
                 @current-page="pageChange"></matrix-list>
  </el-container>
</template>

<script setup>
import {ref} from "vue"
import {scrollToTop} from "../../../utils/scroll";

let input = ref()
let current = ref("hot")
let menu = ref([
  {
    key: "hot",
    label: "最热"
  }, {
    key: "new",
    label: "最新"
  }, {
    key: "collect",
    label: "收藏最多"
  }, {
    key: "view",
    label: "浏览最多"
  }
])

function pageChange() {
  scrollToTop()
}
</script>

<style scoped lang="scss">
.talk {
  width: 100%;
  flex-direction: column;

  .head {
    width: 100%;
    margin-bottom: 14px;

    .menu {
      .each {
        color: var(--el-text-color-secondary);
        cursor: pointer;
        height: 32px;
      }

      .menu-select {
        font-weight: 500;
        color: var(--el-text-color-primary);
        border-bottom: 2px solid var(--el-text-color-primary);
      }
    }

    .operate {
      .input {
        width: 250px;
      }
    }
  }

  .body {
    width: 100%;
  }
}
</style>