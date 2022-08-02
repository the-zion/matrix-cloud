<template>
  <el-container class="comment-container" id="comment-container">
    <el-row v-for="item in data" class="each" :key="item.id" :class="props.shape">
      <el-row class="header" justify="space-between" align="middle">
        <el-space>
          <el-popover placement="top-start" :show-arrow="false" :width="312" trigger="hover" popper-class="popover">
            <template #reference>
              <el-avatar class="avatar" icon="UserFilled" @click="goToPage('user', 1)" :size="30" :src="item.avatar"/>
            </template>
            <matrix-user-mini-card></matrix-user-mini-card>
          </el-popover>
          <span class="name">{{ item.name }}</span>
        </el-space>
        <span class="time">{{ item.time }}</span>
      </el-row>
      <el-row class="main">
        <div v-html="item.html"></div>
      </el-row>
      <el-row class="footer" justify="space-between" :class="'footer-' + props.shape">
        <el-space>
          <el-space class="icon-block">
            <el-icon class="iconfont icon-like icon"></el-icon>
            <span class="num">{{
                item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree
              }}</span>
          </el-space>
          <el-space class="icon-block" @click="doUnFold(item)">
            <el-icon class="iconfont icon-message icon"></el-icon>
            <span class="num">{{
                item.comment > 1000 ? (item.comment / 1000).toFixed(1) + "k" : item.comment
              }}</span>
          </el-space>
          <el-space class="icon-block" @click="doReply(item)">
            <el-icon class="icon">
              <EditPen/>
            </el-icon>
            <span class="num">添加回复</span>
          </el-space>
        </el-space>
      </el-row>
      <el-row class="reply-block" v-if="currentReply === item.id" :class="'reply-block-' + props.shape">
        <matrix-reply></matrix-reply>
      </el-row>
      <el-row class="sub-comment-block" v-if="currentUnFold === item.id" id="sub-comment-block">
        <sub-comment :id="item.id"></sub-comment>
      </el-row>
    </el-row>
    <el-row class="footer" justify="center">
      <el-pagination
          background
          v-model:current-page="currentPage"
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
      />
    </el-row>
  </el-container>
</template>

<script>
export default {
  name: "MatrixComment"
}
</script>

<script setup>
import {onMounted, ref, watch} from "vue"
import SubComment from "./sub-comment.vue";
import {scrollTo} from "../../utils/scroll";
import {goToPage} from "../../utils/globalFunc";


const props = defineProps({
  shape: String
})

let data = ref([])
let currentReply = ref()
let currentUnFold = ref()
let currentPage = ref()

function init() {
  getData()
}

function doUnFold(item) {
  if (currentUnFold.value === item.id) {
    currentUnFold.value = null
    return
  }
  currentUnFold.value = item.id
}

function doReply(item) {
  if (currentReply.value === item.id) {
    currentReply.value = null
    return
  }
  currentReply.value = item.id
}

watch(currentPage, () => {
  scrollTo("comment-container")
})

function getData() {
  for (let i = 0; i <= 9; i++) {
    data.value.push({
      id: i,
      name: "liusiyuan",
      html: '<p>hello</p>',
      avatar: '../../src/assets/images/boy.png',
      time: "2022-05-22",
      agree: 2430,
      comment: 3200
    })
  }
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.comment-container {
  width: 100%;
  flex-direction: column;
  grid-gap: unset;

  .each {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);

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

      .icon-block {
        cursor: pointer;

        .icon {
          color: var(--el-text-color-secondary);
          cursor: pointer;
          font-size: 20px;
        }

        .num {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          cursor: pointer;
        }
      }
    }

    .footer-card {
      margin-top: unset;
      padding: 12px 0 16px;
      border-top: 1px solid var(--el-border-color-lighter);
    }

    .reply-block {
      margin-top: 20px;
      width: 100%
    }

    .reply-block-card {
      margin-top: unset;
      margin-bottom: 20px;
    }

    .sub-comment-block {
      margin-top: 20px;
      width: 100%;

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

  .card {
    background-color: var(--el-color-white);
    padding: 16px 16px 0;
    margin-bottom: 10px;
    border-radius: 8px;
    border: 1px solid var(--el-border-color-lighter);
  }

  .footer {
    width: 100%;
    margin-top: 20px;
  }
}
</style>