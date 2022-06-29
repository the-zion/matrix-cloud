<template>
  <el-row class="draft">
    <el-space v-for="item in draft" :key="item.id" class="each" :size="15">
      <el-image :src="item.image" v-show="item.image" class="image" fit="cover"></el-image>
      <el-space fill>
        <span class="title">{{ item.title || "暂无标题" }}</span>
        <span class="time">{{ item.update ? ("最近编辑于 " + item.update) : "暂未编辑" }}</span>
      </el-space>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "Draft"
}
</script>

<script setup>
import {onMounted, ref} from "vue"
import * as COS from "cos-js-sdk-v5"
import {get, post} from "../../../utils/axios"
import {initCos} from "../../../utils/cos";
import {userMainStore, baseMainStore} from "../../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

const cos = new COS({})
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {article} = storeToRefs(baseStore)
let draft = ref()

function init() {
  getData()
}

function getData() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/article/draft/list").then(function (reply) {
    draft.value = reply.data["draft"]
    getFromCos()
  })
}

function getFromCos() {
  draft.value.forEach(function (item, index) {
    let url = baseStore.article.baseUrl + item.id + "/" + uuid.value
    get(url).then(function (reply) {
      let data = reply.data
      item.title = data.title
      item.update = data.update
    })
  })
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.draft {
  width: 100%;

  .each:hover {
    background-color: var(--el-fill-color-light);
  }

  .each {
    width: 100%;
    padding: 10px 15px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    cursor: pointer;

    .image {
      width: 70px;
      height: 50px;
      border-radius: 3px;
    }

    .title {
      font-size: 14px;
      line-height: 22px;
      color: var(--el-text-color-primary);
    }

    .time {
      font-size: 12px;
      line-height: 16px;
      color: var(--el-text-color-placeholder);
    }
  }
}
</style>