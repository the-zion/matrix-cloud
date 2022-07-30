<template>
  <el-container class="aside-container">
    <el-row class="info-block">
      <el-space class="tags" wrap>
        <span class="label">标签</span>
        <el-tag class="tag " round type="info" v-for="item in props.data.tags" :key="item">{{ item }}</el-tag>
      </el-space>
      <el-row class="info" justify="space-between">
        <el-row class="author-block">
          <el-row class="author">
            <el-avatar class="avatar" icon="UserFilled" :size="40" :src="data.avatar" @click="goToPage('user', data.id)"></el-avatar>
            <el-row class="username">
              <span class="nickname">{{ data.nickname }}</span>
              <span class="name">{{ data.name }}</span>
            </el-row>
          </el-row>
          <el-button class="button" icon="Plus">关注</el-button>
        </el-row>
        <span class="introduce">{{ data.introduce }}</span>
      </el-row>
    </el-row>
    <el-row class="column-block">
      <el-row class="header">相关专栏</el-row>
      <el-row class="column">
        <el-row v-for="item in columns" class="each" @click="goToPage('column', item.id)">
          <el-image class="cover" :src="item.cover"></el-image>
          <el-row class="info">
            <span class="title">{{ item.title }}</span>
            <span class="name">{{ item.name }}</span>
          </el-row>
        </el-row>
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
  data: {
    type: Object,
    default: {}
  }
})

let data = ref({
  id: 1,
  avatar: "../../src/assets/images/boy.png",
  name: "neo",
  nickname: "刘小圆sama",
  introduce: "擅长体系化梳理知识点与题目，通过一题多解和多题一解两条路径，帮助读者快速找到所需的题目和知识点，并系统学习。"
})

let columns = ref([])

function init() {
  getData()
}

function getData() {
  for (let i = 0; i <= 2; i++) {
    columns.value.push({
      id: i,
      cover: "../../src/assets/images/column.png",
      title: "深入浅出设计模式",
      name: "刘小圆sama"
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

  .info-block {
    width: 100%;
    margin-bottom: 26px;

    .tags {
      width: 100%;
      margin-bottom: 26px !important;

      .label {
        font-size: 14px;
        margin-right: 10px;
      }

      .tag {
        background-color: rgba(0, 10, 32, 0.05);
        border: unset;
        color: var(--el-text-color-regular);
      }
    }

    .info {
      width: 100%;

      .author-block {
        width: 100%;

        .author {
          width: calc(100% - 80px);

          .avatar {
            margin-right: 12px;
            cursor: pointer;
          }

          .username {
            width: calc(100% - 52px);

            .nickname {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: var(--el-text-color-primary);
              font-weight: 500;
              font-size: 14px;
            }

            .name {
              width: 100%;
              font-size: 12px;
              line-height: 20px;
              color: var(--el-text-color-regular);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .button {
          font-weight: 400;
        }
      }

      .introduce {
        width: 100%;
        margin-top: 12px;
        font-size: 14px;
        color: var(--el-text-color-regular);
        line-height: 24px;
        -webkit-line-clamp: 3;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }

  .column-block {
    width: 100%;

    .header {
      width: 100%;
      font-size: 18px;
      line-height: 28px;
      color: var(--el-text-color-primary);
      padding-bottom: 17px;
      border-bottom: 1px solid var(--el-border-color);
    }

    .column {
      width: 100%;

      .each {
        width: 100%;
        margin-top: 16px;
        cursor: pointer;

        .cover {
          width: 90px;
          height: 120px;
          border-radius: 5px;
        }

        .info {
          width: calc(100% - 106px);
          margin-left: 16px;
          flex-direction: column;

          .title {
            font-size: 14px;
            width: 100%;
            line-height: 20px;
            margin: 0 0 8px;
            color: var(--el-text-color-primary);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 500;
          }

          .name {
            height: fit-content;
            width: 100%;
            -webkit-line-clamp: 2;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            font-size: 12px;
            line-height: 20px;
            color: var(--el-text-color-regular);
          }
        }
      }
    }
  }
}
</style>