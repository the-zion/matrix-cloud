<template>
  <el-row class="blog">
    <el-space class="main" fill>
      <el-space class="head">
        <el-avatar class="avatar" :size="24" :src="avatar"/>
        <el-row class="title">{{ title }}</el-row>
      </el-space>
      <el-space class="info">
        <el-row class="name">{{ name }}</el-row>
        <el-row class="time">{{ "发布于 " + time }}</el-row>
      </el-space>
      <el-space class="body">
        <el-image class="image" fit="cover" :src="image"></el-image>
        <span class="content">{{ content }}</span>
      </el-space>
    </el-space>
    <el-space class="foot">
      <el-space :size="3">
        <el-icon class="iconfont icon-like icon"></el-icon>
        <span class="num">{{agree}}</span>
      </el-space>
      <el-space :size="3">
        <el-icon class="iconfont icon-eye icon"></el-icon>
        <span class="num">{{view}}</span>
      </el-space>
      <el-space :size="3">
        <el-icon class="iconfont icon-message icon"></el-icon>
        <span class="num">{{comment}}</span>
      </el-space>
      <el-space :size="3">
        <el-icon class="iconfont icon-star icon"></el-icon>
        <span class="num">{{collect}}</span>
      </el-space>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "MatrixBlog"
}
</script>

<script setup>
import {defineProps} from "vue"
import {controller} from "./controller";

const props = defineProps({
  data: Object,
})
let {initVariable,init} = controller()
let {avatar, title, name, time, image, content, agree, view, comment, collect} = initVariable()
init(props)

</script>

<style scoped lang="scss">
.blog {
  width: 100%;
  padding: 16px;

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

      .name {
        font-size: 14px;
        color: var(--el-text-color-secondary)
      }

      .time {
        font-size: 14px;
        color: var(--el-text-color-regular)
      }
    }

    .body {
      width: 100%;
      height: 70px;

      .image {
        height: 100%;
        width: 120px;
        border-radius: 6px;
      }

      .content {
        font-size: 14px;
        line-height: 24px;
        color: var(--el-text-color-regular);
        word-break: break-word;
        align-self: stretch;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
    }
  }

  .foot {
    width: 100%;
    margin-top: 1rem;

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