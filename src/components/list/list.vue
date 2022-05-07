<template>
  <el-row class="list">
    <el-empty v-show="data.length === 0" class="empty" description="未找到相关内容"/>
    <el-space class="data" fill>
      <el-row v-for="item in data" class="each">
        <matrix-blog v-show="props.mode === 1" :data="item"></matrix-blog>
        <matrix-column v-show="props.mode === 2" :data="item"></matrix-column>
        <matrix-talk v-show="props.mode === 3" :data="item"></matrix-talk>
      </el-row>
    </el-space>
    <el-row class="foot" justify="center">
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixList"
}
</script>

<script setup>
import {defineProps, defineEmits, onMounted} from "vue"
import {controller} from "./controller";

const emits = defineEmits(["current-page"])
const props = defineProps({
  mode: Number,
})
const {initVariable, init} = controller()
let {data, currentPage} = initVariable()

onMounted(() => {
  init(props, emits)
})
</script>

<style scoped lang="scss">
.list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .data {
    width: 100%;
    margin-top: 1rem;

    .each {
      border-radius: 8px;
      border: 1px solid var(--el-border-color);
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>