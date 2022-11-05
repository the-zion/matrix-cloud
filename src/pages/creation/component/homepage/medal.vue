<template>
  <el-container class="medal-container">
    <el-row class="title-block" justify="space-between">
      <span class="title">佩戴勋章</span>
      <el-row class="operate" align="middle" @click="router.push({name: 'creation.medal'})">
        <span>查看全部</span>
        <el-icon class="arrow">
          <ArrowRight/>
        </el-icon>
      </el-row>
    </el-row>
    <el-empty v-show="!countOfMedal" class="empty-block" description=" "
              :image-size="250" :image="noData"
    />
    <el-row class="medal-block" v-show="countOfMedal">
      <el-row class="block" justify="center" v-for="(value, key) in data" v-show="data[key] === 1">
        <el-tooltip
            effect="dark"
            placement="bottom"
        >
          <el-image class="medal" :src="medalSvg(medalMap[key])"
                    fit="contain"></el-image>
          <template #content>
            <el-row>{{ medalMap[key] }}</el-row>
            <el-row>{{ medalIntroduce[key] }}</el-row>
          </template>
        </el-tooltip>
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Medal"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {GetMedalMap, GetMedalIntroduce} from "../medal";
import router from "../../../../router";
import {get} from "../../../../utils/axios";
import {userMainStore} from "../../../../store/user";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {getAssets} from "../../../../utils/globalFunc";

const noData = getAssets("no_data.svg")
const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)

let medalMap = ref({})
let medalIntroduce = ref({})
let data = ref({})
let countOfMedal = ref(0)

function init() {
  initData()
  getData()
}

function initData() {
  medalMap.value = GetMedalMap()
  medalIntroduce.value = GetMedalIntroduce()
}

function getData() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/user/medal?uuid=" + uuid.value).then(function (reply) {
    data.value = reply.data
    Object.keys(data.value).forEach(function (item) {
      if (data.value[item]) {
        countOfMedal.value += 1
      }
    })
  })
}

function medalSvg(key){
  return getAssets(key +'.svg')
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.medal-container {
  width: 100%;
  flex-direction: column;

  .title-block {
    width: 100%;
    height: fit-content;
    margin: 0 0 20px;
    line-height: 31px;

    .title {
      font-weight: 500;
      font-size: 20px;
    }

    .operate {
      font-size: 14px;
      color: var(--el-text-color-placeholder);
      cursor: pointer;

      .arrow {
        margin-left: 5px;
      }
    }
  }

  .empty-block {
    padding: unset;
  }

  .medal-block {
    width: 100%;
    overflow: hidden;
    height: 90px;

    .block {
      box-sizing: border-box;
      margin: 0;
      min-width: 0;
      width: 20%;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 25px;

      .medal {
        width: 70px;
        height: 70px;
      }
    }
  }
}
</style>