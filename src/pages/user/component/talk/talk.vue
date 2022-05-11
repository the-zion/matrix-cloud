<template>
  <el-container class="talk">
    <el-row class="filter" justify="space-between">
      <el-select v-model="select" placeholder="Select" class="select">
        <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.key"
        />
      </el-select>
      <el-input
          class="search"
          v-model="search"
          placeholder="搜索：内容/标签"
          prefix-icon="Search"
      />
    </el-row>
    <matrix-list :mode="3" @current-page="pageChange"></matrix-list>
  </el-container>
</template>
<script>
export default {
  name: "MatrixUserTalk"
}
</script>

<script setup>
import {ref} from "vue";
import {scrollTo} from "../../../../utils/globalFunc";

let select = ref("new")
let search = ref()
const options = ref([{
  key: "new",
  label: "最新发表"
}, {
  key: "hot",
  label: "最多点赞"
}])

function pageChange() {
  scrollTo(427)
}
</script>
<style scoped lang="scss">
.talk {
  width: 100%;
  flex-direction: column;

  .filter {
    width: 100%;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--el-border-color);

    .select {
      width: 150px;
    }

    .search {
      width: 250px;
    }
  }
}
</style>