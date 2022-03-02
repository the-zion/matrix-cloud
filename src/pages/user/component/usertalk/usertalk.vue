<template>
  <el-container>
    <el-main>
      <el-space direction="vertical" class="body" alignment="start" :size="30">
        <el-date-picker v-model="date" type="date" placeholder="选择日期" @change="dataChange">
        </el-date-picker>
        <el-space fill :size="30" v-for="data in dataList" class="block">
          <cube-share :data="data"
                      @comment-click="data.visible = !data.visible"
          ></cube-share>
          <cube-comment v-if="data.visible"></cube-comment>
        </el-space>
      </el-space>
    </el-main>
    <el-footer>
      <el-pagination
          v-model:currentPage="currentPage"
          class="home-pagination"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
          @current-change="pageCurrentChange"
      >
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "CubeUserTalk"
}
</script>
<script setup>
import {defineProps, ref} from "vue"
import {globalFunc} from "../../../../utils/globalFunc";

const dataList = ref([])
const currentPage = ref(1)
const date = ref()
const {loadFullScreen} = globalFunc()
const props = defineProps({
  upToTop: Function,
})

function dataChange(date) {
  console.log(date)
  let loading = loadFullScreen()
  setTimeout(() => {
    loading.close()
  }, 1000)
}

function pageCurrentChange(item) {
  let loading = loadFullScreen()
  setTimeout(() => {
    loading.close()
  }, 1000)
  props.upToTop()
}

for (let i = 0; i < 20; i++) {
  dataList.value.push({
    id: i,
    avatar: '../../src/assets/images/user1.png',
    name: "刘思圆",
    date: "2022-2-12 20:56:30",
    text: "我觉得，一个人要想活得有朝气，就得没谱儿，得有新东西进来，新东西出去，得完全不知道明天会发生什么，如果还能一直有“新喜欢的东西”和“新不喜欢的东西”那就太幸福了，“新”代表着你还在不停地接触新东西，而“喜欢和不喜欢”代表着你还有态度，永远骂街，永远热泪盈眶",
    images: ["background1.jpg", "background2.jpg", "background3.jpg"],
    love: 1000,
    comment: 1000,
    visible: false
  })
}

</script>

<style scoped lang="scss">
.body {
  width: 100%;

  .block {
    width: 700px
  }
}
</style>