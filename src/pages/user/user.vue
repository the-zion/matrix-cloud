<template>
  <el-container class="user-container">
    <el-backtop></el-backtop>
    <el-header class="user-cover">
      <el-image @load="getCoverColor()" id="user-cover" fit="cover" class="cover"
                :src="coverUrl">
        <template #error>
          <el-image id="user-cover-inner" fit="cover" class="cover" @load="getCoverColor()"
                    :src="coverImage"></el-image>
        </template>
      </el-image>
      <el-progress v-show="uploading" :duration="10" :percentage="percentage"
                   :show-text="false"/>
      <el-upload
          v-if="uuid === searchId"
          class="cover-upload"
          :show-file-list="false"
          :http-request="coverUpload"
          accept="image/png, image/jpeg, image/jpg"
          :before-upload="beforeCoverUpload"
      >
        <el-tooltip
            effect="dark"
            content="支持 jpg、png、jpeg 格式大小 2M 以内的图片"
            placement="bottom"
            :hide-after="50"
        >
          <el-row align="middle" class="upload-block">
            <el-icon class="avatar-uploader-icon">
              <CameraFilled/>
            </el-icon>
            <span class="world">编辑背景图片</span>
          </el-row>
        </el-tooltip>
      </el-upload>
      <el-row class="user-card" justify="space-between">
        <el-avatar class="user-avatar" :src="data.avatar || avatar.baseUrl + searchId + '/avatar.webp'" :size="168"
                   icon="UserFilled" shape="square">
          <el-icon :size="50">
            <UserFilled/>
          </el-icon>
        </el-avatar>
        <el-row class="user-info">
          <el-row class="title" align="middle">
            <span>{{ data.username }}</span>
            <el-icon class="level iconfont" :class="level"></el-icon>
          </el-row>
          <el-row class="content">
            <el-row class="school" align="middle" v-show="data.school">
              <el-icon class="icon">
                <School/>
              </el-icon>
              <span class="word">{{ data.school }}</span>
            </el-row>
            <el-row class="company" align="middle" v-show="data.company || data.job">
              <el-icon class="icon">
                <Suitcase/>
              </el-icon>
              <span class="word">{{ data.company }}</span>
              <el-divider direction="vertical" v-show="data.company && data.job"></el-divider>
              <span class="word">{{ data.job }}</span>
            </el-row>
            <el-row class="introduce" align="top" style="display: unset">
              <el-icon class="icon">
                <User/>
              </el-icon>
              <span class="word-intro">{{ data.introduce || "此人很懒，没有任何简介～" }}</span>
            </el-row>
          </el-row>
        </el-row>
        <el-row class="user-operation" justify="space-between">
          <el-row class="pages" justify="space-around">
            <el-icon class="iconfont icon-weibo" :size="20"></el-icon>
            <el-icon class="iconfont icon-github-fill" :size="20"></el-icon>
            <el-icon class="iconfont icon-earth" :size="20" :class="{'earth-color':data['homepage']}"
                     @click="earthClick()"></el-icon>
          </el-row>
          <el-button class="button" type="primary" v-if="uuid === searchId"
                     @click="router.push({name: 'settings.profile', query: {menu: 'profile'}})">编辑个人资料
          </el-button>
          <el-button class="button" :type="follows[searchId]?'info':'primary'" :icon="follows[searchId]?'':'Plus'"
                     v-else
                     :loading="followLoading"
                     @click="follow()" :text="follows[searchId]" :bg="follows[searchId]">
            {{ follows[searchId] ? '取消关注' : '关注TA' }}
          </el-button>
        </el-row>
      </el-row>
    </el-header>
    <el-container class="sub-container">
      <el-main class="user-main">
        <el-row class="user-creation">
          <el-row class="bar" align="middle">
            <el-row v-for="item in barMeta" class="each" align="middle" justify="center"
                    :class="{'select':item.key === currentSelect}" @click="barSelect(item)"
            >{{ item.label }}
              <span class="statistic">{{ data[item.key] }}</span>
              <el-row class="bottom-line" v-show="item.key === currentSelect"></el-row>
            </el-row>
          </el-row>
          <el-row class="body">
            <router-view v-slot="{ Component }">
              <component :is="Component" v-bind:follows="follows"/>
            </router-view>
          </el-row>
        </el-row>
      </el-main>
      <el-affix>
        <el-aside class="user-aside">
          <el-row class="medal-block" v-if="countOfMedal">
            <el-row class="title">所获勋章</el-row>
            <el-row class="body">
              <el-row class="each" justify="center" v-for="(value, key) in data['medal']"
                      v-show="data['medal'][key] === 1">
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
          </el-row>
          <el-row class="achieve-block">
            <el-row class="title">个人成就</el-row>
            <el-row class="body">
              <el-row v-for="item in achieveMeta" class="each" align="middle">
                <svg class="symbol-icon icon" aria-hidden="true">
                  <use :xlink:href="item.icon"></use>
                </svg>
                <el-row align="middle" class="label">{{ item.label }}</el-row>
                <el-row align="middle" class="word">{{
                    data[item.key] > 1000 ? (data[item.key] / 1000).toFixed(1) + "k" : data[item.key] || 0
                  }}
                </el-row>
              </el-row>
            </el-row>
          </el-row>
          <el-row class="follow-block" align="middle">
            <el-row class="follow" align="middle">
              <span class="label">关注了</span>
              <span class="word">{{
                  data["follow"] > 1000 ? (data["follow"] / 1000).toFixed(1) + "k" : data["follow"] || 0
                }}</span>
            </el-row>
            <el-divider class="divider" direction="vertical"/>
            <el-row class="followed" align="middle">
              <span class="label">关注者</span>
              <span class="word">{{
                  data["followed"] > 1000 ? (data["followed"] / 1000).toFixed(1) + "k" : data["followed"] || 0
                }}</span>
            </el-row>
          </el-row>
          <el-row class="extend-block">
            <el-row class="each" justify="space-between" align="middle">
              <span>加入于</span>
              <span>{{ data["created"] && data["created"].split(" ")[0] }}</span>
            </el-row>
          </el-row>
        </el-aside>
      </el-affix>
    </el-container>
  </el-container>
</template>

<script setup>
import {onBeforeRouteLeave, useRoute} from "vue-router";
import {storeToRefs} from "pinia"
import {onBeforeMount, ref} from "vue"
import {get, post} from "../../utils/axios";
import {error, success, warning} from "../../utils/message";
import {getAssets, reverse, setTitle} from "../../utils/globalFunc";
import {userMainStore} from "../../store/user";
import {baseMainStore} from "../../store/base";
import router from "../../router";
import {removeScrollToBottomListen} from "../../utils/scroll";
import {GetMedalIntroduce, GetMedalMap} from "../creation/component/medal";

const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid, cos} = storeToRefs(userStore)
const {cover, avatar} = storeToRefs(baseStore)
const coverImage = getAssets("cover.jpeg")


let barMeta = [{
  key: "timeline",
  label: "动态",
  router: "user.timeline"
}, {
  key: "article",
  label: "文章",
  router: "user.article"
}, {
  key: "column",
  label: "专栏",
  router: "user.column"
}, {
  key: "talk",
  label: "讨论",
  router: "user.talk"
}, {
  key: "collections",
  label: "收藏",
  router: "user.collect"
}, {
  key: "follow",
  label: "关注",
  router: "user.follow"
}]

let achieveMeta = [{
  key: "agree",
  label: "被点赞",
  icon: "#icon-dianzan"
}, {
  key: "view",
  label: "被阅读",
  icon: "#icon-yuedu"
}, {
  key: "collect",
  label: "被收藏",
  icon: "#icon-shoucang"
}]

let levelMap = {
  "level1": {"icon": "icon-level1", "color": "#bdc1c6"},
  "level2": {"icon": "icon-level2", "color": "#00e676"},
  "level3": {"icon": "icon-level3", "color": "#40c4ff"},
  "level4": {"icon": "icon-level4", "color": "#ffab40"},
  "level5": {"icon": "icon-level5", "color": "#ff6500"},
  "level6": {"icon": "icon-level6", "color": "#ff1744"},
}

let data = ref({
  uuid: "",
  create: "",
  avatar: "",
  username: "暂无数据",
  school: "",
  company: "",
  job: "",
})

let currentSelect = ref(useRoute().query["menu"])
let searchId = ref(useRoute().query["id"])
let followLoading = ref(false)
let follows = ref({})
let coverColor = ref()
let coverColorBorder = ref()
let uploading = ref(false)
let percentage = ref(0)
let countOfMedal = ref(0)
let coverUrl = ref("")
let level = ref("icon-level1")
let levelColor = ref("#bdc1c6")
let medalMap = ref({})
let medalIntroduce = ref({})
let token = null

function init() {
  setTitle("个人主页")
  initData()
  getData()
  getUserFollows()
}

function initData() {
  coverUrl.value = cover.value.baseUrl + searchId.value + '/cover.webp'
  medalMap.value = GetMedalMap()
  medalIntroduce.value = GetMedalIntroduce()
  token = localStorage.getItem(import.meta.env.VITE_MATRIX_TOKEN_KEY)
}

function getUserFollows() {
  if (!searchId.value && !uuid.value) {
    return
  }
  get("/v1/get/user/follows").then(function (reply) {
    follows.value = reply.data["follows"]
  })
}

function getUserMedal() {
  if (!searchId.value) {
    return
  }
  get("/v1/get/user/medal?uuid=" + searchId.value).then(function (reply) {
    data.value["medal"] = reply.data
    Object.keys(data.value["medal"]).forEach(function (item) {
      if (data.value["medal"][item]) {
        countOfMedal.value += 1
      }
    })
  })
}

function getData() {
  get("/v1/get/user/info/visitor?uuid=" + searchId.value).then(function (reply) {
    data.value = reply.data
    setTitle(data["username"] + "的个人主页")
    getLevel()
    getUserMedal()
  }).catch(function () {
    error("用户资料获取失败")
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

function getCoverColor() {
  let reverseColor = reverse("user-cover", "user-cover-inner")
  coverColor.value = "rgb(" + reverseColor + ",0.8)"
  coverColorBorder.value = "rgb(" + reverseColor + ",0.12)"
}

function barSelect(item) {
  removeScrollToBottomListen()
  currentSelect.value = item.key
  router.push({name: item.router, query: {id: searchId.value, menu: item.key}})
}

function earthClick() {
  data.value["homepage"] && window.open(data.value["homepage"]);
}

function follow() {
  if (!searchId.value) {
    return
  }

  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }

  if (follows.value[searchId.value]) {
    cancelFollow()
  } else {
    setFollow()
  }
}

function setFollow() {
  followLoading.value = true
  post("/v1/set/user/follow", {uuid: searchId.value}).then(function () {
    success("已关注")
    follows.value[searchId.value] = true
  }).catch(function () {
    error("关注出错，请稍后再试")
  }).then(function () {
    followLoading.value = false
  })
}

function cancelFollow() {
  followLoading.value = true
  post("/v1/cancel/user/follow", {uuid: searchId.value}).then(function () {
    success("已取消关注")
    follows.value[searchId.value] = false
  }).catch(function () {
    error("取消出错，请稍后再试")
  }).then(function () {
    followLoading.value = false
  })
}

function coverUpload(UploadRequestOptions) {
  if (!uuid.value || !token) {
    warning("账号未登录，请先登录")
    return
  }

  percentage.value = 0
  uploading.value = true
  let file = UploadRequestOptions.file
  let filetype = UploadRequestOptions.file.type.split("/")[1]
  cos.value.uploadFile({
    Bucket: cover.value.bucket,
    Region: cover.value.region,
    Key: cover.value.key + uuid.value + "/cover." + filetype,
    Headers: {
      'x-cos-meta-token': token,
      'Pic-Operations':
          '{"is_pic_info": 1, "rules": [{"fileid": "cover.webp", "rule": "imageMogr2/format/webp/interlace/0/quality/100"}]}'
    },
    Body: file,
    onProgress: function (progressData) {
      percentage.value = progressData.percent * 100
    }
  }, function (err) {
    uploading.value = false
    if (err) {
      error("背景上传失败，请稍后再试")
      return
    }
    success("背景上传成功")
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      coverUrl.value = reader.result;
    };
  })
}

function beforeCoverUpload(rawFile) {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    error('图片必须是 jpg/jpeg/png 格式的')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    error('图片大小不超过 2MB')
    return false
  }
  return true
}

function medalSvg(key) {
  return getAssets(key + ".svg")
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang="scss">
.user-container {
  width: 1000px;
  margin: auto;
  padding: 20px 0;

  .user-cover {
    width: 100%;
    height: fit-content;
    padding: unset;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--el-border-color-lighter);

    .cover {
      width: 100%;
      height: 240px;
    }

    .cover-upload {
      position: absolute;
      top: 24px;
      right: 24px;

      .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
      }

      .upload-block {
        padding: 5px 10px;
        color: v-bind(coverColor);
        opacity: .8;
        border: 1px solid v-bind(coverColorBorder);

        .world {
          margin: 0 5px;
          font-size: 14px;
        }
      }
    }

    .user-card {
      width: 100%;
      padding: 0 20px 24px;
      min-height: 164px;
      background-color: var(--el-color-white);

      .user-avatar {
        margin-right: 24px;
        font-size: 80px;
        position: absolute;
        top: -25px;
        border: 4px solid var(--el-color-white);
      }

      .user-info {
        width: calc(100% - 124px);
        margin-right: 24px;
        flex-direction: column;
        padding-top: 16px;
        padding-left: 32px;
        border-left: 164px solid transparent;

        .title {
          word-break: break-all;
          width: 100%;
          font-size: 26px;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 16px;
          color: var(--el-text-color-primary);
        }

        .level {
          margin: 0 10px;
          font-size: 30px;
          font-weight: 500;
          color: v-bind(levelColor)
        }

        .content {
          width: 100%;
          flex-direction: column;

          .school, .company, .introduce {
            margin-bottom: 8px;
            flex-wrap: nowrap;

            .icon {
              vertical-align: middle;
              margin-right: 8px;
              color: var(--el-text-color-secondary);
            }

            .word {
              font-size: 14px;
              color: var(--el-text-color-secondary);
              display: inline-block;
              max-width: 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .word-intro {
              vertical-align: middle;
              font-size: 14px;
              color: var(--el-text-color-secondary);
            }
          }
        }
      }

      .user-operation {
        width: 100px;
        flex-direction: column;
        padding-top: 16px;

        .pages {
          width: 100%;
          color: var(--el-text-color-secondary);

          .earth-color {
            color: var(--el-color-primary);
            cursor: pointer;
          }
        }

        .button {
          width: 100px;
        }
      }
    }
  }

  .sub-container {
    justify-content: space-between;

    .user-main {
      width: 708px;
      padding: unset;
      flex: unset;

      .user-creation {
        width: 100%;
        margin-top: 10px;
        background-color: var(--el-color-white);
        border: 1px solid var(--el-border-color-lighter);

        .bar {
          width: 100%;
          height: 48px;
          padding: 0 20px;
          border-bottom: 1px solid var(--el-border-color-light);

          .each {
            position: relative;
            height: 100%;
            cursor: pointer;
            margin-right: 30px;
            color: var(--el-text-color-regular);

            .statistic {
              padding: 0 5px;
            }

            .bottom-line {
              content: "";
              position: absolute;
              width: 100%;
              height: 3px;
              border-radius: 50px;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
              z-index: 10;
              background-color: var(--el-color-primary);
            }
          }

          .select {
            font-weight: 500;
            color: var(--el-text-color-primary);
          }
        }

        .body {
          width: 100%;
        }
      }
    }

    .user-aside {
      width: 285px;
      margin-top: 10px;

      .medal-block {
        background-color: var(--el-color-white);
        width: 100%;
        border: 1px solid var(--el-border-color-lighter);
        margin-bottom: 12px;

        .title {
          width: 100%;
          height: 52px;
          padding: 16px;
          font-weight: 500;
          border-bottom: 1px solid var(--el-border-color-lighter);
        }

        .body {
          width: 100%;
          padding: 16px;

          .each {
            box-sizing: border-box;
            margin: 0;
            min-width: 0;
            width: 20%;
            padding-left: 5px;
            padding-right: 5px;
            padding-bottom: 10px;

            .medal {
              width: 40px;
              height: 40px;
            }
          }
        }
      }

      .achieve-block {
        background-color: var(--el-color-white);
        width: 100%;
        border: 1px solid var(--el-border-color-lighter);
        margin-bottom: 12px;

        .title {
          width: 100%;
          height: 52px;
          padding: 16px;
          font-weight: 500;
          border-bottom: 1px solid var(--el-border-color-lighter);
        }

        .body {
          width: 100%;
          padding: 16px;

          .each {
            width: 100%;
            margin-bottom: 20px;

            .icon {
              font-size: 25px;
            }

            .label {
              margin-left: 10px;
              font-size: 15px;
              color: var(--el-text-color-primary);
            }

            .word {
              margin-left: 10px;
              font-size: 14px;
              color: var(--el-text-color-regular);
            }
          }
        }
      }

      .follow-block {
        height: 75px;
        width: 100%;
        background-color: var(--el-color-white);
        border: 1px solid var(--el-border-color-lighter);
        margin-bottom: 12px;

        .divider {
          height: 30px;
          margin: unset;
        }

        .follow, .followed {
          width: calc(50% - 1px);
          flex-direction: column;

          .label {
            font-weight: 500;
            color: var(--el-text-color-primary);
          }

          .word {
            margin-top: 5px;
            font-size: 14px;
            color: var(--el-text-color-secondary);
          }
        }
      }

      .extend-block {
        width: 100%;

        .each {
          width: 100%;
          padding: 16px;
          font-size: 15px;
          height: 50px;
          border-top: 1px solid var(--el-border-color-light);
          border-bottom: 1px solid var(--el-border-color-light);
        }
      }
    }
  }
}
</style>