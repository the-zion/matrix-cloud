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
      <el-space v-for="(item,index) in dataList" class="share" direction="vertical" fill>
        <!--        <cube-share :data="item" :fontSize="14" @comment-click="commentClick(item,index)"></cube-share>-->
        <cube-reply :data="item" @comment-click="commentClick(item,index)" :like="true" :comment="true"></cube-reply>
      </el-space>
      <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="50"
          class="mt-4"
      >
      </el-pagination>
    </el-space>
  </el-space>
  <cube-comment-dialog v-if="dialogVisible" v-model:visible="dialogVisible" :data="data"
                       :top="'5vh'"></cube-comment-dialog>
</template>

<script>
export default {
  name: "CubeComment",
}
</script>
<script setup>

const activeTab = ref("hot")
const dialogVisible = ref(false)
const data = ref()

function tabClick() {
  console.log(activeTab.value)
}

function commentClick(item, index) {
  data.value = item
  dialogVisible.value = !dialogVisible.value
}

const dataList = ref([])
for (let i = 0; i < 5; i++) {
  dataList.value.push({
    id: i,
    avatar: '../../src/assets/images/user1.png',
    name: '刘思圆',
    date: '2022-2-12 20:56:30',
    text: '我觉得，一个人要想活得有朝气，就得没谱儿，',
    love: 1298,
    comment: 1298
  })
}

console.log(data.value)


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
  border-bottom: 1px solid var(--el-border-color-base);;

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