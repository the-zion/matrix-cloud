<template>
  <el-row class="comment-card">
    <el-row class="header" justify="space-between" align="middle">
      <el-space>
        <el-avatar :size="30" :src="props.data.image"></el-avatar>
        <span class="name">{{ props.data.name }}</span>
      </el-space>
      <span class="time">{{ props.data.time }}</span>
    </el-row>
    <el-row class="main">
      <div v-html="props.data.html"></div>
    </el-row>
    <el-row class="footer">
      <el-space>
        <el-space class="icon-block">
          <el-icon class="iconfont icon-like icon"></el-icon>
          <span class="num">{{
              props.data.agree > 1000 ? (props.data.agree / 1000).toFixed(1) + "k" : props.data.agree
            }}</span>
        </el-space>
        <el-space class="icon-block" @click="fold = !fold" v-show="props.comment">
          <el-icon class="iconfont icon-message icon"></el-icon>
          <span class="num">{{
              props.data.comment > 1000 ? (props.data.comment / 1000).toFixed(1) + "k" : props.data.comment
            }}</span>
        </el-space>
        <el-space class="icon-block" @click="reply = !reply">
          <el-icon class="iconfont icon-reply icon"></el-icon>
          <span class="num">回复</span>
        </el-space>
      </el-space>
    </el-row>
    <el-row class="reply-block" v-if="reply">
      <Reply></Reply>
    </el-row>
    <el-row class="sub-comment-block" v-if="fold">
      <span class="word" v-show="fold === true" @click="fold = false">收起回复</span>
      <SubComment :id="props.data.id"></SubComment>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "CommentCard"
}
</script>

<script setup>
import {ref} from "vue"
import Reply from './reply.vue'
import SubComment from "./sub-comment.vue";

const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  comment: {
    type: Boolean,
    default: true
  }
})

let reply = ref(false)
let fold = ref(false)

</script>

<style scoped lang="scss">
.comment-card {
  width: 100%;
  padding: 20px 0;

  .header {
    width: 100%;

    .name {
      font-size: 14px;
      color: var(--el-text-color-regular);
    }

    .time {
      font-size: 14px;
      color: var(--el-text-color-disabled);
    }
  }

  .main {
    width: 100%;
  }

  .footer {
    width: 100%;

    .icon-block {
      cursor: pointer;

      .icon {
        color: var(--el-text-color-secondary);
        cursor: pointer;
      }

      .num {
        font-size: 13px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
      }
    }
  }

  .reply-block {
    margin-top: 20px;
    width: 100%
  }

  .sub-comment-block {
    position: relative;
    margin-top: 20px;
    width: 100%;
    box-shadow: var(--el-box-shadow-lighter);
    padding: 20px 25px;

    .word {
      position: absolute;
      bottom: 28px;
      color: var(--el-text-color-placeholder);
      font-size: 14px;
      cursor: pointer;
      z-index: 1;
    }
  }
}
</style>