<template>
  <el-row class="column" align="middle">
    <el-image class="image" fit="cover" :src="props.data.image" lazy></el-image>
    <el-row class="container" align="top">
      <el-space class="main">
        <el-row class="title">{{ props.data.title }}</el-row>
        <el-space class="info">
          <el-tag round v-show="props.data.tags" type="info" v-for="tag in props.data.tags.split(';')">{{ tag }}</el-tag>
        </el-space>
      </el-space>
      <el-row class="content">{{ props.data.content }}</el-row>
      <el-space class="foot">
        <el-space :size="3">
          <el-icon class="iconfont icon-like icon"></el-icon>
          <span class="num">{{
              props.data.agree > 1000 ? (props.data.agree / 1000).toFixed(1) + "k" : props.data.agree
            }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-eye icon"></el-icon>
          <span class="num">{{
              props.data.view > 1000 ? (props.data.view / 1000).toFixed(1) + "k" : props.data.view
            }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-message icon"></el-icon>
          <span class="num">{{
              props.data.comment > 1000 ? (props.data.comment / 1000).toFixed(1) + "k" : props.data.comment
            }}</span>
        </el-space>
        <el-space :size="3">
          <el-icon class="iconfont icon-star icon"></el-icon>
          <span class="num">{{
              props.data.collect > 1000 ? (props.data.collect / 1000).toFixed(1) + "k" : props.data.collect
            }}</span>
        </el-space>
      </el-space>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixColumnCard"
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
    height: 120px;
    width: 90px;
    border-radius: 6px;
    margin-right: 16px;
    box-shadow: var(--el-box-shadow-light);
  }

  .container {
    width: 70%;
    height: 100%;
  }

  .main {
    width: 100%;
    height: fit-content;

    .title {
      font-size: 16px;
      line-height: 24px;
      font-weight: 500;
      color: var(--el-text-color-secondary)
    }

    .title:hover {
      color: var(--el-color-primary);
    }

    .info {
      width: 100%;
    }
  }

  .content {
    margin-top: 8px;
    width: 360px;
    height: 40px;
    font-size: 12px;
    line-height: 20px;
    color: var(--el-text-color-secondary);
    word-break: break-word;
    align-self: stretch;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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