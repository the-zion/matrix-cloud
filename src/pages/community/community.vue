<template>
  <el-container class="community-container">
    <div class="community-body">
      <div class="carousel-block">
        <el-carousel height="208px">
          <el-carousel-item v-for="item in carouselBox" :key="item">
            <el-image style="height: 100%" :src="'../../src/assets/images/'+item" fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </el-container>
</template>
<script setup>
import {initData} from "./initData.js"

let {carouselBox} = initData()

</script>

<style scoped lang="scss">
.community-container {
  height: 100%;
  margin: auto;

  .community-body {
    width: 1000px;
    margin: auto;
    height: 100%;

    .carousel-block {
      height: 208px;
      margin-bottom: 12px;
    }
  }
}
</style>