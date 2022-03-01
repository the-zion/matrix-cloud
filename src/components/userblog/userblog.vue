<template>
  <el-container>
    <el-main>
      <cube-blog-introduce v-for="item in datalist" :row="item"
                           :style="'padding:16px 0px;margin:0 40px;border-bottom:1px solid var(--el-border-color-base)'"></cube-blog-introduce>
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
  name: "CubeUserBlog"
}
</script>

<script setup>
import {ref} from "vue"
import {globalFunc} from "../../utils/globalFunc";

const datalist = ref([])
const currentPage  =ref(1)
const backTop = ref()
const {loadFullScreen} = globalFunc()

function pageCurrentChange(item) {
  console.log(item)
  let loading = loadFullScreen()
  setTimeout(() => {
    loading.close()
  }, 1000)
}

for (let i = 0; i < 20; i++) {
  datalist.value.push({
    id: '1',
    date: '2016-05-03',
    name: 'TomTomTomTomTomTomTom',
    tag: "数据结构和算法",
    introduction: 'Docker从入门到入土Docker从入门到入土Docker从入门到入土Docker从入门到入土',
    content: '容器其实是一种沙盒技术。顾名思义，沙盒就是能够像一个集装箱一样，把你的应用“装”起来的技术。这样，应用与应用之间，就因为有了边界而不至于相互干扰。',
    title: "Docker入门"
  })
}
</script>

<style scoped>

</style>