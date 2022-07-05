<template>
  <el-container class="home-container" v-if="page">
    <el-backtop></el-backtop>
    <el-row class="tags" justify="center" align="middle">
      <el-row class="area" justify="space-between" align="middle">
        <el-space class="block" :size="20">
          <span v-for="item in tags" class="label" :class="{'select': item === currentTag}" @click="currentTag = item">{{
              item
            }}</span>
        </el-space>
        <el-space :size="3" class="filter" @click="tagFilter = true">
          <el-icon>
            <Filter/>
          </el-icon>
          <span>筛选器</span>
        </el-space>
        <el-dialog
            v-model="tagFilter"
            destroy-on-close
            :width="480"
            custom-class="tag-filter-dialog"
            @close="tagFilter = false"

        >
          <matrix-tag v-model:selectedTags="selectedTags"></matrix-tag>
          <template #footer>
          <span>
            <el-button @click="tagFilter = false" round>取消</el-button>
            <el-button @click="filterByTags" round type="primary"
            >确定</el-button>
          </span>
          </template>
        </el-dialog>
      </el-row>
    </el-row>
    <el-row class="menu" justify="space-between">
      <el-row v-for="item in menu" :key="item.key" class="menu-item" @click="select(item)">
        <span class="label" :class="{'select':page === item.key}">{{ item.label }}</span>
        <el-image fit="fill" class="image" :src="item.image"></el-image>
      </el-row>
    </el-row>
    <el-row class="main" justify="space-between">
      <el-row class="left-area">
        <el-row class="header" align="middle">
          <span class="label" :class="{'select': mode === 'new'}" @click="mode = 'new'">最新</span>
          <el-divider direction="vertical"></el-divider>
          <span class="label" :class="{'select': mode === 'hot'}" @click="mode = 'hot'">最热</span>
        </el-row>
        <el-row class="body">
          <matrix-article-list v-if="page === 'article'"></matrix-article-list>
          <matrix-column-list v-if="page === 'column'"></matrix-column-list>
          <matrix-talk-list v-if="page === 'talk'"></matrix-talk-list>
        </el-row>
      </el-row>
      <el-row class="aside">
        <leader-board></leader-board>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {onMounted, ref} from "vue"
import router from "../../router";
import {useRoute} from "vue-router";
import LeaderBoard from "./component/leaderboard.vue"
import "../../utils/axios"
import {baseMainStore} from "../../store";
import {storeToRefs} from "pinia/dist/pinia.esm-browser";
import {removeScrollToBottomListen} from "../../utils/scroll";

const baseStore = baseMainStore()
const {images} = storeToRefs(baseStore)

let page = ref()
let mode = ref("new")
let currentTag = ref("全部")
let tagFilter = ref(false)
let selectedTags = ref([])
let tags = ref(["全部", "go", "k8s", "云原生", "python", "docker"])
let menu = ref([{
  key: "article",
  label: "博客文章",
  image: images.value.baseUrl + "/article.svg",
}, {
  key: "column",
  label: "专栏分享",
  image: images.value.baseUrl + "/column.svg"
}, {
  key: "talk",
  label: "讨论发起",
  image: images.value.baseUrl + "/talk.svg"
}, {
  key: "news",
  label: "每日新闻",
  image: images.value.baseUrl + "/news.svg",
}])

function init() {
  initData()
}

function initData() {
  page.value = useRoute().query["page"]
}

function select(item) {
  page.value = item.key
  router.push({name: "home", query: {page: item.key}})
  removeScrollToBottomListen()
}

// router.afterEach(function (route) {
//   current.value = route.name.split(".")[1]
// })

function filterByTags() {

}

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">
.home-container {
  width: 100%;
  margin: auto;
  flex-direction: column;

  ::v-deep(.tag-filter-dialog) {
    border-radius: 8px;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: 20px 20px 0 20px
    }
  }

  .tags {
    width: 100%;
    min-height: 50px;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--el-border-color-lighter);

    .area {
      width: 980px;
      height: 100%;

      .block {
        width: 900px;
        flex-wrap: wrap;
        margin: 10px 0;

        .label {
          font-size: 15px;
          color: var(--el-text-color-secondary);
          cursor: pointer;
          margin: 8px 0;
        }

        .select {
          color: var(--el-color-primary);
        }
      }

      .filter {
        font-size: 14px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
      }
    }
  }

  .menu {
    width: 980px;
    margin: 10px auto;

    .menu-item {
      width: 240px;
      height: 140px;
      background-color: var(--el-color-white);
      border-radius: 3px;
      border: 1px solid var(--el-border-color-lighter);
      padding: 12px 0 0 16px;
      flex-direction: column;
      cursor: pointer;

      .label {
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;
        color: var(--el-text-color-regular);
      }

      .image {
        width: calc(100% - 82px);
        height: 100%;
      }

      .select {
        color: var(--el-color-primary);
      }
    }
  }

  .main {
    width: 980px;
    margin: auto;

    .left-area {
      width: 710px;
      height: fit-content;
      background-color: var(--el-color-white);
      border: 1px solid var(--el-border-color-lighter);
      flex-direction: column;
      margin-bottom: 10px;

      .header {
        height: 46px;
        width: 100%;
        border-bottom: 1px solid var(--el-border-color-lighter);
        padding: 0 20px;

        .label {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          cursor: pointer;
        }

        .select {
          color: var(--el-color-primary);
        }
      }

      .body {
        width: 100%;
      }
    }

    .aside {
      width: 260px;
    }
  }
}
</style>