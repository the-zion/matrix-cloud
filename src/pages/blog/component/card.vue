<template>
  <el-row class="blog">
    <el-space class="main" fill>
      <el-space class="head">
        <el-popover placement="top-start" :show-arrow="false" :width="312" trigger="hover" popper-class="popover">
          <template #reference>
            <el-avatar @click="GotoUserPage(1)" class="avatar" :size="24" :src="props.data.avatar"/>
          </template>
          <matrix-user-mini-card></matrix-user-mini-card>
        </el-popover>
        <el-row class="title">{{ props.data.title }}</el-row>
      </el-space>
      <el-space class="info">
        <el-row class="name">{{ props.data.name }}</el-row>
        <el-row class="time">{{ "发布于 " + props.data.time }}</el-row>
        <el-tag round v-show="props.data.tags" type="info" v-for="tag in props.data.tags.split(';')">{{ tag }}</el-tag>
      </el-space>
      <el-space class="body">
        <el-image v-show="props.data.image" class="image" fit="cover" :src="props.data.image" lazy></el-image>
        <span class="content">{{ props.data.content }}</span>
      </el-space>
    </el-space>
    <el-space class="foot">
      <el-space :size="3">
        <el-icon class="iconfont icon-like icon"></el-icon>
        <span class="num">{{
            props.data.agree > 1000 ? (props.data.agree / 1000).toFixed(1) + "k" : props.data.agree
          }}</span>
      </el-space>
      <el-space :size="3">
        <el-icon class="iconfont icon-eye icon"></el-icon>
        <span
            class="num">{{
            props.data.view > 1000 ? (props.data.view / 1000).toFixed(1) + "k" : props.data.view
          }}</span>
      </el-space>
      <el-space :size="3">
        <el-icon class="iconfont icon-message icon"></el-icon>
        <span
            class="num">{{
            props.data.comment > 1000 ? (props.data.comment / 1000).toFixed(1) + "k" : props.data.comment
          }}</span>
      </el-space>
      <el-space :size="3">
        <el-icon class="iconfont icon-star icon"></el-icon>
        <span
            class="num">{{
            props.data.collect > 1000 ? (props.data.collect / 1000).toFixed(1) + "k" : props.data.collect
          }}</span>
      </el-space>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "MatrixBlogCard"
}
</script>


<script setup>
import {ref} from "vue";

import {GotoUserPage} from "../../../utils/globalFunc";

const props = defineProps({
  data: Object,
})

let data = ref({
  avatar: "",
  title: "",
  name: "",
  time: "",
  tags: "",
  image: "",
  content: "",
  agree: 0,
  view: 0,
  comment: 0,
  collect: 0
})

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

      .title:hover {
        color: var(--el-color-primary);
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