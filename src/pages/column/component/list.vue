<template>
  <el-row class="column-list" id="column-list">
    <el-empty v-show="data.length === 0" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <el-space class="data" fill :size="props.gap || 0">
      <el-row v-for="item in data" class="each" :class="props.shape" :key="item.id"
              @click="goToPage('column', item.id)">
        <el-row class="column-card" align="middle">
          <el-image class="image" fit="cover" :src="item.image" lazy></el-image>
          <el-row class="container" align="top">
            <el-space class="main">
              <el-row class="title">{{ item.title }}</el-row>
              <el-space class="info">
                <el-tag round v-show="item.tags" type="info" v-for="tag in item.tags.split(';')" :key="tag">{{
                    tag
                  }}
                </el-tag>
              </el-space>
            </el-space>
            <el-row class="content">{{ item.content }}</el-row>
            <el-space class="foot">
              <el-space :size="3">
                <el-icon class="iconfont icon-like icon"></el-icon>
                <span class="num">{{
                    item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree
                  }}</span>
              </el-space>
              <el-space :size="3">
                <el-icon class="iconfont icon-eye icon"></el-icon>
                <span class="num">{{
                    item.view > 1000 ? (item.view / 1000).toFixed(1) + "k" : item.view
                  }}</span>
              </el-space>
              <el-space :size="3">
                <el-icon class="iconfont icon-message icon"></el-icon>
                <span class="num">{{
                    item.comment > 1000 ? (item.comment / 1000).toFixed(1) + "k" : item.comment
                  }}</span>
              </el-space>
              <el-space :size="3">
                <el-icon class="iconfont icon-star icon"></el-icon>
                <span class="num">{{
                    item.collect > 1000 ? (item.collect / 1000).toFixed(1) + "k" : item.collect
                  }}</span>
              </el-space>
            </el-space>
          </el-row>
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
  name: "MatrixColumnList"
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
      title: "数组和字符串",
      avatar: "../../src/assets/images/boy.png",
      image: "../../src/assets/images/column.png",
      name: "刘小圆sama",
      time: "2022-05-06",
      content: "简介：数组是数据结构中的基本模块之一。因为字符串是由字符数组形成的，所以二者是相似的。大多数面试问题都属于这个范畴。",
      tags: "go;云原生",
      agree: 10000,
      view: 12000,
      comment: 1100,
      collect: 500
    })
  }
  console.log(data.value)
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
  scrollTo("column-list")
})

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.column-list {
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

      .column-card {
        width: 100%;
        padding: 16px;

        .image {
          height: 120px;
          width: 90px;
          border-radius: 6px;
          margin-right: 16px;
          box-shadow: var(--el-box-shadow-lighter);
        }

        .container {
          width: 70%;
          height: 100%;
        }

        .main {
          width: 100%;
          height: fit-content;

          .title {
            font-size: 16px;
            line-height: 24px;
            font-weight: 500;
            color: var(--el-text-color-secondary)
          }

          .title:hover {
            color: var(--el-color-primary);
          }

          .info {
            width: 100%;
          }
        }

        .content {
          margin-top: 8px;
          width: 360px;
          height: 40px;
          font-size: 12px;
          line-height: 20px;
          color: var(--el-text-color-secondary);
          word-break: break-word;
          align-self: stretch;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .foot {
          width: 100%;
          margin-top: 8px;

          .icon {
            font-size: 18px;
            color: var(--el-text-color-secondary)
          }

          .num {
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