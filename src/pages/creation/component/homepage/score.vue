<template>
  <el-container class="score-container">
    <el-row class="title">等级分数</el-row>
    <el-row class="score-block" justify="center">
      <el-avatar class="avatar" icon="UserFilled" :size="64"
                 :src="avatar.baseUrl + uuid + '/avatar.webp'"/>
      <el-row class="level-info">
        <el-row class="user-info" align="middle">
          <span class="username">{{ username }}</span>
          <span class="level iconfont" :class="level"></span>
          <el-tooltip
              effect="dark"
              raw-content
              placement="bottom-start"
          >
            <el-icon class="icon">
              <InfoFilled/>
            </el-icon>
            <template #content>
              <el-row>浏览任意内容：1分</el-row>
              <el-row>点赞任意内容：2分</el-row>
              <el-row>收藏任意内容：2分</el-row>
              <el-row>评论任意内容：5分</el-row>
              <el-row>专栏创建：20分</el-row>
              <el-row>发文一篇：50分</el-row>
            </template>
          </el-tooltip>
        </el-row>
        <el-progress
            class="progress"
            :stroke-width="10"
            :percentage="percentage"
            :color="levelColor"
        >
          <el-row class="progress-text">
            <span class="score">{{ score }}</span>
            <span class="divide">/</span>
            <span class="total">{{ total }}</span>
          </el-row>
        </el-progress>
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "Score"
}
</script>

<script setup>
import {onBeforeMount, ref} from "vue"
import {userMainStore} from "../../../../store/user";
import {baseMainStore} from "../../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar} = storeToRefs(baseStore)
const props = defineProps({
  score: Number,
  username: String,
})

let level = ref("icon-level1")
let levelColor = ref("#bdc1c6")
let username = ref("")
let score = ref(0)
let total = ref(0)
let percentage = ref(0)

let levelMap = {
  "level1": {"icon": "icon-level1", "color": "#bdc1c6"},
  "level2": {"icon": "icon-level2", "color": "#00e676"},
  "level3": {"icon": "icon-level3", "color": "#40c4ff"},
  "level4": {"icon": "icon-level4", "color": "#ffab40"},
  "level5": {"icon": "icon-level5", "color": "#ff6500"},
  "level6": {"icon": "icon-level6", "color": "#ff1744"},
}

function init() {
  initData()
  getLevel()
}

function initData() {
  score.value = props.score || 0
  username.value = props.username || "暂无数据"
}

function getLevel() {
  let currentLevel
  if (score.value >= 0 && score.value < 20) {
    total.value = 20
    percentage.value = (score.value / 20) * 100
    currentLevel = "level1"
  } else if (score.value >= 20 && score.value < 150) {
    total.value = 150
    percentage.value = (score.value / 150) * 100
    currentLevel = "level2"
  } else if (score.value >= 150 && score.value < 450) {
    total.value = 450
    percentage.value = (score.value / 450) * 100
    currentLevel = "level3"
  } else if (score.value >= 450 && score.value < 1080) {
    total.value = 1080
    percentage.value = (score.value / 1080) * 100
    currentLevel = "level4"
  } else if (score.value >= 1080 && score.value < 2880) {
    total.value = 2880
    percentage.value = (score.value / 2880) * 100
    currentLevel = "level5"
  } else {
    total.value = 2880
    percentage.value = 100
    currentLevel = "level6"
  }
  level.value = levelMap[currentLevel]["icon"]
  levelColor.value = levelMap[currentLevel]["color"]
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.score-container {
  width: 100%;
  flex-direction: column;

  .title {
    width: 100%;
    height: fit-content;
    margin: 0 0 20px;
    font-weight: 500;
    line-height: 31px;
    font-size: 20px;
  }

  .score-block {
    width: 100%;

    .avatar {
      margin-right: 16px;
      font-size: 35px;
    }

    .level-info {
      height: 64px;
      margin-bottom: 20px;
      width: 550px;

      .user-info {
        width: 100%;

        .username {
          font-size: 18px;
          font-weight: 700;
        }

        .level {
          margin-left: 10px;
          font-size: 25px;
          color: v-bind(levelColor);
        }

        .icon {
          margin-left: 10px;
          color: var(--el-text-color-placeholder)
        }
      }

      .progress {
        width: 100%;

        .progress-text {
          margin-left: 10px;
          font-size: 14px;

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
      }
    }
  }
}
</style>