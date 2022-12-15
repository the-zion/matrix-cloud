<template>
  <el-row class="draft" justify="center">
    <el-skeleton class="skeleton" v-show="loading" :rows="1" animated/>
    <el-space v-show="!loading" v-for="item in draft" :key="item.id" class="each" :size="15" @click="draftSelect(item)">
      <el-image :src="item.cover" v-show="item.cover" class="image" fit="cover"></el-image>
      <el-space fill>
        <span class="title">{{ item.title || "暂无标题" }}</span>
        <span class="time">{{ item.update ? ("最近编辑于 " + item.update) : "暂未编辑" }}</span>
      </el-space>
    </el-space>
    <el-empty v-show="!loading && draft.length === 0" class="empty" description=" "
              :image-size="150" :image="noData"
    />
  </el-row>
</template>

<script>
export default {
  name: "Draft"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {get, post} from "../../../utils/axios"
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {warning} from "../../../utils/message";
import {getAssets} from "../../../utils/globalFunc";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {article} = storeToRefs(baseStore)
const emits = defineEmits(["draftSelect"])
const noData = getAssets("no_data.svg")
let draft = ref([])
let loading = ref(true)

function init() {
  getData()
}

function getData() {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }
  loading.value = true
  get("/v1/get/article/draft/list").then(function (reply) {
    draft.value = reply.data["draft"]
    if(!draft.value.length){
      loading.value = false
    }
    getFromCos()
  }).catch(function (){
    loading.value = false
  })
}

function getFromCos() {
  let request = draft.value.length
  draft.value.forEach(function (item) {
    let url = article.value.baseUrl + uuid.value + "/" + item["id"] + "/content"
    get(url).then(function (reply) {
      let data = reply.data
      item.title = data.title
      item.update = data.update
      item.cover = data.cover
    }).catch(function () {
    }).then(function () {
      request -= 1
      if (request === 0) {
        loading.value = false
      }
    })
  })
}

function draftSelect(item) {
  emits("draftSelect", item.id)
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.draft {
  width: 100%;

  .skeleton {
    width: 100%;
    padding: 10px 15px;
  }

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