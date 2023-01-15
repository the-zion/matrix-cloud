<template>
  <el-container class="about">
    <el-row class="block">
      <el-image class="image" :src="getAssets('matrix.png')" :fit="'cover'"/>
      <span>{{"这是一个基于微服务框架Kratos所做的知识分享网站，期望能靠内容出圈吧 (⸝⸝>ᴗ(>ᴗ<⸝⸝）"}}</span>
    </el-row>
  </el-container>
  <div ref="root"></div>
</template>

<script setup>
import {getAssets} from "../../utils/globalFunc";

</script>

<style scoped lang="scss">
.about {
  width: 100%;
  flex-direction: column;
  align-items: center;

  .block {
    width: 650px;

    .image {
      width: 100%;
      margin-bottom: 20px;
      background: var(--el-color-white);
      height: 350px;
    }
  }
}
</style>