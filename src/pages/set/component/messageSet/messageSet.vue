<template>
  <el-row class="title">消息通知</el-row>
  <el-space fill class="body">
    <el-space fill class="block">
      <el-row justify="space-between">
        <el-col :span="4" class="word">用户消息</el-col>
        <el-col :span="2" @click="passWordModify">
          <el-switch v-model="userMessageSwitch"/>
        </el-col>
      </el-row>
      <el-row class="word color">其他用户的消息将以站内信的形式通知</el-row>
    </el-space>
    <el-space fill class="block">
      <el-row justify="space-between">
        <el-col :span="4" class="word">系统消息</el-col>
        <el-col :span="2" @click="phoneModify">
          <el-switch v-model="systemMessageSwitch"/>
        </el-col>
      </el-row>
      <el-row class="word color">系统消息将以站内信的形式通知</el-row>
    </el-space>
  </el-space>
</template>

<script>
export default {
  name: "CubeMessageSet"
}
</script>
<script setup>
import {ref} from "vue"

const userMessageSwitch = ref(true)
const systemMessageSwitch = ref(true)
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  padding-bottom: 20px;
}

.body {
  width: 100%;

  .block {
    padding: 14px 0;
    width: 100%;
    border-bottom: 1px solid var(--el-border-color-base);

    .word {
      font-size: 14px;
    }

    .color {
      color: var(--el-text-color-secondary)
    }

    .edit {
      cursor: pointer;
      color: var(--el-color-primary)
    }
  }
}
</style>