<template>
  <el-container>
    <el-main>
      <el-row class="body">
        <cube-user-card v-for="data in dataList" :data="data" :option="'tag'"></cube-user-card>
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
  name: "CubeUserCare"
}
</script>

<script setup>
import {defineProps, ref} from "vue";
import {globalFunc} from "../../../../utils/globalFunc";

const currentPage = ref(1)
const {loadFullScreen} = globalFunc()
const props = defineProps({
  upToTop: Function,
})

const dataList = ref([])

for (let i = 0; i < 20; i++) {
  dataList.value.push({
    image: '../../src/assets/images/user1.png',
    name: "刘小圆",
    introduce: "海纳百川，有容乃大"
  })
}

function pageCurrentChange(item) {
  let loading = loadFullScreen()
  setTimeout(() => {
    loading.close()
  }, 1000)
  props.upToTop()
}
</script>

<style scoped lang="scss">
.body {
  width: 1100px;
  margin-top: 20px;
}
</style>