<template>
  <el-space direction="vertical" fill size="large">
    <el-space>
      <el-avatar :size="34" :src="'../../src/assets/images/user1.png'"></el-avatar>
      <el-row align="middle" class="name">{{ '刘思圆' }}</el-row>
    </el-space>
    <cube-express class="comment-express" :textNumberMax="300" :mode="'comment'"></cube-express>
    <el-tabs v-model="activeTab" @tab-click="tabClick">
      <el-tab-pane label="按热度排序" name="hot">
      </el-tab-pane>
      <el-tab-pane label="按时间排序" name="time"></el-tab-pane>
    </el-tabs>
    <el-space fill :size="20">
      <el-space v-for="item in data" class="share" direction="vertical" fill :size="20">
        <cube-share :data="item" :fontSize="14" @comment-click="commentClick"></cube-share>
        <el-row class="separate" v-if="subShow"></el-row>
        <el-space v-if="subShow" direction="vertical" fill class="subShare" :size="30">
          <cube-share :data="item" :fontSize="13" :avatarSize="25" v-for="item in subData"
                      @comment-reply="subCommentReply"></cube-share>
        </el-space>
      </el-space>
    </el-space>
  </el-space>
  <el-dialog v-model:visible="dialogVisible"></el-dialog>
</template>

<script>
export default {
  name: "CubeComment",
}
</script>
<script setup>
import {defineProps, ref} from "vue";

const activeTab = ref("hot")
const subShow = ref(false)
const dialogVisible = ref(false)

function tabClick() {
  console.log(activeTab.value)
}

function commentClick() {
  subShow.value = !subShow.value
}

function subCommentReply() {
  console.log(2222)
  dialogVisible.value = !dialogVisible.value
}

const data = ref([])
const subData = ref([])
for (let i = 0; i < 5; i++) {
  data.value.push({
    id: i,
    avatar: '../../src/assets/images/user1.png',
    name: '刘思圆',
    date: '2022-2-12 20:56:30',
    text: '我觉得，一个人要想活得有朝气，就得没谱儿，',
    love: 1298,
    comment: 1298
  })
  subData.value.push({
    id: i,
    avatar: '../../src/assets/images/user1.png',
    name: '刘思圆',
    relevant: "刘思圆",
    date: '2022-2-12 20:56:30',
    text: '我觉得，一个人要想活得有朝气，就得没谱儿，得有新东西进来，新东西出去，得完全不知道明天会发生什么，如果还能一直有“新喜欢的东西”和“新不喜欢的东西”那就太幸福了',
    love: 1298,
  })
}


</script>
<style scoped lang="scss">
.name {
  font-size: 16px;
}

.comment-express {
  margin: unset;
}

.share {
  min-height: 130px;
  border-bottom: 1px solid var(--el-border-color-base);

  .separate {
    height: 8px;
    width: 100%;
    background: #f5f8fa;
  }

  .subShare {
    width: 95%;
  }

}
</style>