<template>
  <el-row class="creation-list" id="creation-list">
    <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
              :image-size="250" :image="noData" :class="{'simple-empty': mode === 'simple'}"
    />
    <column-create v-model:visible="visible" v-bind:mode="'edit'" :id="columnId"></column-create>
    <el-row class="data">
      <el-row v-for="(item, index) in data" class="each" :key="item.id" :class="{'simple-each': mode === 'simple'}"
              @click="goToPage('column', {id:item.id})">
        <el-row class="column-card" align="top">
          <el-image class="image" fit="cover" :src="item.cover" lazy></el-image>
          <el-row class="container" align="top">
            <el-space class="main">
              <el-row class="title">{{ item.name }}</el-row>
              <el-space class="info">
                <el-tag round v-show="item.tags" type="info" v-for="tag in (item.tags?item.tags.split(';'):[])"
                        :key="tag">{{
                    tag
                  }}
                </el-tag>
              </el-space>
            </el-space>
            <el-row class="content">{{ item.introduce }}</el-row>
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
              <el-space :size="3" @click.stop="columnEdit(item)" v-if="mode !== 'simple'">
                <el-icon class="icon">
                  <EditPen/>
                </el-icon>
                <span class="word">编辑</span>
              </el-space>
              <el-space :size="3" @click.stop="columnDeleteConfirm(item,index)" v-if="mode !== 'simple'">
                <el-icon class="icon">
                  <Delete/>
                </el-icon>
                <span class="word">删除</span>
              </el-space>
            </el-space>
          </el-row>
        </el-row>
      </el-row>
    </el-row>
    <el-skeleton class="skeleton" v-show="loading" :rows="2" animated/>
  </el-row>
</template>

<script>
export default {
  name: "ColumnCreationList"
}
</script>

<script setup>
import ColumnCreate from "../../column/component/create.vue";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {confirm, getAssets, goToPage} from "../../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {onBeforeMount, ref} from "vue";
import {axiosGetAll, post} from "../../../utils/axios";
import {error, success} from "../../../utils/message";
import {scrollToBottomListen, throttle} from "../../../utils/scroll";

const userStore = userMainStore()
const emits = defineEmits(["row-delete"])
const baseStore = baseMainStore()
const {avatar, column} = storeToRefs(baseStore)
const {uuid} = storeToRefs(userStore)
const props = defineProps({
  mode: {
    type: String,
    default: ""
  }
})
const noData = getAssets("no_data.svg")

let data = ref([])
let list = ref([])
let count = ref({})
let introduce = ref({})
let columnId = ref()
let currentPage = 1
let loading = ref(false)
let visible = ref(false)
let mode = ref("")
let getDataLock = false
let isBottom = false
let request = 0

function init() {
  initData()
  getData()
}

function initData() {
  mode.value = props.mode
  !mode.value && scrollToBottomListen(throttle(scrollToBottom, 1000))
}

function scrollToBottom() {
  getData()
}

function getData() {
  if (!uuid.value || isBottom || getDataLock) {
    return
  }
  list.value = []
  loading.value = true
  getDataLock = true
  post(mode.value === "simple" ? "/v1/get/user/column/list/simple" : "/v1/get/user/column/list", {page: currentPage}).then(function (reply) {
    list.value = reply.data.column
    let size = reply.data.column.length
    if (size === 0) {
      isBottom = true
      loading.value = false
      getDataLock = false
      return
    }
    currentPage += 1
    getIntroduce()
  }).catch(function () {
    loading.value = false
    getDataLock = false
  })
}

function getIntroduce() {
  let endpoints = []
  list.value.forEach(function (item) {
    endpoints.push(column.value.baseUrl + item["uuid"] + "/" + item["id"] + "/introduce")
  })
  axiosGetAll(endpoints, function (allData) {
    allData.forEach(function (each) {
      list.value.forEach(function (item, index) {
        each.data.id === item["id"] && (list.value[index] = Object.assign(item, each.data))
      })
    })
  }, function () {
  }, function () {
    data.value = data.value.concat(list.value)
    loading.value = false
    getDataLock = false
  })
}

function columnEdit(item) {
  columnId.value = item.id
  visible.value = true
}

function columnDelete(item, index) {
  post("/v1/delete/column", {
    id: item.id,
  }).then(function () {
    success("删除成功")
    data.value.splice(index, 1);
    emits("row-delete")
  }).catch(function () {
    error("删除失败")
  })
}

function columnDeleteConfirm(item, index) {
  confirm("专栏删除", "确认删除该专栏吗").then(function () {
    columnDelete(item, index)
  })
}


onBeforeMount(function () {
  init()
})
</script>


<style scoped lang="scss">
.creation-list {
  width: 100%;

  .empty {
    width: 100%;
  }

  .simple-empty {
    padding: unset;
  }

  .skeleton {
    padding: 16px;
  }

  .data {
    width: 100%;

    .each:last-child {
      border-bottom: unset;
    }

    .simple-each {
      .column-card {
        padding: 16px 0 !important;
      }
    }

    .each {
      position: relative;
      border-bottom: 1px solid var(--el-border-color-lighter);
      background-color: var(--el-color-white);
      cursor: pointer;
      width: 100%;

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

          .num, .word {
            font-size: 14px;
            color: var(--el-text-color-secondary)
          }
        }
      }
    }
  }
}
</style>