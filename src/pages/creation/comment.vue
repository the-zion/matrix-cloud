<template>
  <el-container class="comment-container">
    <el-header class="comment-header" height="50px">
      <el-row v-for="item in menu" class="option" align="middle">
        <span>{{ item.label }}</span>
        <span class="bottom-line" v-show="currentMenu === item.key"></span>
      </el-row>
    </el-header>
    <Comment></Comment>
  </el-container>
</template>

<script setup>
import {onBeforeMount, ref} from "vue"
import {onBeforeRouteLeave, useRoute} from "vue-router";
import {removeScrollToBottomListen} from "../../utils/scroll";
import Comment from "./component/comment/review.vue";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  }
})

const menu = [{
  key: "comment",
  label: "评论",
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
.comment-container {
  width: 100%;
  flex-direction: column;
  background-color: var(--el-color-white);

  .comment-header {
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