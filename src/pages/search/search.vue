<template>
  <el-container class="search-container">
    <el-row class="search-block">
      <el-row class="search">
        <el-input class="input" prefix-icon="Search" placeholder="请输入搜索内容" v-model="input"></el-input>
      </el-row>
    </el-row>
    <el-row class="option-block">
      <el-space class="options" :size="50">
        <el-row v-for="item in options" :key="item.key" class="each" :class="{'select':current === item.key}"
                @click="current = item.key" align="middle">
          <el-icon :size="18">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="label">{{ item.label }}</span>
        </el-row>
      </el-space>
    </el-row>
    <el-row class="main-block">
      <el-row class="main">
        <component :is="'matrix-' + current + '-list'" shape="card" :gap="10" :page-background="true"></component>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onBeforeUnmount, onMounted} from "vue";

let mainBody = null
let current = ref("blog")
let input = ref("")
let options = [{
  key: "blog",
  label: "文章",
  icon: "document",
}, {
  key: "column",
  label: "专栏",
  icon: "files",
}, {
  key: "talk",
  label: "讨论",
  icon: "chat-dot-round",
}, {
  key: "user",
  label: "找人",
  icon: "user",
}]

onBeforeUnmount(function () {
  mainBody.style.padding = "20px"
})

onMounted(function () {
  mainBody = document.getElementsByClassName("main-body")[0]
  mainBody.style.padding = "unset"
})
</script>


<style scoped lang="scss">
.search-container {
  width: 100%;
  flex-direction: column;

  .search-block {
    width: 100%;
    background-color: var(--el-color-white);

    .search {
      width: 880px;
      margin: auto;
      padding-top: 2.5rem;
      padding-bottom: 2.25rem;

      .input {
        width: 560px;
        height: 40px;

        ::v-deep(.el-input__wrapper) {
          border-radius: 9999px;
          box-shadow: unset;
          background-color: rgba(0, 10, 32, .05);
        }
      }
    }
  }

  .option-block {
    width: 100%;
    background-color: var(--el-color-white);

    .options {
      width: 880px;
      margin: auto;

      .each {
        cursor: pointer;
        height: 30px;
        color: var(--el-text-color-secondary);

        .label {
          margin-left: 5px;
        }
      }

      .select {
        color: var(--el-text-color-primary);
        border-bottom: 2px solid var(--el-text-color-primary);
      }
    }
  }

  .main-block {
    width: 100%;

    .main {
      width: 880px;
      margin: 1.5rem auto;
    }
  }
}
</style>