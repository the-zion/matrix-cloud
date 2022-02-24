<template>
  <el-row>
    <el-space fill class="body" size="large">
      <el-row justify="center" class="base-info">
        <el-space direction="vertical" :size="25">
          <el-avatar :size="104" src="../src/assets/images/user.jpg"></el-avatar>
          <el-space fill :size="4">
            <el-row class="name" justify="center">刘思圆</el-row>
            <el-row class="introduce" justify="center">海纳百川，有容乃大</el-row>
          </el-space>
          <el-space size="large" class="info" fill>
            <el-space>
              <el-icon>
                <iphone/>
              </el-icon>
              <el-row class="info-word">199******58</el-row>
            </el-space>
            <el-space>
              <el-icon>
                <message/>
              </el-icon>
              <el-row class="info-word">945212191@qq.com</el-row>
            </el-space>
            <el-space>
              <el-icon><location /></el-icon>
              <el-row class="info-word">浙江省杭州市</el-row>
            </el-space>
          </el-space>
        </el-space>
      </el-row>
      <el-row>
        <el-descriptions title="标签">
          <el-descriptions-item>
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-tag size="small" type="success">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-tag size="small" type="info">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <el-tag size="small" type="warning">School</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-row>
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

  .base-info {
    border-bottom: 1px solid var(--el-border-color-base);

    .name {
      font-size: 20px;
    }

    .introduce {
      font-size: 13px;
      font-weight: 100;
    }

    .info {
      width: 200px;

      .info-word {
        font-size: 14px;
      }
    }
  }
}
</style>