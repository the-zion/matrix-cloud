<template>
  <el-dialog v-model="dialogTableVisible" title="评论">
    <el-container>
      <el-main>hello word</el-main>
    </el-container>
  </el-dialog>
</template>

<script>
export default {
  name: "CubeComment"
}
</script>
<script setup>
import {defineProps, computed} from 'vue';

let props = defineProps({dialogTableVisible: Boolean})
let dialogTableVisible = props.dialogTableVisible
</script>

<style scoped>

</style>