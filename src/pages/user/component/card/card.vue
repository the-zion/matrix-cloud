<template>
  <el-container class="card">
    <el-row class="block" justify="space-between">
      <el-row>
        <el-avatar shape="square" :size="80" :src="'../src/assets/images/boy.png'"/>
        <el-row class="profile" justify="space-between">
          <el-row class="info">
            <el-row class="name">{{ username }}</el-row>
            <el-row class="intro">{{ introduce }}</el-row>
          </el-row>
          <el-space>
            <el-tag
                v-for="item in tags"
                type="info"
                effect="light"
                round
            >
              {{ item.label }}
            </el-tag>
          </el-space>
        </el-row>
      </el-row>
      <el-row id="cartoon" class="cartoon"></el-row>
    </el-row>
  </el-container>
</template>
<script>
export default {
  name: "MatrixUserCard"
}
</script>

<script setup>
import {onMounted} from "vue"
import {initVariable, init} from "./controller";

let {username, introduce, tags} = initVariable()

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;

  .block {
    width: 100%;

    .profile {
      margin-left: 1.25rem;
      flex-direction: column;

      .info {
        flex-direction: column;

        .name {
          font-weight: 600;
          color: var(--el-text-color-primary);
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .intro {
          color: var(--el-text-color-secondary);
          font-size: 13px;
        }
      }
    }

    .cartoon {
      height: 100%;
      width: 600px;
    }
  }
}
</style>