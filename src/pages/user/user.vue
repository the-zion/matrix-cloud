<template>
  <el-container class="user-container">
    <el-backtop></el-backtop>
    <el-main class="user-main">
      <el-row class="user-card" justify="space-between">
        <el-avatar class="user-avatar" :src="data.avatar || avatar.baseUrl + searchId + '.webp'" :size="90"
                   shape="square">
          <el-icon :size="50">
            <UserFilled/>
          </el-icon>
        </el-avatar>
        <el-row class="user-info">
          <el-row class="title">{{ data.username }}</el-row>
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
          <el-button type="primary">编辑个人资料</el-button>
        </el-row>
      </el-row>
      <el-row class="user-creation">
        <el-row class="bar" align="middle">
          <el-row v-for="item in barMeta" class="each" align="middle" justify="center"
                  :class="{'select':item.key === currentSelect}" @click="barSelect(item)"
          >{{ item.label }}
            <el-row class="bottom-line" v-show="item.key === currentSelect"></el-row>
          </el-row>
        </el-row>
        <el-row class="body">
          <Article v-if="currentSelect === 'article'"></Article>
          <Column v-if="currentSelect === 'column'"></Column>
          <Talk v-if="currentSelect === 'talk'"></Talk>
          <Collect v-if="currentSelect === 'collect'"></Collect>
          <Follow v-if="currentSelect === 'follow'"></Follow>
        </el-row>
      </el-row>
    </el-main>
    <el-affix>
      <el-aside class="user-aside">
        <el-row class="achieve-block">
          <el-row class="title">个人成就</el-row>
          <el-row class="body">
            <el-row v-for="item in achieveMeta" class="each" align="middle">
              <svg class="symbol-icon icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
              </svg>
              <el-row align="middle" class="label">{{ item.label }}</el-row>
              <el-row align="middle" class="word">{{
                  achieveData[item.key] > 1000 ? (achieveData[item.key] / 1000).toFixed(1) + "k" : achieveData[item.key]
                }}
              </el-row>
            </el-row>
          </el-row>
        </el-row>
        <el-row class="follow-block" align="middle">
          <el-row class="follow" align="middle">
            <span class="label">关注了</span>
            <span class="word">{{
                followData["follow"] > 1000 ? (followData["follow"] / 1000).toFixed(1) + "k" : followData["follow"]
              }}</span>
          </el-row>
          <el-divider class="divider" direction="vertical"/>
          <el-row class="followed" align="middle">
            <span class="label">关注者</span>
            <span class="word">{{
                followData["followed"] > 1000 ? (followData["followed"] / 1000).toFixed(1) + "k" : followData["followed"]
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
</template>

<script setup>
import {onMounted, ref} from "vue"
import {error, success, warning} from "../../utils/message";
import {get, post} from "../../utils/axios";
import {storeToRefs} from "pinia"
import Article from "./component/article.vue";
import Column from "./component/column.vue";
import Talk from "./component/talk.vue";
import Collect from "./component/collect.vue";
import Follow from "./component/follow.vue";
import {userMainStore, baseMainStore} from "../../store";
import router from "../../router";
import {useRoute} from "vue-router";

const baseStore = baseMainStore()
const {avatar} = storeToRefs(baseStore)

let barMeta = [{
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
  key: "collect",
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
  icon: "#icon-shoucang"
}, {
  key: "collect",
  label: "被收藏",
  icon: "#icon-yuedu"
}]

let data = ref({
  uuid: "",
  create: "",
  avatar: "",
  username: "xxxxxx",
  school: "",
  company: "",
  job: ""
})

let achieveData = ref({
  agree: 10000,
  view: 4321,
  collect: 11324,
})

let followData = ref({
  follow: 10000,
  followed: 11324
})

let currentSelect = ref(useRoute().query["menu"])
let searchId = ref(useRoute().query["id"])

function init() {
  getData()
}

function getData() {
  get("/v1/get/user/info?uuid=" + searchId.value).then(function (reply) {
    data.value = reply.data
  }).catch(function () {
    error("用户资料获取失败")
  })
}

function barSelect(item) {
  currentSelect.value = item.key
  router.push({name: item.router, query: {menu: item.key}})
}

function earthClick() {
  window.open(data.value["homepage"]);
}

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">
.user-container {
  width: 960px;
  margin: auto;
  justify-content: space-between;

  .user-main {
    width: 708px;
    padding: unset;
    flex: unset;

    .user-card {
      width: 100%;
      padding: 30px;
      background-color: var(--el-color-white);
      border: 1px solid var(--el-border-color-lighter);

      .user-avatar {
        margin-right: 24px;
      }

      .user-info {
        width: 388px;
        margin-right: 24px;
        flex-direction: column;

        .title {
          word-break: break-all;
          width: 100%;
          font-size: 28px;
          font-weight: 600;
          line-height: 1.2;
          margin-bottom: 12px;
          color: var(--el-text-color-primary);
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
        width: calc(100% - 530px);
        flex-direction: column;

        .pages {
          width: 100%;
          color: var(--el-text-color-secondary);

          .earth-color {
            color: var(--el-color-primary);
            cursor: pointer;
          }
        }
      }
    }

    .user-creation {
      width: 100%;
      margin-top: 12px;
      background-color: var(--el-color-white);
      border: 1px solid var(--el-border-color-lighter);

      .bar {
        width: 100%;
        height: 48px;
        border-bottom: 1px solid var(--el-border-color-light);

        .each {
          position: relative;
          width: 72px;
          height: 100%;
          cursor: pointer;
          color: var(--el-text-color-regular);

          .bottom-line {
            content: "";
            position: absolute;
            width: 16px;
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
    width: 240px;

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
</style>