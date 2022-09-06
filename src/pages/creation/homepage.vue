<template>
  <el-container class="homepage-container">
    <el-row class="homepage-block" justify="center">
      <Score :score="data['score'] || 0" :username="data['username']"></Score>
    </el-row>
    <el-row class="homepage-block">
      <Statistic :data="data"></Statistic>
    </el-row>
    <el-row class="homepage-block">
      <Medal></Medal>
    </el-row>
    <el-row class="homepage-block" justify="space-between">
      <el-row class="title">最新文章</el-row>
      <el-row class="operate" align="middle" @click="router.push({name: 'creation.content', query: {menu: 'article'}})">
        <span>查看全部</span>
        <el-icon class="arrow">
          <ArrowRight/>
        </el-icon>
      </el-row>
      <article-creation-list :mode="'simple'"></article-creation-list>
    </el-row>
    <el-row class="homepage-block" justify="space-between">
      <el-row class="title">最新专栏</el-row>
      <el-row class="operate" align="middle" @click="router.push({name: 'creation.content', query: {menu: 'column'}})">
        <span>查看全部</span>
        <el-icon class="arrow">
          <ArrowRight/>
        </el-icon>
      </el-row>
      <column-creation-list :mode="'simple'"></column-creation-list>
    </el-row>
    <el-row class="homepage-block" justify="space-between">
      <el-row class="title">最新讨论</el-row>
      <el-row class="operate" align="middle" @click="router.push({name: 'creation.content', query: {menu: 'talk'}})">
        <span>查看全部</span>
        <el-icon class="arrow">
          <ArrowRight/>
        </el-icon>
      </el-row>
      <talk-creation-list :mode="'simple'"></talk-creation-list>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onBeforeMount} from "vue"
import Score from "./component/homepage/score.vue";
import Statistic from "./component/homepage/statistic.vue";
import Medal from "./component/homepage/medal.vue";
import ArticleCreationList from "../article/component/creation.vue";
import ColumnCreationList from "../column/component/creation.vue";
import router from "../../router";
import TalkCreationList from "../talk/component/creation.vue";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

let data = ref(null)

function init() {
  initData()
}

function initData() {
  data.value = props.data
}

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.homepage-container {
  width: 100%;
  flex-direction: column;

  .homepage-block {
    width: 100%;
    background-color: var(--el-color-white);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 10px;

    .title {
      height: fit-content;
      font-weight: 500;
      line-height: 31px;
      font-size: 20px;
    }

    .operate {
      font-size: 14px;
      color: var(--el-text-color-placeholder);
      margin: 0 0 20px;
      cursor: pointer;

      .arrow {
        margin-left: 5px;
      }
    }
  }
}
</style>