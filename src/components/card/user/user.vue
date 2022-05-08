<template>
  <el-card :body-style="{ padding: 'unset',height: '100%' }" class="card">
    <el-row class="body" align="middle">
      <el-avatar :size="70" :src="props.data.image"></el-avatar>
      <el-space class="right-area" direction="vertical" alignment="start">
        <el-row class="name">{{ props.data.name }}</el-row>
        <el-row class="introduce">{{ "个人简介：" + props.data.introduce }}</el-row>
      </el-space>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "CubeUserCard"
}
</script>
<script setup>

const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  option: String
})
</script>
<style scoped lang="scss">
.card {
  width: 320px;
  height: 150px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-right: 30px;
  box-shadow: unset !important;
  border: 1px solid var(--el-border-color-base);

  .body {
    padding: 14px 25px;
    height: 100%;

    .title {
      width: 100%;
    }

    .right-area {
      margin-top: 13px;
      height: 70px;

      .name {
        margin-left: 8px;
        margin-top: 4px;
        font-size: 18px;
      }

      .introduce {
        font-size: 12px;
        color: #999;
        margin-left: 8px;
        width: 190px;
      }
    }
  }
}

.card:hover {
  cursor: pointer;
  box-shadow: var(--el-box-shadow-light) !important;
}
</style>