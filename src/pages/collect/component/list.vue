<template>
  <el-row class="blog-list" id="blog-list">
    <el-empty v-show="data.length === 0" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-space class="data" fill :size="props.gap || 0">
      <el-row v-for="item in data" class="each" :class="props.shape" :key="item.id"
              @click="goToPage('blog', item.id)">
        <el-row class="blog-card">
          <el-space class="main" fill>
            <el-space class="head">
              <el-row class="title">{{ item.title }}</el-row>
            </el-space>
            <el-space class="body">
              <span class="content">{{ item.introduce }}</span>
            </el-space>
          </el-space>
          <el-space class="foot">
            <el-space :size="3">
              <span class="label">文章:</span>
              <span class="num">{{
                  item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree
                }}</span>
            </el-space>
          </el-space>
        </el-row>
        <el-space class="operation" size="large">
          <div v-for="op in props.operation" :key="op">
            <el-icon v-show="op === 'delete'" class="icon" @click="doDelete(item)">
              <delete/>
            </el-icon>
            <el-icon v-show="op === 'star'" class="iconfont icon-star-fill star" @click="doCollect(item)"></el-icon>
          </div>
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
  name: "MatrixCollectList"
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
  let d = []
  for (let i = 0; i <= 9; i++) {
    d.push({
      id: i,
      title: "Test" + i,
      introduce: "海纳百川，有容乃大",
      agree: 10000,
    })
  }
  data.value = d
}

function doDelete(item) {
  confirm("删除", "确定删除" + "：\"" + item.title + "\" 吗？").then(function () {
    success("删除成功")
  }).catch(() => {
  })
}

function doCollect(item) {
  confirm("取消收藏", "确定取消收藏" + "：\"" + item.title + "\" 吗？").then(function () {
    success("取消成功")
  }).catch(() => {
  })
}

defineExpose({
  getData
})

watch(currentPage, () => {
  scrollTo("blog-list")
})

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.blog-list {
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

      .blog-card {
        width: 100%;
        padding: 16px;

        .main {
          width: 100%;

          .head {
            width: 100%;

            ::v-deep(.el-avatar--circle) {
              border: 1px solid var(--el-border-color-lighter);
            }

            .avatar {
              border: 1px solid var(--el-border-color-lighter);
            }

            .title {
              font-size: 16px;
              font-weight: 500;
              color: var(--el-text-color-primary)
            }

            .title:hover {
              color: var(--el-color-primary);
            }
          }

          .info {
            width: 100%;

            .name {
              font-size: 14px;
              color: var(--el-text-color-secondary)
            }

            .time {
              font-size: 14px;
              color: var(--el-text-color-regular)
            }
          }

          .body {
            width: 100%;
            max-height: 70px;

            .image {
              height: 100%;
              width: 120px;
              border-radius: 6px;
            }

            .content {
              font-size: 14px;
              line-height: 24px;
              color: var(--el-text-color-regular);
              word-break: break-word;
              align-self: stretch;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            }
          }
        }

        .foot {
          width: 100%;
          margin-top: 1rem;

          .icon {
            font-size: 18px;
            color: var(--el-text-color-secondary)
          }

          .label, .num {
            font-size: 14px;
            color: var(--el-text-color-secondary)
          }
        }
      }

      .operation {
        position: absolute;
        top: 16px;
        right: 0;

        .icon {
          color: var(--el-text-color-placeholder);
          font-size: 20px;
          cursor: pointer;
        }

        .star {
          color: #ffa116;
          font-size: 20px;
          cursor: pointer;
        }

        .icon:hover {
          color: var(--el-color-primary);
        }
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