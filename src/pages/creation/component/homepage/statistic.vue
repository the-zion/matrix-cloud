<template>
  <el-container class="statistic-container">
    <el-row class="title">数据总览</el-row>
    <el-row class="data-block">
      <el-row class="block" v-for="item in dataMeta" justify="center">
        <el-row class="box">
          <el-row class="label">{{ item.label }}</el-row>
          <el-row class="number">
            {{ data[item.key] > 1000 ? (data[item.key] / 1000).toFixed(1) + "k" : data[item.key] || 0 }}
          </el-row>
        </el-row>
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Statistic"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})
const dataMeta = [
  {
    key: "article",
    label: "博客文章"
  }, {
    key: "column",
    label: "专栏分享"
  }, {
    key: "talk",
    label: "讨论发起",
  }, {
    key: "view",
    label: "总浏览量",
  },
  {
    key: "agree",
    label: "总点赞数",
  }, {
    key: "collect",
    label: "总收藏数",
  }
]

let data = ref({})

function init() {
  initData()
}

function initData() {
  data.value = props.data
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.statistic-container {
  width: 100%;
  flex-direction: column;

  .title {
    width: 100%;
    height: fit-content;
    margin: 0 0 20px;
    font-weight: 500;
    line-height: 31px;
    font-size: 20px;
  }

  .data-block {
    width: 100%;

    .block {
      box-sizing: border-box;
      margin: 0;
      min-width: 0;
      width: 33.3%;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 25px;

      .box {
        width: 95%;
        box-sizing: border-box;
        margin: 0;
        min-width: 0;
        height: 136px;
        flex-direction: column;
        padding-left: 20px;
        justify-content: center;
        display: flex;
        border-radius: 12px;
        white-space: nowrap;
        background: rgba(133, 144, 166, 0.05);

        .label {
          box-sizing: border-box;
          margin: 0;
          min-width: 0;
          color: var(--el-text-color-secondary);
          font-size: 15px;
          line-height: 22px;
          display: flex;
          align-items: center;
        }

        .number {
          box-sizing: border-box;
          min-width: 0;
          margin-top: 6px;
          margin-bottom: 24px;
          color: var(--el-text-color-primary);
          font-size: 32px;
          line-height: 38px;
        }
      }
    }
  }
}
</style>