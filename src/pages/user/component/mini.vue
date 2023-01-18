<template>
  <el-row class="card" v-loading="loading">
    <el-row class="head">
      <el-avatar @click="goToPage('user', {id:userId,menu:'timeline'})" icon="UserFilled" class="avatar" shape="square"
                 :size="60" :src="avatar.baseUrl + userId + '/avatar.webp'"/>
      <el-space class="info" direction="vertical" alignment="start" :size="0" fill>
        <el-space>
          <span class="nickname">{{ data.username }}</span>
          <el-icon class="level iconfont" :class="level"></el-icon>
        </el-space>
        <span class="introduce">{{ data.introduce || "此人很懒，没有任何简介～" }}</span>
      </el-space>
    </el-row>
    <el-row class="achievement">
      <el-row class="area" v-for="(item, index) in achMeta" :key="item.key" justify="center" align="middle">
        <el-space class="each" direction="vertical" alignment="center" :size="1">
          <span class="label">{{ item.label }}</span>
          <span
              class="value">{{
              data[item.key] > 1000 ? (data[item.key] / 1000).toFixed(1) + "k" : data[item.key] || 0
            }}</span>
        </el-space>
        <el-divider class="divider" v-show="index !== achMeta.length - 1" direction="vertical"/>
      </el-row>
    </el-row>
    <el-row class="foot" justify="center">
      <el-button class="button" icon="User" type="info" @click="goToPage('user', {id:userId,menu:'timeline'})" bg text>
        查看主页
      </el-button>
      <el-button class="button" :type="follows[userId]?'info':'primary'" :icon="follows[userId]?'':'Plus'"
                 :loading="followLoading"
                 @click="follow()" :text="follows[userId]" :bg="follows[userId]">
        {{ follows[userId] ? '取消关注' : '关注' }}
      </el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixUserMiniCard"
}
</script>

<script setup>
import {goToPage} from "../../../utils/globalFunc";
import {storeToRefs} from "pinia/dist/pinia";
import {get, post} from "../../../utils/axios";
import {onBeforeMount, ref} from "vue"
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {error, success, warning} from "../../../utils/message";

const props = defineProps({
  uuid: String
})
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar} = storeToRefs(baseStore)

let achMeta = ref([
  {
    key: "view",
    label: "被阅读"
  },
  {
    key: "agree",
    label: "被点赞"
  },
  {
    key: "collect",
    label: "被收藏"
  },
  {
    key: "followed",
    label: "关注者"
  }
])
let userId = ref()
let data = ref({})
let achievement = ref({})
let loading = ref(true)
let followLoading = ref(false)
let follows = ref({})
let level = ref("icon-level1")
let levelColor = ref("#bdc1c6")

function init() {
  initData()
  getUserInfo()
  getUserFollows()
}

function initData() {
  userId.value = props.uuid
}

let levelMap = {
  "level1": {"icon": "icon-level1", "color": "#bdc1c6"},
  "level2": {"icon": "icon-level2", "color": "#00e676"},
  "level3": {"icon": "icon-level3", "color": "#40c4ff"},
  "level4": {"icon": "icon-level4", "color": "#ffab40"},
  "level5": {"icon": "icon-level5", "color": "#ff6500"},
  "level6": {"icon": "icon-level6", "color": "#ff1744"},
}

function getUserInfo() {
  if (!userId.value) {
    return
  }
  get("/v1/get/user/info/visitor?uuid=" + userId.value).then(function (reply) {
    data.value = reply.data
    loading.value = false
    getLevel()
  })
}

function getLevel() {
  let score = data.value["score"]
  let currentLevel
  if (score >= 0 && score < 20) {
    currentLevel = "level1"
  } else if (score >= 20 && score < 150) {
    currentLevel = "level2"
  } else if (score >= 150 && score < 450) {
    currentLevel = "level3"
  } else if (score >= 450 && score < 1080) {
    currentLevel = "level4"
  } else if (score >= 1080 && score < 2880) {
    currentLevel = "level5"
  } else {
    currentLevel = "level6"
  }
  level.value = levelMap[currentLevel]["icon"]
  levelColor.value = levelMap[currentLevel]["color"]
}

function getUserFollows() {
  if (!userId.value) {
    return
  }
  get("/v1/get/user/follows").then(function (reply) {
    follows.value = reply.data["follows"]
  })
}

function follow() {
  if (!userId.value) {
    return
  }

  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (userId.value === uuid.value) {
    warning("不要自己关注自己哦～")
    return
  }

  if (follows.value[userId.value]) {
    cancelFollow()
  } else {
    setFollow()
  }
}

function setFollow() {
  followLoading.value = true
  post("/v1/set/user/follow", {uuid: userId.value}).then(function () {
    success("已关注")
    follows.value[userId.value] = true
  }).catch(function () {
    error("关注出错，请稍后再试")
  }).then(function () {
    followLoading.value = false
  })
}

function cancelFollow() {
  followLoading.value = true
  post("/v1/cancel/user/follow", {uuid: userId.value}).then(function () {
    success("已取消关注")
    follows.value[userId.value] = false
  }).catch(function () {
    error("取消出错，请稍后再试")
  }).then(function () {
    followLoading.value = false
  })
}

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang="scss">
.card {
  width: 100%;

  .head {
    width: 100%;
    margin-bottom: 12px;
    padding: 0 12px;

    .avatar {
      margin-right: 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 35px;
    }

    .info {
      width: calc(100% - 72px);

      .nickname {
        font-size: 14px;
        font-weight: 500;
        color: var(--el-text-color-primary);
      }

      .level {
        font-size: 20px;
        font-weight: 500;
        color: v-bind(levelColor)
      }

      .introduce {
        font-size: 12px;
        line-height: 18px;
        color: var(--el-text-color-regular);
        word-break: break-all;
        align-self: stretch;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }

  .achievement {
    width: 100%;
    margin-bottom: 12px;

    .area {
      width: calc(25% - 0.25px);

      .each {
        position: relative;

        .label {
          font-size: 12px;
          color: var(--el-text-color-primary);
        }

        .value {
          font-size: 15px;
          font-weight: 500;
          color: var(--el-text-color-primary);
        }
      }
    }

    .divider {
      position: absolute;
      right: 0;
      height: 60%;
      border-left: 1px solid var(--el-border-color-lighter);
      margin: 0;
    }
  }

  .foot {
    width: 100%;

    .button {
      width: 43%;
    }
  }
}
</style>