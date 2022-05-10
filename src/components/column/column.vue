<template>
  <el-row class="column" align="middle">
    <el-image class="image" fit="cover" :src="props.data.image"></el-image>
    <el-row class="container">
      <el-space class="main" fill>
        <el-space class="head">
          <el-avatar class="avatar" :size="24" :src="props.data.avatar"/>
          <el-row class="title">{{ props.data.title }}</el-row>
        </el-space>
        <el-space class="info">
          <el-tag v-show="props.data.tags" type="info" v-for="tag in props.data.tags.split(';')">{{ tag }}</el-tag>
        </el-space>
        <span class="content">{{ props.data.content }}</span>
      </el-space>
      <el-space class="foot">
        <el-space :size="3">
          <el-icon class="iconfont icon-like icon"></el-icon>
          <span class="num">{{ props.data.agree > 1000 ? (props.data.agree / 1000).toFixed(1) + "k" : props.data.agree }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-eye icon"></el-icon>
          <span class="num">{{ props.data.view > 1000 ? (props.data.view / 1000).toFixed(1) + "k" : props.data.view }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-message icon"></el-icon>
          <span class="num">{{ props.data.comment > 1000 ? (props.data.comment / 1000).toFixed(1) + "k" : props.data.comment }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-star icon"></el-icon>
          <span class="num">{{ props.data.collect > 1000 ? (props.data.collect / 1000).toFixed(1) + "k" : props.data.collect }}</span>
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
import {ref} from "vue";

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