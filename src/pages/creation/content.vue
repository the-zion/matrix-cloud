<template>
  <el-container class="content-container">
    <el-header class="content-header" height="50px">
      <el-row v-for="item in menu" class="option" align="middle" @click="menuSelect(item)">
        <span>{{ item.label }}</span>
        <span class="statistic">{{ data[item.key] || 0 }}</span>
        <span class="bottom-line" v-show="currentMenu === item.key"></span>
      </el-row>
    </el-header>
    <Article v-if="currentMenu === 'article'" @row-delete="rowDelete"></Article>
    <Column v-if="currentMenu === 'column'" @row-delete="rowDelete"></Column>
    <Talk v-if="currentMenu === 'talk'" @row-delete="rowDelete"></Talk>
    <Collect v-if="currentMenu === 'collections'" @row-delete="rowDelete"></Collect>
    <Subscribe v-if="currentMenu === 'subscribe'" @row-delete="rowDelete"></Subscribe>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import Article from "./component/content/article.vue";
import Column from "./component/content/column.vue";
import Talk from "./component/content/talk.vue";
import Collect from "./component/content/collect.vue";
import Subscribe from "./component/content/subscribe.vue";
import {onBeforeRouteLeave, useRoute} from "vue-router";
import router from "../../router";
import {removeScrollToBottomListen} from "../../utils/scroll";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

function menuSelect(item) {
  removeScrollToBottomListen()
  currentMenu.value = item.key
  router.push({name: "creation.content", query: {menu: item.key}})
}

const menu = [{
  key: "article",
  label: "文章",
}, {
  key: "column",
  label: "专栏",
}, {
  key: "talk",
  label: "讨论",
}, {
  key: "collections",
  label: "收藏",
}]

let data = ref({})
let currentMenu = ref(useRoute().query["menu"])

function rowDelete(value) {
  let r = data.value[currentMenu.value] - (value || 1)
  r >= 0 ? (data.value[currentMenu.value] = r) : (data.value[currentMenu.value] = 0)
}

function init() {
  initData()
}

function initData() {
  data.value = props.data
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})


onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.content-container {
  width: 100%;
  flex-direction: column;
  background-color: var(--el-color-white);

  .content-header {
    width: 100%;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    align-items: center;
    line-height: 22px;
    display: flex;

    .option {
      height: 100%;
      margin-right: 40px;
      position: relative;
      cursor: pointer;

      .statistic {
        margin-left: 5px;
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
  }
}
</style>