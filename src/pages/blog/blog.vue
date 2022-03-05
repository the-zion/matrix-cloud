<template>
  <el-container class="blog-container" id="blog-container">
    <el-aside v-if="route === 'column'" class="blog-aside">
      <cube-column-catalogue></cube-column-catalogue>
    </el-aside>
    <el-main class="blog-main">
      <el-backtop target=".blog-main" ref="backTop" :right="backTopRight"></el-backtop>
      <el-backtop target=".blog-main" class="backtop" ref="view" :bottom="100" :visibility-height="0"
                  :right="backTopRight">
        <el-badge :value="100" :max="999" :hidden="viewCount()">
          <el-icon>
            <View/>
          </el-icon>
        </el-badge>
      </el-backtop>
      <el-backtop target=".blog-main" class="backtop" ref="star" :bottom="160" :visibility-height="0"
                  :right="backTopRight">
        <el-badge :value="100" :max="999" :hidden="startCount()">
          <el-icon>
            <star-filled/>
          </el-icon>
        </el-badge>
      </el-backtop>
      <el-backtop target=".blog-main" class="backtop" ref="like" :bottom="220" :visibility-height="0"
                  :right="backTopRight">
        <el-badge :value="100" :max="999" :hidden="likeCount()">
          <el-icon class="iconfont icon-like-fill"></el-icon>
        </el-badge>
      </el-backtop>
      <cube-blog-detail :title="title" :defaultHtml="defaultHtml"></cube-blog-detail>
    </el-main>
  </el-container>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {initData} from "./initData";
import {controller} from "./controller";
import {ElMessage} from "element-plus";

const {route, backTopRight, title, defaultHtml, view, star, like} = initData()
const {init, viewCount, startCount, likeCount} = controller(route)


onMounted(() => {
  backTopRight.value = Math.floor((Math.floor(document.getElementById('blog-container').clientWidth) - 680) / (route.value === 'column' ? 8 : 3))
  star.value.handleClick = function () {
    ElMessage.success("已收藏")
  }
  view.value.handleClick = function () {
  }
  like.value.handleClick = function () {
    ElMessage.success("点赞 +1")
  }
})

init()
</script>


<style scoped lang="scss">
.backtop::v-deep(.el-badge__content) {
  right: 2px
}

.blog-container {
  height: 100%;

  .blog-aside {
    width: 332px;
    padding: 24px;
    border-right: 1px solid var(--el-border-color-base);
  }

  .blog-main {
  }
}
</style>