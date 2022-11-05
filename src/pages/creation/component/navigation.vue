<template>
  <el-container class="navigation-container">
    <el-row class="navigation-block" justify="center">
      <el-avatar class="avatar" icon="UserFilled" :size="80"
                 :src="avatar.baseUrl + uuid + '/avatar.webp'"/>
      <el-row class="username" justify="center">{{ username }}</el-row>
      <el-dropdown size="large" split-button type="primary" class="dropdown">
        内容创作
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="writeArticle">发布文章</el-dropdown-item>
            <el-dropdown-item @click="writeTalk">发布讨论</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-row v-for="item in menu" :key="item.key" class="each"
              :class="{'select': currentMenu === item.key && !item['children']}"
              @click="item['children']?(item['unfold'] = !item['unfold']):menuSelect(item)" fill>
        <el-row class="each-block" align="middle">
          <el-icon class="icon" :class="{'select': currentMenu === item.key && !item['children']}">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="label" :class="{'select': currentMenu === item.key && !item['children']}">{{ item.label }}</span>
          <el-icon class="icon" v-if="item['unfold'] && item['children']">
            <ArrowDownBold/>
          </el-icon>
          <el-icon class="icon" v-if="!item['unfold'] && item['children']">
            <ArrowUpBold/>
          </el-icon>
        </el-row>
        <el-collapse-transition>
          <div v-if="item['children'] && item['unfold']">
            <el-row class="each-block" v-for="sub in item['children']" @click.stop="menuSelect(sub)">
              <span class="sub-label" :class="{'select': currentMenu === sub.key}">{{ sub.label }}</span>
            </el-row>
          </div>
        </el-collapse-transition>
      </el-row>
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "MatrixCenterNavigation"
}
</script>

<script setup>
import {onBeforeMount, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {scrollToTop} from "../../../utils/scroll";
import {userMainStore} from "../../../store/user";
import {baseMainStore} from "../../../store/base";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";


const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar} = storeToRefs(baseStore)
const props = defineProps({
  username: String
})

let username = ref("neo")
let router = useRouter()
let currentMenu = ref(useRoute().name.split("creation.")[1])
let menu = ref([{
  key: "homepage",
  label: "首页",
  icon: "HomeFilled",
  router: "creation.homepage"
}, {
  key: "medal",
  label: "勋章管理",
  icon: "StarFilled",
  router: "creation.medal"
}, {
  key: "content",
  label: "内容管理",
  icon: "menu",
  router: "creation.content",
  query: {menu: 'article'}
}, {
  key: "comment",
  label: "评论管理",
  icon: "comment",
  unfold: true,
  children: [{
    key: "reply",
    label: "我回复的",
    router: "creation.reply",
    query: {menu: 'article'}
  }, {
    key: "replied",
    label: "回复我的",
    router: "creation.replied",
    query: {menu: 'article'}
  }],
}, {
  key: "review",
  label: "违规审核",
  icon: "avatar",
  unfold: true,
  children: [{
    key: "picture",
    label: "图片审核",
    router: "creation.picture",
    query: {menu: 'avatar'}
  }, {
    key: "review",
    label: "创作审核",
    router: "creation.review",
    query: {menu: 'article'}
  },{
    key: "comment",
    label: "评论审核",
    router: "creation.comment",
    query: {menu: 'comment'}
  }],
}])

function menuSelect(each) {
  let destination = {name: each.router}
  currentMenu.value = each.key
  scrollToTop()
  each.query && (destination["query"] = each.query)
  router.push(destination)
}

function writeArticle() {
  const {href} = router.resolve({
    name: "article.write",
    query: {mode: 'create'}
  });
  window.open(href, "_blank");
}

function writeTalk() {
  const {href} = router.resolve({
    name: "talk.write",
    query: {mode: 'create'}
  });
  window.open(href, "_blank");
}

watch(() => router.currentRoute.value.name, (newValue) => {
  scrollToTop()
  currentMenu.value = newValue.split("creation.")[1]
}, {immediate: true})

function init() {
  initData()
}

function initData() {
  username.value = props.username || "暂无数据"
}

onBeforeMount(function () {
  init()
})

</script>

<style scoped lang=scss>
.navigation-container {
  width: 100%;
  flex-direction: column;
  background-color: var(--el-color-white);
  padding: 8px;
  height: 700px;

  .navigation-block {
    width: 100%;

    .avatar {
      margin-top: 16px;
      font-size: 40px;
    }

    .username {
      width: 100%;
      margin: 10px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .dropdown {
      margin-bottom: 10px;

      ::v-deep(.el-button--primary:first-child) {
        width: 136px;
        font-weight: 500;
        font-size: 16px;
      }
    }

    .each {
      cursor: pointer;
      width: 170px;

      .select {
        color: var(--el-color-primary) !important;
      }

      .each-block {
        padding: 14px 18px;
        width: 100%;

        .icon {
          color: var(--el-text-color-regular);
        }

        .label {
          font-size: 15px;
          color: var(--el-text-color-regular);
          flex-grow: 1;
          margin-left: 10px;
        }

        .sub-label {
          font-size: 15px;
          color: var(--el-text-color-regular);
          flex-grow: 1;
          margin-left: 22.5px;
        }
      }

      .each-block:hover {
        background-color: var(--el-fill-color-lighter);
        width: 170px;
        border-radius: 6px;
      }
    }
  }
}
</style>