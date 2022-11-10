<template>
  <el-main class="medal-main">
    <el-row class="medal-block" v-for="block in blockMeta" justify="space-between">
      <el-row class="header">{{ block.label }}</el-row>
      <el-row class="content" v-for="item in block.children">

        <el-image class="medal" :src="medalSvg(item.label)"
                  fit="contain" :class="{'color-gray':!data[item.key]}"
        ></el-image>
        <el-row class="info" justify="center">
          <el-row class="label" justify="space-between" align="middle">
            <span>{{ item.label }}</span>
            <el-button v-if="data[item.key]" :type="data[item.key] === 2?'primary':'info'" :text="data[item.key] === 1"
                       :bg="data[item.key] === 1" size="small" :loading="item['loading']"
                       @click="data[item.key] === 2?SetMedal(item):CancelMedal(item)">
              {{ data[item.key] === 2 ? '装配' : '卸下' }}
            </el-button>
          </el-row>
          <el-row class="introduce">{{ item.introduce }}</el-row>
        </el-row>
      </el-row>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "MedalEquipment"
}
</script>

<script setup>
import {ref, onBeforeMount} from "vue";
import {GetMedalMap, GetMedalMeta} from "../medal";
import {get, post} from "../../../../utils/axios";
import {userMainStore} from "../../../../store/user";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {success, error} from "../../../../utils/message";
import {getAssets} from "../../../../utils/globalFunc";

const userStore = userMainStore()
const {uuid} = storeToRefs(userStore)

let blockMeta = ref([])
let blockMap = ref({})
let data = ref({})

function init() {
  initData()
  getData()
}

function initData() {
  blockMeta.value = GetMedalMeta()
  blockMap.value = GetMedalMap()
}

function getData() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/user/medal?uuid=" + uuid.value).then(function (reply) {
    data.value = reply.data
  })
}

function SetMedal(item) {
  if (!uuid.value) {
    return
  }
  item["loading"] = true
  post("/v1/set/user/medal", {medal: item.key}).then(function () {
    success("勋章已装配")
    data.value[item.key] = 1
  }).catch(function () {
    error("勋章装配失败")
  }).then(function () {
    item["loading"] = false
  })
}

function CancelMedal(item) {
  if (!uuid.value) {
    return
  }
  item["loading"] = true
  post("/v1/cancel/user/medal/set", {medal: item.key}).then(function () {
    success("勋章已卸下")
    data.value[item.key] = 2
  }).catch(function () {
    error("勋章卸下失败")
  }).then(function () {
    item["loading"] = false
  })
}

function medalSvg(label) {
  return getAssets(label + ".svg")
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.medal-main {
  width: 100%;

  .medal-block {
    width: 100%;
    margin-bottom: 20px;

    .header {
      width: 100%;
      margin-bottom: 20px;
    }

    .content {
      cursor: pointer;
      padding: 15px;
      border: 1px solid #e5e9ef;
      border-radius: 4px;
      margin-bottom: 25px;
      position: relative;
      width: 370px;

      .medal {
        width: 70px;
        height: 70px;
        margin-right: 15px;
      }

      .color-gray {
        filter: grayscale(100%);
      }

      .info {
        width: calc(100% - 85px);
        flex-direction: column;
        padding-left: 15px;
        border-left: 1px solid var(--el-border-color-light);


        .label {
          width: 100%;
          font-size: 18px;
          line-height: 16px;
          font-weight: 700;
          margin-bottom: 15px;
          color: var(--el-text-color-primary);
        }

        .introduce {
          width: 100%;
          font-size: 12px;
          line-height: 12px;
          color: var(--el-text-color-placeholder)
        }
      }
    }

    .block:hover {
      box-shadow: 0 2px 4px #dedede;
    }
  }
}
</style>