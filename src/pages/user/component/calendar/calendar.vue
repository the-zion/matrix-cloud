<template>
  <el-container class="calendar">
    <el-row class="block">
      <el-row class="title" justify="space-between">
        <el-space alignment="center" class="static">
          <span class="word">{{ time }}</span>
          <span class="word">共发表博客</span>
          <span class="num">{{ nums }}</span>
          <span class="word">篇</span>
        </el-space>
        <el-select v-model="time" class="select" placeholder="选择年份">
          <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-row>
      <el-row class="body" id="calendar"></el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "MatrixUserCalendar"
}
</script>

<script setup>
import {onMounted} from "vue"
import {controller} from "./controller";

const {initVariable, init} = controller()
let {time, nums, options} = initVariable()

onMounted(() => {
  init()
})


</script>
<style scoped lang="scss">
.calendar {
  min-height: 100px;
  padding: 1rem;

  .block {
    width: 100%;

    .title {
      width: 100%;
      height: fit-content;

      .static {
        height: fit-content;

        .word {
          font-size: 1rem;
          line-height: 1.5rem;
          color: var(--el-text-color-regular);
        }

        .num {
          font-size: 1.25rem;
          line-height: 1.75rem;
          font-weight: 500;
        }
      }

      .select {
        width: 100px;
      }
    }

    .body {
      width: 100%;
      height: 150px;
      margin-top: 8px;
    }
  }
}
</style>