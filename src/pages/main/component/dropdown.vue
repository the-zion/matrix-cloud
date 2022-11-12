<template>
  <el-container class="center">
    <el-space class="info" fill :size="8">
      <el-avatar class="avatar icon" :size="82" icon="UserFilled"
                 :src="avatar.baseUrl + uuid + '/avatar.webp'"></el-avatar>
      <el-row class="word" align="middle" justify="center">
        <span class="name">{{ data['username'] || '暂无数据' }}</span>
        <span class="introduce" v-if="data['introduce']">{{ data['introduce'] }}</span>
      </el-row>
      <el-row class="score" align="middle" justify="center">
        <el-icon class="level iconfont" :class="level"></el-icon>
        <el-tooltip
            effect="dark"
            raw-content
            placement="bottom-start"
        >
          <el-progress
              class="progress"
              :show-text="false"
              :stroke-width="3"
              :percentage="percentage"
              :color="levelColor"
          >
          </el-progress>
          <template #content>
            <span>{{ "目前得分：" + (data['score'] || 0) }}</span>
            <span>{{ "，距离升级还需要：" + (scoreNeed || 0) }}</span>
          </template>
        </el-tooltip>
        <el-icon v-if="nextLevel" class="level-second iconfont" :class="nextLevel"></el-icon>
      </el-row>
      <el-row class="statistic" align="middle" justify="space-between">
        <el-row class="each" align="middle">
          <el-row class="value">
            {{ data["follow"] > 1000 ? (data["follow"] / 1000).toFixed(1) + "k" : data["follow"] || 0 }}
          </el-row>
          <el-row class="label">关注</el-row>
        </el-row>
        <el-row class="each" align="middle">
          <el-row class="value">
            {{ data["followed"] > 1000 ? (data["followed"] / 1000).toFixed(1) + "k" : data["followed"] || 0 }}
          </el-row>
          <el-row class="label">关注者</el-row>
        </el-row>
        <el-row class="each" align="middle">
          <el-row class="value">{{
              (data["article"] + data["talk"]) > 1000 ? ((data["article"] + data["talk"]) / 1000).toFixed(1) + "k" : (data["article"] + data["talk"]) || 0
            }}
          </el-row>
          <el-row class="label">发文</el-row>
        </el-row>
      </el-row>
    </el-space>
    <el-space class="menu" direction="vertical" alignment="start" fill :size="10">
      <el-row v-for="item in menu" :key="item.label" class="each" @click="item.func" align="middle">
        <el-icon :size="18" color="var(--el-text-color-regular)">
          <component :is="item.icon"></component>
        </el-icon>
        <span class="word">{{ item.label }}</span>
        <el-icon color="var(--el-text-color-regular)">
          <ArrowRightBold/>
        </el-icon>
      </el-row>
    </el-space>
    <el-row class="foot">
      <el-row class="each" @click="signOut">
        <el-icon :size="18" color="var(--el-text-color-regular)">
          <SwitchButton/>
        </el-icon>
        <span class="word">{{ "退出登录" }}</span>
      </el-row>
    </el-row>

  </el-container>
</template>
<script>
export default {
  name: "Dropdown"
}
</script>


<script setup>
import {ref, onBeforeMount} from "vue";
import router from "../../../router";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia";
import {confirm} from "../../../utils/globalFunc";
import {get} from "../../../utils/axios";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {cover, avatar} = storeToRefs(baseStore)

let menu = ref([
  {
    label: "个人主页",
    icon: "user",
    func: userPage
  },
  {
    label: "创作中心",
    icon: "notification",
    func: userCenter
  },
  {
    label: "账户设置",
    icon: "setting",
    func: userSettings
  },
])

let level = ref("icon-level1")
let nextLevel = ref("icon-level2")
let levelColor = ref("#bdc1c6")
let percentage = ref(0)
let data = ref({})
let levelMap = {
  "level1": {"icon": "icon-level1", "color": "#bdc1c6"},
  "level2": {"icon": "icon-level2", "color": "#00e676"},
  "level3": {"icon": "icon-level3", "color": "#40c4ff"},
  "level4": {"icon": "icon-level4", "color": "#ffab40"},
  "level5": {"icon": "icon-level5", "color": "#ff6500"},
  "level6": {"icon": "icon-level6", "color": "#ff1744"},
}
let scoreNeed = ref(0)

function init() {
  getUserInfo()
}

function getUserInfo() {
  if (!uuid.value) {
    return
  }
  get("/v1/get/user/info").then(function (reply) {
    data.value = reply.data
    getLevel()
  })
}

function getLevel() {
  let score = data.value["score"]
  let currentLevel
  if (score >= 0 && score < 20) {
    currentLevel = "level1"
    percentage.value = (score / 20) * 100
    scoreNeed.value = 20 - score
  } else if (score >= 20 && score < 150) {
    currentLevel = "level2"
    percentage.value = (score / 150) * 100
    scoreNeed.value = 150 - score
  } else if (score >= 150 && score < 450) {
    currentLevel = "level3"
    percentage.value = (score / 450) * 100
    scoreNeed.value = 450 - score
  } else if (score >= 450 && score < 1080) {
    currentLevel = "level4"
    percentage.value = (score / 1080) * 100
    scoreNeed.value = 1080 - score
  } else if (score >= 1080 && score < 2880) {
    currentLevel = "level5"
    percentage.value = (score / 2880) * 100
    scoreNeed.value = 2880 - score
  } else {
    currentLevel = "level6"
    percentage.value = 100
    scoreNeed.value = 0
  }
  let next = "level" + (parseInt(currentLevel.split("level")[1]) + 1)
  level.value = levelMap[currentLevel]["icon"]
  nextLevel.value = levelMap[next] ? levelMap[next]["icon"] : ""
  levelColor.value = levelMap[currentLevel]["color"]
}

function userPage() {
  router.push({name: "user", query: {id: uuid.value, menu: 'timeline'}})
}

function userCenter() {
  router.push({name: "creation"})
}

function userSettings() {
  router.push({name: "settings.profile", query: {menu: 'profile'}})
}

function signOut() {
  confirm("退出登录", "确认退出登录吗").then(function () {
    localStorage.removeItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
    userStore.$reset()
  })
}

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang="scss">
.center {
  width: 300px;
  padding: 0 24px 18px 24px;
  flex-direction: column;

  .info {
    width: 100%;
    padding-top: 40px;
    justify-content: center;

    .avatar {
      position: absolute;
      top: -41px;
      left: 109px;
      border: 2px solid var(--el-color-white);
    }

    .icon {
      font-size: 45px;
    }

    .word {
      width: 100%;
      flex-direction: column;

      .name {
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 600;
        color: var(--el-color-primary);
        margin-bottom: 5px;
      }

      .introduce {
        font-size: .75rem;
        line-height: 1rem;
        color: var(--el-text-color-secondary);
        word-break: break-word;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }

    .score {
      .level {
        margin: 0 10px;
        font-size: 23px;
        font-weight: 500;
        color: v-bind(levelColor)
      }

      .level-second {
        margin: 0 10px;
        font-size: 23px;
        font-weight: 500;
        color: #bdc1c6
      }

      .progress {
        width: 165px;
      }
    }

    .statistic {
      width: 100%;

      .each {
        width: 33%;
        flex-direction: column;

        .value {
          font-size: 18px;
        }

        .label {
          margin-top: 3px;
          color: var(--el-text-color-secondary);
        }
      }
    }
  }

  .menu {
    width: 100%;
    padding-top: 1rem;
    margin-bottom: unset !important;

    .each {
      padding: 0.5rem;
      width: 100%;
      border-radius: 5px;
      cursor: pointer;

      .icon {
        color: var(--el-text-color-regular)
      }

      .word {
        font-size: 14px;
        color: var(--el-text-color-regular);
        font-weight: 500;
        margin-left: 10px;
        flex-grow: 1;
      }
    }

    .each:hover {
      background-color: var(--el-fill-color-lighter);
    }
  }

  .foot {
    width: 100%;
    padding-top: 1rem;
    border-top: 1px solid var(--el-border-color-lighter);

    .each {
      padding: 0.5rem;
      width: 100%;
      border-radius: 5px;
      cursor: pointer;

      .icon {
        color: var(--el-text-color-regular)
      }

      .word {
        font-size: 14px;
        color: var(--el-text-color-regular);
        font-weight: 500;
        margin-left: 10px;
        flex-grow: 1;
      }
    }

    .each:hover {
      background-color: var(--el-fill-color-lighter);
    }
  }
}
</style>