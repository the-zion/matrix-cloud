<template>
  <el-row class="list">
    <el-empty v-show="data.length === 0" class="empty" description="未找到相关内容"/>
    <el-space class="data" fill>
      <el-row v-for="item in data" class="each">
        <matrix-blog :data="item"></matrix-blog>
      </el-row>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "MatrixList"
}
</script>

<script setup>
import {defineProps} from "vue"
import {controller} from "./controller";

const props = defineProps({
  mode: Number,
})
let {initVariable, init} = controller()
let {data} = initVariable()
init(props)

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
}
</style>