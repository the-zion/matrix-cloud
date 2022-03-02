<template>
  <el-card :body-style="{ padding: '10px' }" class="card">
    <img
        src="../../../../src/assets/images/picture1.jpg"
        class="image"
    />
    <el-row class="body">
      <el-row class="title">{{ props.data.title }}</el-row>
      <el-row class="bottom">
        <el-avatar :size="30" :src="props.data.image"></el-avatar>
        <el-row align="middle" class="name">{{ props.data.author }}</el-row>
        <el-row v-if="props.option === 'date'" class="time" justify="end">{{ props.data.date }}</el-row>
        <el-row v-if="props.option === 'tag'">
          <el-tag
              v-for="tag in props.data.tags"
              :key="tag.label"
              class="tag"
              :type="tag.label === '专栏' && 'danger'"
              effect="dark"
          >
            {{ tag.label }}
          </el-tag>
        </el-row>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "CubeColumnCard"
}
</script>
<script setup>
import {defineProps} from "vue";

const props = defineProps({
  data: Object,
  option: String
})
</script>

<style scoped lang="scss">
.card {
  width: 250px;
  height: 250px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 20px;
  box-shadow: unset !important;
  border: 1px solid var(--el-border-color-base);

  .image {
    width: 230px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }

  .body {
    padding: 14px;
    height: 100%;

    .title {
      width: 100%;
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .name, .time {
        font-size: 13px;
        color: #999;
        margin: 0 5px;
        flex-grow: 1;
      }

      .tag {
        margin: 0 3px;
      }
    }
  }
}

.card:hover {
  cursor: pointer;
  box-shadow: var(--el-box-shadow-light) !important;
}
</style>