<template>
  <el-row class="user-list" id="user-list">
    <el-empty v-show="data.length === 0" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-space class="data" fill :size="props.gap || 0">
      <el-row v-for="item in data" class="each" :class="props.shape" :key="item.id"
              @click="goToPage('user', item.id)">
        <el-row class="user-card" align="middle">
          <el-row class="container" :class="{'full':!item.image}">
            <el-space class="main" size="large">
              <el-avatar class="avatar" :size="50" :src="item.avatar"/>
              <el-space direction="vertical" alignment="flex-start" :size="1">
                <el-row class="nickname">{{ item.nickname }}</el-row>
                <el-row class="name">{{ item.name }}</el-row>
              </el-space>
            </el-space>
            <el-space class="foot">
              <el-space :size="3">
                <span class="word">被阅读</span>
                <span class="num">{{ item.view > 1000 ? (item.view / 1000).toFixed(1) + "k" : item.view }}</span>
              </el-space>
              <el-space :size="3">
                <span class="word">被赞同</span>
                <span class="num">{{ item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree }}</span>
              </el-space>
              <el-space :size="3">
                <span class="word">被关注</span>
                <span class="num">{{
                    item.followed > 1000 ? (item.followed / 1000).toFixed(1) + "k" : item.followed
                  }}</span>
              </el-space>
              <el-space :size="3">
                <span class="word">关注</span>
                <span class="num">{{
                    item.follow > 1000 ? (item.follow / 1000).toFixed(1) + "k" : item.follow
                  }}</span>
              </el-space>
            </el-space>
          </el-row>
        </el-row>
        <el-space class="operation" size="large">
          <el-button icon="Plus" type="primary">关注</el-button>
        </el-space>
      </el-row>
    </el-space>
    <el-row class="foot" justify="center" v-show="data.length !== 0">
      <el-pagination
          :background="props.pageBackground"
          v-model:current-page="currentPage"
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixUserList"
}
</script>

<script setup>
import {ref, watch, onMounted} from "vue";
import {goToPage} from "../../../utils/globalFunc";
import {confirm} from "../../../utils/globalFunc";
import {success} from "../../../utils/message";
import {scrollTo} from "../../../utils/scroll";

const emits = defineEmits(["current-page"])
const props = defineProps({
  gap: Number,
  shape: String,
  operation: {
    type: Array,
    default: []
  },
  "page-background": Boolean,
})

let data = ref([])
let currentPage = ref(1)

function init() {
  initData()
  getData()
}

function initData() {
}

function getData() {
  for (let i = 0; i <= 9; i++) {
    data.value.push({
      id: i,
      avatar: "../../src/assets/images/boy.png",
      nickname: "刘小圆sama",
      name: "neo",
      agree: 10000,
      view: 12000,
      followed: 1100,
      follow: 500
    })
  }
}


defineExpose({
  getData
})

watch(currentPage, () => {
  scrollTo("user-list")
})

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.user-list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .data {
    width: 100%;

    .each {
      position: relative;
      border-bottom: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      cursor: pointer;

      .user-card {
        width: 100%;
        padding: 16px;

        .container {
          width: calc(100% - 216px);

          .main {
            width: 100%;

            ::v-deep(.el-avatar--circle) {
              border: 1px solid var(--el-border-color-lighter);
            }

            .avatar {
              border: 1px solid var(--el-border-color-lighter);
            }

            .nickname {
              font-size: 16px;
              color: var(--el-text-color-primary)
            }

            .name {
              font-size: 14px;
              color: var(--el-text-color-secondary)
            }
          }

          .foot {
            width: 100%;
            margin-top: 20px;

            .word {
              font-size: 13px;
              color: var(--el-text-color-secondary)
            }

            .num {
              font-size: 14px;
              color: var(--el-text-color-regular)
            }
          }
        }

        .full {
          width: 100%;
        }
      }

      .operation {
        position: absolute;
        top: 16px;
        right: 0;

      }
    }

    .card {
      border-radius: 8px;
      border-bottom: unset;
      box-shadow: 0 1px 2px rgba(0, 10, 32, 0.1), 0 2px 8px rgba(0, 10, 32, 0.05);
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>