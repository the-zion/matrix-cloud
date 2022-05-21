<template>
  <el-container class="collect-container">
    <el-row class="filter" justify="space-between">
      <el-select v-model="select" placeholder="Select" class="select" @change="selectChange">
        <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.label"
            :value="item.component"
        />
      </el-select>
    </el-row>
    <matrix-list ref="listRef" :component="component" :scroll-to="427"></matrix-list>
  </el-container>
</template>
<script>
export default {
  name: "Collect"
}
</script>

<script setup>
import {ref} from "vue";

let select = ref("博客")
let component = ref("MatrixBlogCard")
let listRef = ref()
const options = ref([{
  key: "blog",
  label: "博客",
  component: "MatrixBlogCard"
}, {
  key: "column",
  label: "专栏",
  component: "MatrixColumnCard"
}])

function selectChange(value) {
  component.value = value
  setTimeout(function (){
    listRef.value.getData()
  },10)
}

</script>
<style scoped lang="scss">
.collect-container {
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