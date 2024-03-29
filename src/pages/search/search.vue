<template>
  <el-container class="search-container">
    <el-backtop></el-backtop>
    <el-row class="search-block">
      <el-row class="search">
        <el-input class="input" prefix-icon="Search" placeholder="请输入搜索内容" v-model="input" maxlength="100" show-word-limit
                  @change="inputChange"></el-input>
      </el-row>
    </el-row>
    <el-row class="option-block">
      <el-space class="options" :size="50">
        <el-row v-for="item in options" :key="item.key" class="each" :class="{'select':current === item.key}"
                @click="menuChange(item.key)" align="middle">
          <el-icon :size="18">
            <component :is="item.icon"></component>
          </el-icon>
          <span class="label">{{ item.label }}</span>
        </el-row>
      </el-space>
    </el-row>
    <el-row class="main-block">
      <el-row class="main">
        <el-row class="menu" align="middle" v-if="current !== 'user'">
          <el-space class="each">
            <span class="label">标签</span>
            <el-tag
                v-for="item in selectedTags"
                :key="item"
                type="info"
                class="tags"
                effect="light"
                round
            >
              {{ item }}
            </el-tag>
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
          </el-space>
          <el-space class="each" :size="10">
            <span class="label">时间</span>
            <el-select v-model="timeSelect" @change="timeChange">
              <el-option
                  v-for="item in timeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-space>
        </el-row>
        <news-search-list v-if="current === 'news'" ref="listRef" :search="searchBuild()" :time="timeSelect"
                             :tags="selectedTags"></news-search-list>
        <article-search-list v-if="current === 'article'" ref="listRef" :search="searchBuild()" :time="timeSelect"
                             :tags="selectedTags"></article-search-list>
        <talk-search-list v-if="current === 'talk'" ref="listRef" :search="searchBuild()" :time="timeSelect"
                          :tags="selectedTags"></talk-search-list>
        <column-search-list v-if="current === 'column'" ref="listRef" :search="searchBuild()" :time="timeSelect"
                            :tags="selectedTags"></column-search-list>
        <user-search-list v-if="current === 'user'" ref="listRef" :search="searchBuild()"></user-search-list>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onBeforeUnmount, onMounted} from "vue";
import {onBeforeRouteLeave, useRoute} from "vue-router";
import NewsSearchList from "../news/search.vue";
import ArticleSearchList from "../article/component/search.vue";
import TalkSearchList from "../talk/component/search.vue";
import ColumnSearchList from "../column/component/search.vue";
import UserSearchList from "../user/component/search.vue";
import {removeScrollToBottomListen} from "../../utils/scroll";
import {setTitle} from "../../utils/globalFunc";

let mainBody = null
let listRef = ref()
let current = ref("news")
let input = ref(useRoute().query["search"] || "")
let tagFilter = ref(false)
let selectedTags = ref([])
let timeSelect = ref("new")
let options = [{
  key: "news",
  label: "头条",
  icon: "document",
},{
  key: "article",
  label: "文章",
  icon: "document",
}, {
  key: "column",
  label: "专栏",
  icon: "files",
}, {
  key: "talk",
  label: "讨论",
  icon: "chat-dot-round",
}, {
  key: "user",
  label: "找人",
  icon: "user",
}]

let timeOptions = ref([
  {
    label: "时间不限",
    value: "new"
  },
  {
    label: "过去一天内",
    value: "1day"
  },
  {
    label: "过去一周内",
    value: "1week"
  },
  {
    label: "过去一个月内",
    value: "1month"
  },
  {
    label: "过去一个年内",
    value: "1year"
  }
])

function inputChange() {
  listRef.value.searchChange(searchBuild(), timeSelect.value, selectedTags.value)
}

function filterByTags() {
  tagFilter.value = false
  listRef.value.searchChange(searchBuild(), timeSelect.value, selectedTags.value)
}

function timeChange(time) {
  listRef.value.searchChange(searchBuild(), time, selectedTags.value)
}

function menuChange(key) {
  removeScrollToBottomListen()
  if (key === 'user') {
    selectedTags.value = []
    timeSelect.value = "new"
  }
  current.value = key
}

function searchBuild() {
  let tags = selectedTags.value.join(" ")
  if (input.value === "") {
    return tags
  }
  if(tags){
    return [input.value, tags].join(" ")
  }
  return input.value
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onBeforeUnmount(function () {
  mainBody.style.padding = "20px"
})


onMounted(function () {
  setTitle("站内搜索")
  mainBody = document.getElementsByClassName("main-body")[0]
  mainBody.style.padding = "unset"
})
</script>


<style scoped lang="scss">
.search-container {
  width: 100%;
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

  .search-block {
    width: 100%;
    background-color: var(--el-color-white);

    .search {
      width: 700px;
      margin: auto;
      padding-top: 2.5rem;
      padding-bottom: 2.25rem;

      .input {
        width: 560px;
        height: 40px;

        ::v-deep(.el-input__wrapper) {
          border-radius: 9999px;
          box-shadow: unset;
          background-color: rgba(0, 10, 32, .05);
        }

        ::v-deep(.el-input__count-inner){
          background: unset;
        }
      }
    }
  }

  .option-block {
    width: 100%;
    background-color: var(--el-color-white);

    .options {
      width: 700px;
      margin: auto;

      .each {
        cursor: pointer;
        height: 30px;
        color: var(--el-text-color-secondary);

        .label {
          margin-left: 5px;
        }
      }

      .select {
        color: var(--el-text-color-primary);
        border-bottom: 2px solid var(--el-text-color-primary);
      }
    }
  }

  .main-block {
    width: 100%;

    .main {
      background-color: var(--el-color-white);
      width: 700px;
      margin: 1.5rem auto;

      .menu {
        width: 100%;

        .each {
          padding: 5px 16px;
          width: 100%;
          height: 50px;
          flex-wrap: wrap;
          border-bottom: 1px solid var(--el-border-color-lighter);

          .label {
            font-size: 15px;
            color: var(--el-text-color-primary);
          }

          .filter {
            font-size: 14px;
            color: var(--el-text-color-secondary);
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>