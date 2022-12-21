<template>
  <el-container class="timeline-container">
    <el-row class="users-menu" justify="center" align="middle">
      <el-empty v-show="follows.length === 0 && !loading" class="empty" description=" "
                :image-size="120"
      >
        <template #image>
          <span class="description">No Data</span>
        </template>
      </el-empty>
      <el-row class="avatar-block" align="middle" v-show="follows.length !== 0">
        <el-icon class="arrow" @click="left">
          <ArrowLeftBold/>
        </el-icon>
        <el-row class="users-block">
          <el-row class="users-block-view" id="users-block-view">
            <el-row class="users" v-for="item in follows" align="middle" justify="center"
                    @click="userSelect(item.uuid)">
              <el-badge is-dot :hidden="props.timeline[item.uuid] <= props.lastTime">
                <el-avatar class="avatar" :size="36" icon="UserFilled"
                           :src="avatar.baseUrl + item['uuid'] + '/avatar.webp'"
                           @click=""></el-avatar>
              </el-badge>
              <span class="username">{{ item['username'] }}</span>
            </el-row>
          </el-row>
        </el-row>
        <el-icon class="arrow" @click="right">
          <ArrowRightBold/>
        </el-icon>
      </el-row>
    </el-row>
    <el-row class="users-timeline">
      <time-line-list ref="timelineRef"></time-line-list>
    </el-row>
  </el-container>
</template>


<script setup>
import {onMounted, ref} from "vue";
import {get, post} from "../../../utils/axios";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia";
import TimeLineList from "../../timeline/component/list.vue";
import {removeScrollToBottomListen} from "../../../utils/scroll";
import {getAssets} from "../../../utils/globalFunc";

const baseStore = baseMainStore()
const {avatar} = storeToRefs(baseStore)
const props = defineProps({
  timeline: {
    type: Object,
    default: {},
  },
  lastTime: Number
})
const emits = defineEmits(["update:lastTime"])
const noData = getAssets("no_data.svg")

let follows = ref([])
let count = 0
let current = 0
let menu = null
let loading = ref(false)
let timelineRef = ref()

function init() {
  initData()
  getData()
}

function initData() {
  menu = document.getElementById("users-block-view")
}

function getData() {
  loading.value = true
  get("/v1/get/timeline/user").then(function (reply) {
    reply.data["follows"].forEach(function (item) {
      if (props.timeline[item.uuid] > props.lastTime) {
        follows.value.unshift(item)
      } else {
        follows.value.push(item)
      }
    })
    count = Math.ceil(follows.value.length / 10)
    userSelect(follows.value[0].uuid)
  }).catch(function () {
  }).then(function () {
    loading.value = false
  })
}

function userSelect(uuid) {
  removeScrollToBottomListen()
  timelineRef.value.userChange(uuid)
  let time = props.timeline[uuid] > props.lastTime ? props.timeline[uuid] : props.lastTime
  post("/v1/set/mailbox/last/time", {
    time: time
  }).then(function () {
    emits("update:lastTime", time)
  })
}

function left() {
  if (current === 0) {
    return null
  }
  current -= 1
  menu.style.transform = "translateX(" + (-1 * current * 700) + "px";
}

function right() {
  if (current === count - 1) {
    return null
  }
  current += 1
  menu.style.transform = "translateX(" + (-1 * current * 700) + "px";
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.timeline-container {
  width: 100%;
  flex-direction: column;

  .users-menu {
    width: 100%;
    height: 112px;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-lighter);
    background-color: var(--el-color-white);

    .empty {
      padding: unset;
      .description{
        font-size: 15px;
        color: var(--el-text-color-placeholder);
      }
      ::v-deep(.el-empty__description){
        display: none;
      }
    }

    .avatar-block {
      width: 100%;
      word-break: break-all;
      text-align: center;

      .arrow {
        width: 40px;
        color: var(--el-text-color-placeholder);
        cursor: pointer;
      }

      .arrow:hover {
        color: var(--el-color-primary)
      }

      .users-block {
        width: calc(100% - 80px);
        height: 80px;
        overflow: hidden;

        .users-block-view {
          width: fit-content;
          flex-wrap: initial;
          transform: translateX(0px);
          transition: transform .35s;

          .users {
            flex-direction: column;
            width: 60px;
            margin: 5px;
            cursor: pointer;

            .avatar {
              font-size: 22px;
            }

            .username {
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-top: 5px;
              width: 60px;
              height: 34px;
              line-height: 16px;
              overflow: hidden;
              font-size: 13px;
              display: -webkit-box;
              color: var(--el-text-color-secondary);
            }
          }
        }
      }
    }
  }

  .users-timeline {
    margin-top: 10px;
    min-height: 800px;
    width: 100%;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow-lighter);
    background-color: var(--el-color-white);
  }
}
</style>