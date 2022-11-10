<template>
  <el-main class="medal-main">
    <el-row class="medal-block" v-for="block in blockMeta">
      <el-row class="header">{{ block.label }}</el-row>
      <el-row class="content" v-for="item in block.children">

        <el-image class="medal" :src="medalSvg(item.label)"
                  fit="contain"
        ></el-image>
        <el-row class="info" justify="center">
          <el-row class="label">{{ item.label }}</el-row>
          <el-row class="introduce">{{ item.introduce }}</el-row>
        </el-row>
        <el-progress
            class="progress"
            :stroke-width="10"
            :percentage="(data[block.key] / item.total) * 100"
            :color="'#40c4ff'"
        >
          <el-row class="progress-text">
            <span class="score">{{
                data[block.key] > item.total ? (item.total > 1000 ? (item.total / 1000).toFixed(1) + "k" : item.total) : (data[block.key] > 1000 ? (data[block.key] / 1000).toFixed(1) + "k" : data[block.key]) || 0
              }}</span>
            <span class="divide">/</span>
            <span class="total">{{ item.total > 1000 ? (item.total / 1000).toFixed(0) + "k" : item.total }}</span>
          </el-row>
          <el-button
              v-show="data[block.key] >= item.total && !medalStatus[item.key]"
              class="button"
              type="primary"
              text
              bg
              :loading="item.loading"
              @click="accessMedal(item)"
          >{{ "点击获取" }}
          </el-button>
          <el-button
              v-show="medalStatus[item.key]"
              class="button"
              type="info"
              text
              bg
          >{{ "已经获取" }}
          </el-button>
        </el-progress>
      </el-row>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: "MedalAll"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
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
let medalStatus = ref({})

function init() {
  initData()
  getData()
  getMedalStatus()
}

function getData() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/user/medal/progress").then(function (reply) {
    data.value = reply.data
  })
}

function getMedalStatus() {
  if (!uuid.value) {
    return
  }

  get("/v1/get/user/medal?uuid=" + uuid.value).then(function (reply) {
    medalStatus.value = reply.data
  })
}

function initData() {
  blockMeta.value = GetMedalMeta()
  blockMap.value = GetMedalMap()
}

function accessMedal(item) {
  if (!uuid.value) {
    return
  }
  item["loading"] = true
  post("/v1/access/user/medal", {
    medal: item.key
  }).then(function () {
    medalStatus.value[item.key] = 1
    success("勋章已获取")
  }).catch(function () {
    error("勋章获取失败")
  }).then(function () {
    item["loading"] = false
  })
}

function medalSvg(label){
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
    border-bottom: 1px solid var(--el-border-color-lighter);

    .header {
      width: 100%;
    }

    .content {
      width: 100%;
      margin: 20px 0;

      .medal {
        width: 70px;
        height: 70px;
        margin-right: 15px;
      }

      .info {
        width: 200px;
        flex-direction: column;


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

      .progress {
        width: 450px;

        ::v-deep(.el-progress__text) {
          width: calc(100% - 240px);
          display: flex;
          align-items: center;
        }

        .progress-text {
          margin-left: 10px;
          font-size: 14px;
          display: inline-block;
          width: 100px;

          .score {
            color: var(--el-text-color-primary);
          }

          .divide {
            margin: 0 5px;
            color: var(--el-text-color-placeholder);
          }

          .total {
            color: var(--el-text-color-disabled);
          }
        }

        .button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>