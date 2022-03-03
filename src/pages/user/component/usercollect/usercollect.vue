<template>
  <el-container>
    <el-main>
      <el-date-picker v-model="date" type="date" placeholder="选择日期" @change="dataChange">
      </el-date-picker>
      <el-row class="body">
        <cube-column-card v-for="data in dataList" :data="data" :option="'tag'"></cube-column-card>
      </el-row>
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
  name: "CubeUserCollect"
}
</script>
<script setup>
import {defineEmits, ref} from "vue";
import {globalFunc} from "../../../../utils/globalFunc";

const emits = defineEmits(["upToTop"])
const currentPage = ref(1)
const date = ref()
const {loadFullScreen} = globalFunc()

const dataList = ref([])

for (let i = 0; i < 20; i++) {
  dataList.value.push({
    title: "Docker入门",
    image: '../../src/assets/images/user1.png',
    author: "刘小圆",
    date: "2022-03-02",
    tags: [{
      label: "云计算",
    }, {
      label: "专栏",
    }]
  })
}

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
  emits("upToTop", "")
}
</script>
<style scoped lang="scss">
.body {
  width: 1100px;
  margin-top: 20px;
}
</style>