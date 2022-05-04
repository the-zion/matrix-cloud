<template>
  <el-container class="card">
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
  </el-container>
</template>
<script>
export default {
  name: "CubeUserCard"
}
</script>

<script setup>
import {ref} from "vue"

let username = ref("刘小圆sama")
let introduce = ref("海纳百川，有容乃大")
let tags = ref([
  {
    "key": 1,
    "label": "go"
  },
  {
    "key": 2,
    "label": "IT互联网"
  }
])
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;

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
}
</style>