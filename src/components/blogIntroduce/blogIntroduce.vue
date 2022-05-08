<template>
  <el-row class="blog-introduce" align="middle" :style="props.style" @click="blogDetail">
    <el-space class="body" direction="vertical" fill :size="10">
      <el-row class="title">
        <a>{{ props.row.title }}</a>
      </el-row>
      <el-space wrap :size="10">
        <el-tag :key="'key1'" effect="dark">{{ props.row.tag }}</el-tag>
        <el-tag :key="'key2'" effect="dark" type="danger">{{ '专栏' }}</el-tag>
      </el-space>
      <el-descriptions>
        <el-descriptions-item label="段落示意:">{{ props.row.content || '暂无' }}</el-descriptions-item>
      </el-descriptions>
      <el-space class="bottom" direction="horizontal">
        <el-space @click="userClick" :size="3">
          <el-row class="user">
            <el-avatar :size="24" :src="'../src/assets/images/user.jpg'"></el-avatar>
          </el-row>
          <el-row :span="4" class="word">{{ '付小小' }}</el-row>
        </el-space>
        <el-space :size="3">
          <el-row class="icon">
            <el-icon>
              <clock/>
            </el-icon>
          </el-row>
          <el-row class="icon-word">
            {{ '2022-01-31 15:22' }}
          </el-row>
        </el-space>
      </el-space>
    </el-space>
    <el-row class="blog-cover" align="middle" justify="center">
      <el-image
          style="height: 70%;width:60%;border-radius: 5px"
          :src="'../src/assets/images/picture1.jpg'"
          fit="cover"
          :preview-src-list="['../src/assets/images/picture1.jpg']"
          append-to-body
      ></el-image>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "CubeBlogIntroduce"
}
</script>
<script setup>
import router from "../../router";

const props = defineProps({
  row: {
    type: Object,
    default: {}
  },
  style: String
})

function blogDetail() {
  router.push({name: "blog"})
}
</script>

<style scoped lang="scss">
.blog-introduce {
  padding: 16px 60px;
  height: 240px;
  cursor: pointer;

  .body {
    width: 60%;

    .title {
      color: rgba(0, 0, 0, .85);
      font-size: 16px;
      line-height: 24px;
    }

    .bottom {
      width: 100%;

      .user {
        cursor: pointer
      }

      .word {
        font-size: 14px;
        color: #409EFF;
        cursor: pointer
      }

      .icon {
        color: rgb(144, 147, 153);
      }

      .icon-word {
        font-size: 13px;
        color: rgb(144, 147, 153);
      }
    }
  }
}

.blog-cover {
  height: 100%;
  width: 40%;
}

</style>