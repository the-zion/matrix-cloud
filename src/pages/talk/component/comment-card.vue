<template>
  <el-row class="comment-card">
    <Reply v-model:visible="visible" :name="props.data.name"></Reply>
    <el-row class="header" justify="space-between" align="middle">
      <el-space>
        <el-popover placement="top-start" :show-arrow="false" :width="312" trigger="hover" popper-class="popover">
          <template #reference>
            <el-avatar class="avatar" @click="goToPage('user', 1)" :size="22" :src="props.data.avatar"/>
          </template>
          <matrix-user-mini-card></matrix-user-mini-card>
        </el-popover>
        <span class="name">{{ props.data.name }}</span>
      </el-space>
      <span class="time">{{ props.data.time }}</span>
    </el-row>
    <el-row class="main">
      <div v-html="props.data.html"></div>
    </el-row>
    <el-row class="footer" justify="space-between">
      <el-space>
        <el-space class="icon-block">
          <el-icon class="iconfont icon-like icon" :size="20" color="var(--el-text-color-placeholder)"></el-icon>
          <span class="num">{{
              props.data.agree > 1000 ? (props.data.agree / 1000).toFixed(1) + "k" : props.data.agree
            }}</span>
        </el-space>
        <el-space class="icon-block" @click="fold = !fold" v-show="props.comment">
          <el-icon class="iconfont icon-message icon" :size="20" color="var(--el-text-color-placeholder)"></el-icon>
          <span class="num">{{
              props.data.comment > 1000 ? (props.data.comment / 1000).toFixed(1) + "k" : props.data.comment
            }}</span>
        </el-space>
      </el-space>
      <el-row class="reply-block" @click="visible = true">
        <el-icon class="icon" :size="20" color="var(--el-text-color-placeholder)">
          <EditPen/>
        </el-icon>
        <span class="word">添加回复</span>
      </el-row>
    </el-row>
    <el-row class="sub-comment-block" v-if="fold">
      <sub-comment :id="props.data.id"></sub-comment>
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
import SubComment from "./sub-comment.vue"
import Reply from "./reply.vue"
import {goToPage} from "../../../utils/globalFunc";

const props = defineProps({
  data: {
    type: Object,
    default: []
  },
  comment: {
    type: Boolean,
    default: true
  }
})

let fold = ref(false)
let visible = ref(false)
</script>

<style scoped lang="scss">
.comment-card {
  width: 100%;

  .header {
    width: 100%;

    .avatar {
      cursor: pointer;
    }

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
    padding: 12px 0 16px;
    border-top: 1px solid var(--el-border-color-lighter);

    .icon-block {
      cursor: pointer;

      .icon {
        cursor: pointer;
      }

      .num {
        font-size: 14px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
      }
    }

    .reply-block {
      .icon {
        margin-right: 5px;
      }

      .word {
        font-size: 14px;
        color: var(--el-text-color-secondary);
        cursor: pointer;
      }
    }
  }

  .sub-comment-block {
    width: 100%;
  }

}
</style>