<template>
  <el-row class="draft">
    <el-space v-for="item in draft" class="each" :size="15">
      <el-image :src="item.image" v-show="item.image" class="image" fit="cover"></el-image>
      <el-space fill>
        <span class="title">{{ item.title || "暂无标题" }}</span>
        <span class="time">{{ "最近编辑于 " + item.time }}</span>
      </el-space>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "MatrixDraft"
}
</script>

<script setup>
import {ref} from "vue"

let draft = ref([{
  image: "../../src/assets/images/column.png",
  title: "",
  time: "2022-05-19"
}])
</script>

<style scoped lang="scss">
.draft {
  width: 100%;

  .each:hover{
    background-color: var(--el-fill-color-light);
  }

  .each {
    padding: 10px 15px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    cursor: pointer;

    .image {
      width: 70px;
      height: 50px;
      border-radius: 3px;
    }

    .title {
      font-size: 14px;
      line-height: 22px;
      color: var(--el-text-color-primary);
    }

    .time{
      font-size: 12px;
      line-height: 16px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>