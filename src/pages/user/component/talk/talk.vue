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
    <matrix-list :mode="3" @current-page="pageChange(props.scroll)"></matrix-list>
  </el-container>
</template>
<script>
export default {
  name: "MatrixUserTalk"
}
</script>

<script setup>
import {controller} from "./controller";
import {defineProps, onMounted} from "vue";

let {initVariable, init, pageChange} = controller()
let {select, search, options} = initVariable()
const props = defineProps({
  scroll: Object,
})
onMounted(() => {
  init(props)
})
</script>
<style scoped lang="scss">
.talk {
  width: 100%;
  flex-direction: column;

  .filter {
    width: 100%;

    .select {
      width: 150px;
    }

    .search {
      width: 250px;
    }
  }
}
</style>