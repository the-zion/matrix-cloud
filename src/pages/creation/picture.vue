<template>
  <el-container class="picture-container">
    <el-header class="picture-header" height="50px">
      <el-row v-for="item in menu" class="option" align="middle" @click="menuSelect(item)">
        <span>{{ item.label }}</span>
        <span class="bottom-line" v-show="currentMenu === item.key"></span>
      </el-row>
    </el-header>
    <Avatar v-if="currentMenu === 'avatar'"></Avatar>
    <Cover v-if="currentMenu === 'cover'"></Cover>
    <Article v-if="currentMenu === 'article'"></Article>
    <Column v-if="currentMenu === 'column'"></Column>
    <Talk  v-if="currentMenu === 'talk'"></Talk>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import {onBeforeRouteLeave, useRoute} from "vue-router";
import router from "../../router";
import {removeScrollToBottomListen} from "../../utils/scroll";
import Article from "./component/picture/article.vue";
import Talk from "./component/picture/talk.vue";
import Avatar from "./component/picture/avatar.vue";
import Cover from "./component/picture/cover.vue";
import Column from "./component/picture/column.vue";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

function menuSelect(item) {
  removeScrollToBottomListen()
  currentMenu.value = item.key
  router.push({name: "creation.picture", query: {menu: item.key}})
}


const menu = [{
  key: "avatar",
  label: "头像",
}, {
  key: "cover",
  label: "背景",
},{
  key: "article",
  label: "文章",
},{
  key: "column",
  label: "专栏",
},{
  key: "talk",
  label: "讨论",
}]

let currentMenu = ref(useRoute().query["menu"])

function init() {
}

onBeforeRouteLeave((to, from) => {
  removeScrollToBottomListen()
})

onBeforeMount(function () {
  init()
})
</script>

<style scoped lang="scss">
.picture-container {
  width: 100%;
  flex-direction: column;
  background-color: var(--el-color-white);

  .picture-header {
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