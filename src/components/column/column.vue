<template>
  <el-row class="column" align="middle">
    <el-image class="image" fit="cover" :src="image"></el-image>
    <el-row class="container">
      <el-space class="main" fill>
        <el-space class="head">
          <el-avatar class="avatar" :size="24" :src="avatar"/>
          <el-row class="title">{{ title }}</el-row>
        </el-space>
        <el-space class="info">
          <el-tag v-show="tags" type="info" v-for="tag in tags.split(';')">{{ tag }}</el-tag>
        </el-space>
        <span class="content">{{ content }}</span>
      </el-space>
      <el-space class="foot">
        <el-space :size="3">
          <el-icon class="iconfont icon-like icon"></el-icon>
          <span class="num">{{ agree }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-eye icon"></el-icon>
          <span class="num">{{ view }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-message icon"></el-icon>
          <span class="num">{{ comment }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-star icon"></el-icon>
          <span class="num">{{ collect }}</span>
        </el-space>
      </el-space>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixColumn"
}
</script>

<script setup>
import {defineProps} from "vue"
import {controller} from "./controller";

const props = defineProps({
  data: Object,
})
const {initVariable, init} = controller()
let {avatar, title, name, time, tags, image, content, agree, view, comment, collect} = initVariable()
init(props)


</script>

<style scoped lang="scss">
.column {
  width: 100%;
  padding: 16px;

  .image {
    height: 95%;
    width: 200px;
    border-radius: 6px;
    margin-right: 16px;

  }

  .container {
    width: calc(100% - 216px);
  }

  .main {
    width: 100%;

    .head {
      width: 100%;

      ::v-deep(.el-avatar--circle) {
        border: 1px solid var(--el-border-color-lighter);
      }

      .avatar {
        border: 1px solid var(--el-border-color-lighter);
      }

      .title {
        font-size: 16px;
        font-weight: 500;
        color: var(--el-text-color-primary)
      }
    }

    .info {
      width: 100%;
    }

    .content {
      width: 100%;
      height: 45px;
      font-size: 14px;
      line-height: 24px;
      color: var(--el-text-color-regular);
      word-break: break-word;
      align-self: stretch;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }

  .foot {
    width: 100%;
    margin-top: 8px;

    .icon {
      font-size: 18px;
      color: var(--el-text-color-secondary)
    }

    .num {
      font-size: 14px;
      color: var(--el-text-color-secondary)
    }
  }
}
</style>