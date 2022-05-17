<template>
  <el-container class="leaderboard">
    <el-row class="head" justify="space-around">
      <el-space v-for="item in options" direction="vertical" class="each" :size="3">
        <el-icon class="iconfont" :class="item.icon" :size="20"></el-icon>
        <span>{{ item.label }}</span>
      </el-space>
    </el-row>
    <el-affix>
      <el-row class="body">
        <el-row class="title">必读榜</el-row>
        <el-row v-for="(item, index) in leaderboard" class="each">
          <el-icon :size="10" class="icon iconfont"
                   :class="'icon-number-'+item.number + (index < 3?' gold':'')"></el-icon>
          <el-space class="info" direction="vertical" fill :size="0" alignment="start">
            <el-space class="info-head" :size="4">
              <el-avatar :src="item.image" :size="22"></el-avatar>
              <span class="info-title">{{ item.title }}</span>
            </el-space>
            <span class="text">{{ item.text }}</span>
          </el-space>
        </el-row>
      </el-row>
    </el-affix>
  </el-container>
</template>

<script>
export default {
  name: "MatrixHomeAside"
}
</script>

<script setup>
import {onMounted, ref} from "vue"

let leaderboard = ref([])

let options = [{
  label: "博客",
  icon: "icon-blog"
}, {
  label: "专栏",
  icon: "icon-column"
}, {
  label: "讨论",
  icon: "icon-talk"
}, {
  label: "收藏",
  icon: "icon-star"
}]

function init() {
  getData()
}

function getData() {
  for (let i = 1; i <= 9; i++) {
    leaderboard.value.push({
      number: i,
      image: "../../src/assets/images/boy.png",
      title: "二分查找从入门到入睡",
      text: "你应该很难再看到比本文更加深入透彻的解析二分查找的文章了(吧?)"
    })
  }
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.leaderboard {
  width: 100%;
  flex-direction: column;

  .head {
    width: 100%;
    padding: 5px 0 10px;

    .each {
      cursor: pointer;
      font-size: 12px;
      color: var(--el-text-color-secondary)
    }
  }

  .body {
    width: 100%;
    padding: 16px 0;
    border-radius: 8px;
    background-color: var(--el-color-white);
    box-shadow: var(--el-box-shadow-lighter);

    .title {
      font-size: 14px;
      line-height: 20px;
      color: var(--el-text-color-regular);
      font-weight: 500;
      margin-bottom: 10px;
      padding: 0 18px;
      width: 100%;
    }

    .each {
      margin-bottom: 4px;
      padding: 6px 16px;
      cursor: pointer;

      .icon {
        width: 10px;
        margin-right: 8px;
        margin-top: 5px;
        color: var(--el-text-color-placeholder);
      }

      .gold {
        color: #ffa116;
      }

      .info {
        width: 206px;

        .info-head {
          width: 100%;

          .info-title {
            width: 180px;
            font-size: 14px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1 1 auto;
            font-weight: 500;
            color: var(--el-text-color-primary)
          }
        }

        .text {
          width: 206px;
          font-size: 12px;
          line-height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 20px;
          color: var(--el-text-color-disabled);
        }
      }
    }

    .each:hover {
      background-color: var(--el-fill-color-light);
    }
  }
}
</style>