<template>
  <el-row>
    <el-space fill class="body">
      <el-space direction="vertical" :size="20">
        <el-avatar :size="104" src="../src/assets/images/user.jpg"></el-avatar>
        <el-row>刘思圆</el-row>
        <el-row>海纳百川，有容乃大</el-row>
      </el-space>
    </el-space>
  </el-row>
</template>

<script>
export default {
  name: "CubeUserInfo"
}
</script>
<script setup>

</script>

<style scoped lang="scss">
.body {
  width: 100%;
}
</style>