<template>
  <el-container class="leaderboard">
    <el-affix>
      <el-row class="body" justify="center">
        <el-row class="title">必读榜</el-row>
        <el-row v-for="(item, index) in data" :key="item.id" class="each" @click="goToPage(item.mode, {id:item.id})">
          <el-icon :size="10" class="icon iconfont"
                   :class="'icon-number-'+(index+1) + (index < 3?' gold':'')"></el-icon>
          <el-space class="info" direction="vertical" fill :size="0" alignment="start">
            <el-space class="info-head" :size="4">
              <el-avatar class="info-avatar" icon="UserFilled" :src="avatar.baseUrl + item.uuid + '/avatar.webp'" :size="22"></el-avatar>
              <span class="info-title">{{ introduce[index].title || introduce[index].name }}</span>
            </el-space>
            <span class="text">{{ introduce[index].text || introduce[index].introduce }}</span>
          </el-space>
        </el-row>
        <el-skeleton class="skeleton" v-show="loading" :rows="1" animated/>
        <el-empty v-show="data.length === 0 && !loading" class="empty" description=" "
                  :image-size="150" :image="noData"
        />
      </el-row>
    </el-affix>
  </el-container>
</template>

<script>
export default {
  name: "LeaderBoard"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {getAssets, goToPage} from "../../../utils/globalFunc";
import {get} from "../../../utils/axios";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

const baseStore = baseMainStore()
const {avatar, article, talk, column} = storeToRefs(baseStore)
const noData = getAssets("no_data.svg")

let data = ref([])
let loading = ref(false)
let request = 0
let list = null
let introduce = ref({})

function init() {
  getData()
}

function getData() {
  loading.value = true
  get("/v1/get/leaderboard").then(function (reply) {
    list = reply.data['board'].slice(0, 9)
    request = list.length
    if (list.length > 0){
      getIntroduce(list)
    }else{
      loading.value = false
    }
  }).catch(function () {
    loading.value = false
  })
}

function getIntroduce(list) {
  list.forEach(function (each, index) {
    switch (each.mode) {
      case "article":
        getArticleIntroduce(each, index)
        break
      case "talk":
        getTalkIntroduce(each, index)
        break
      case "column":
        getColumnIntroduce(each, index)
        break
    }
  })
}

function getArticleIntroduce(item, index) {
  let url = article.value.baseUrl + item.uuid + "/" + item.id + "/introduce"
  get(url).then(function (reply) {
    introduce.value[index] = reply.data
    request -= 1
  }).catch(function () {
    request -= 1
  }).then(function () {
    if (request === 0) {
      data.value = data.value.concat(list)
      loading.value = false
    }
  })
}

function getTalkIntroduce(item, index) {
  let url = talk.value.baseUrl + item.uuid + "/" + item.id + "/introduce"
  get(url).then(function (reply) {
    introduce.value[index] = reply.data
    request -= 1
  }).catch(function () {
    request -= 1
  }).then(function () {
    if (request === 0) {
      data.value = data.value.concat(list)
      loading.value = false
    }
  })
}

function getColumnIntroduce(item, index) {
  let url = column.value.baseUrl + item.uuid + "/" + item.id + "/introduce"
  get(url).then(function (reply) {
    introduce.value[index] = reply.data
    request -= 1
  }).catch(function () {
    request -= 1
  }).then(function () {
    if (request === 0) {
      data.value = data.value.concat(list)
      loading.value = false
    }
  })
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.leaderboard {
  width: 100%;
  flex-direction: column;

  .body {
    width: 100%;
    padding: 16px 0;
    background-color: var(--el-color-white);
    border: 1px solid var(--el-border-color-lighter);

    .title {
      font-size: 14px;
      line-height: 20px;
      color: var(--el-text-color-regular);
      font-weight: 500;
      margin-bottom: 10px;
      padding: 0 18px;
      width: 100%;
    }

    .each {
      margin-bottom: 4px;
      padding: 6px 16px;
      cursor: pointer;

      .icon {
        width: 10px;
        margin-right: 8px;
        margin-top: 5px;
        color: var(--el-text-color-placeholder);
      }

      .gold {
        color: #ffa116;
      }

      .info {
        width: 206px;

        .info-head {
          width: 100%;

          .info-avatar{
            font-size: 14px;
          }

          .info-title {
            width: 180px;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1 1 auto;
            font-weight: 500;
            color: var(--el-text-color-primary)
          }
        }

        .text {
          width: 206px;
          font-size: 12px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 20px;
          color: var(--el-text-color-disabled);
        }
      }
    }

    .each:hover {
      background-color: var(--el-fill-color-light);
    }

    .skeleton {
      padding: 6px 16px;
    }
  }
}
</style>