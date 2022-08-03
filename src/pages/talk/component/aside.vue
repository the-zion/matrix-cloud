<template>
  <el-container class="aside-container">
    <el-row class="info-area">
      <el-row class="info-block">
        <el-row justify="space-between" class="info">
          <span class="label">收藏次数</span>
          <span class="num">{{
              props.statistic.collect > 1000 ? (props.statistic.collect / 1000).toFixed(1) + "k" : props.statistic.collect
            }}</span>
        </el-row>
        <el-row justify="space-between" class="info">
          <span class="label">参与人数</span>
          <span class="num">{{
              props.statistic.comment > 1000 ? (props.statistic.comment / 1000).toFixed(1) + "k" : props.statistic.comment
            }}</span>
        </el-row>
        <el-row justify="space-between" class="info">
          <span class="label">浏览次数</span>
          <span class="num">{{
              props.statistic.view > 1000 ? (props.statistic.view / 1000).toFixed(1) + "k" : props.statistic.view
            }}</span>
        </el-row>
      </el-row>
      <el-divider></el-divider>
      <el-row class="tags-block">
        <el-row class="title">相关标签</el-row>
        <el-space class="tags" wrap>
          <el-tag v-if="props.info.tags" v-for="item in (props.info?props.info.tags.split(';'):[])" :key="item"
                  type="info" round>{{ item }}
          </el-tag>
        </el-space>
      </el-row>
    </el-row>
    <el-row class="talk-area">
      <el-space class="header">
        <el-icon :size="16">
          <svg class="symbol-icon" aria-hidden="true">
            <use xlink:href="#icon-remen"></use>
          </svg>
        </el-icon>
        <span>相关讨论</span>
      </el-space>
      <el-row class="each" v-for="item in data" :key="item.id">
        <el-popover placement="top-start" :show-arrow="false" :width="312" trigger="hover" popper-class="popover">
          <template #reference>
            <el-avatar icon="UserFilled" class="avatar" @click="goToPage('user', 1)" :size="22" :src="item.avatar"/>
          </template>
          <matrix-user-mini-card></matrix-user-mini-card>
        </el-popover>
        <span class="title">{{ item.title }}</span>
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<script setup>
import {onMounted, ref} from "vue"
import {goToPage} from "../../../utils/globalFunc";

const props = defineProps({
  info: {
    type: Object,
    default: {}
  },
  statistic: {
    type: Object,
    default: {}
  }
})

let info = ref({})
let statistic = ref({})
let data = ref([])


function init() {
  initData()
  getData()
}

function initData() {
}

function getData() {
  for (let i = 0; i <= 4; i++) {
    data.value.push({
      id: i,
      avatar: '../../src/assets/images/boy.png',
      title: "2022 力扣春招征文｜0402 腾讯 光子工作室后台开发一面"
    })
  }
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.aside-container {
  width: 100%;
  flex-direction: column;

  .info-area {
    padding: 20px 15px;
    background-color: var(--el-color-white);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 8px;
    margin-bottom: 10px;

    .info-block {
      width: 100%;

      .info {
        width: 100%;
        margin-bottom: 15px;

        .label {
          font-size: 14px;
          color: var(--el-text-color-secondary);
        }

        .num {
          background: var(--el-fill-color);
          color: var(--el-text-color-primary);
          border-radius: 3px;
          padding: 0 8px;
          line-height: 22px;
          font-size: 13px;
        }
      }

      .info:last-child {
        margin-bottom: unset;
      }
    }

    .tags-block {
      width: 100%;

      .title {
        width: 100%;
        font-size: 14px;
        color: var(--el-text-color-secondary);
        margin-bottom: 15px;
      }

      .tags {
        width: 100%;
      }
    }
  }

  .talk-area {
    padding: 20px 15px;
    background-color: var(--el-color-white);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 8px;

    .header {
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: var(--el-text-color-primary);
      margin-bottom: 10px;
    }

    .each {
      width: 100%;
      padding: 6px 0;

      .avatar {
        margin-right: 8px;
        cursor: pointer;
      }

      .title {
        width: calc(100% - 30px);
        font-size: 14px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        color: var(--el-text-color-primary);
      }
    }
  }
}
</style>