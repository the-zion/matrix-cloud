<template>
  <el-row class="search-list" id="search-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" image="../../src/assets/images/no_data.svg"
    />
    <column-create v-model:visible="visible" v-bind:mode="'edit'" :id="columnId"></column-create>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
    <el-space class="data" fill :size="0">
      <el-row v-for="item in data" class="each" :key="item.id"
              @click="goToPage('column', {id:item.id})">
        <el-row class="column-card" align="top">
          <el-image class="image" fit="cover" :src="item.cover" lazy></el-image>
          <el-row class="container" align="top">
            <el-space class="main">
              <el-row class="title" v-html="item.name"></el-row>
              <el-space class="info">
                <el-tag round v-show="item.tags" :type="tags.includes(tag)?'primary':'info'"
                        :effect="tags.includes(tag) && 'dark'"
                        v-for="tag in (item.tags?item.tags.split(';'):[])" :key="tag">{{
                    tag
                  }}
                </el-tag>
              </el-space>
            </el-space>
            <el-row class="content" v-html="item.introduce"></el-row>
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
                <el-icon class="iconfont icon-star icon"></el-icon>
                <span class="num">{{
                    item.collect > 1000 ? (item.collect / 1000).toFixed(1) + "k" : item.collect
                  }}</span>
              </el-space>
            </el-space>
          </el-row>
        </el-row>
      </el-row>
    </el-space>
    <el-row class="foot" justify="center" v-if="data.length !== 0 || currentPage > 1">
      <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next"
          :total="pageTotal"
      />
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "ColumnSearchList"
}
</script>

<script setup>
import {onMounted, ref, watch} from "vue"
import {goToPage} from "../../../utils/globalFunc";
import {baseMainStore, userMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {get} from "../../../utils/axios";
import {scrollTo} from "../../../utils/scroll";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {avatar, article} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  search: String,
  time: String,
  tags: {
    type: Array,
    default: [],
  }
})

let data = ref([])
let list = ref([])
let tags = ref([])
let loading = ref(false)
let currentPage = ref(1)
let pageTotal = ref(1)
let search = ""
let time = "new"
let request = null

function init() {
  initData()
  getData()
}

function initData() {
  search = props.search
  time = props.time
  tags.value = props.tags
}

function getData() {
  data.value = []
  list.value = []
  loading.value = true
  getArticleSearch()
}

function getArticleSearch() {
  get("/v1/get/column/search?page=" + currentPage.value + "&search=" + search + "&time=" + time).then(function (reply) {
    list.value = reply.data.list
    pageTotal.value = reply.data.total
    getStatistic()
  }).catch(function () {
    loading.value = false
  })
}

function getStatistic() {
  let ids = []
  list.value.forEach(function (each) {
    ids.push("ids=" + each["id"])
  })
  get("/v1/get/column/list/statistic?" + ids.join("&")).then(function (reply) {
    reply.data.count.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.id === item["id"] && (list.value[index] = Object.assign(item, each))
      })
    })
  }).catch(function () {
  }).then(function () {
    data.value = list.value
    loading.value = false
  })
}

function searchChange(s, t, selectTags) {
  search = s
  time = t
  currentPage.value = 1
  data.value = []
  tags.value = selectTags
  getData()
}

defineExpose({
  searchChange
})

watch(currentPage, () => {
  scrollTo("search-list")
  getData()
})

onMounted(function () {
  init()
})
</script>


<style scoped lang="scss">
.search-list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .skeleton {
    padding: 16px;
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
          width: 170px;
          border-radius: 6px;
          margin-right: 16px;
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
          height: 40px;
          font-size: 14px;
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
    }
  }

  .foot {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>