<template>
  <el-container class="leaderboard">
    <el-affix>
      <el-row class="body">
        <el-row class="title">必读榜</el-row>
        <el-row v-for="(item, index) in leaderboard" :key="item.id" class="each">
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
  name: "LeaderBoard"
}
</script>

<script setup>
import {onMounted, ref} from "vue"

let leaderboard = ref([])

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

  .body {
    width: 100%;
    padding: 16px 0;
    background-color: var(--el-color-white);
    border: 1px solid var(--el-border-color-lighter);

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