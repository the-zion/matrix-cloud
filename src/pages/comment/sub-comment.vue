<template>
  <el-container class="sub-comment-container">
    <el-row v-for="item in data" class="each" :key="item.id">
      <el-row class="header" justify="space-between" align="middle">
        <el-space>
          <el-avatar :size="30" :src="item.image"></el-avatar>
          <span class="name">{{ item.name }}</span>
        </el-space>
        <span class="time">{{ item.time }}</span>
      </el-row>
      <el-row class="main">
        <div v-html="item.html"></div>
      </el-row>
      <el-row class="footer" justify="space-between">
        <el-space>
          <el-space class="icon-block">
            <el-icon class="iconfont icon-like icon"></el-icon>
            <span class="num">{{
                item.agree > 1000 ? (item.agree / 1000).toFixed(1) + "k" : item.agree
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
      <el-row class="reply-block" v-if="currentReply === item.id">
        <matrix-reply></matrix-reply>
      </el-row>
    </el-row>
    <el-row class="footer" justify="center">
      <el-pagination

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
  name: "SubComment"
}
</script>

<script setup>
import {onMounted, ref, watch} from "vue"
import {scrollTo} from "../../utils/scroll";

let data = ref([])

let currentReply = ref()
let currentPage = ref()

function init() {
  getData()
}

function doReply(item) {
  if (currentReply.value === item.id) {
    currentReply.value = null
    return
  }
  currentReply.value = item.id
}

watch(currentPage, () => {
  scrollTo("sub-comment-block")
})

function getData() {
  for (let i = 0; i <= 9; i++) {
    data.value.push({
      id: i,
      name: "liusiyuan",
      html: '<p>hello</p>',
      image: '../../src/assets/images/boy.png',
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
.sub-comment-container {
  width: 100%;
  flex-direction: column;

  .each {
    width: 100%;
    padding: 8px 16px 0;
    margin-bottom: 12px;
    border-radius: 8px;
    background-color: #f7f7f7;

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
      padding: 12px 0 16px;
      border-top: 1px solid var(--el-border-color-lighter);

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

    .reply-block {
      margin-bottom: 20px;
      width: 100%
    }
  }

  .footer {
    width: 100%;
  }
}
</style>