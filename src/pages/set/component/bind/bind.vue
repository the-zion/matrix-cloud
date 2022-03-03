<template>
  <el-row class="title">账号绑定</el-row>
  <el-space fill class="body">
    <el-row class="block" align="middle">
      <el-icon class="iconfont icon-weixin icon wechat" style="width: 10%"></el-icon>
      <el-space class="wechat-block" direction="vertical" fill :size="1">
        <el-row justify="space-between" align="middle">
          <el-col :span="4" class="word">绑定微信</el-col>
          <el-col :span="2" class="word edit" @click="wechatBind">绑定</el-col>
        </el-row>
        <el-row class="word color" align="middle">当前未绑定微信账户</el-row>
      </el-space>
    </el-row>
    <el-row class="block" align="middle">
      <el-icon class="iconfont icon-github-fill icon" style="width: 10%"></el-icon>
      <el-space class="github-block" direction="vertical" fill :size="1">
        <el-row justify="space-between" align="middle">
          <el-col :span="4" class="word">绑定Github</el-col>
          <el-col :span="2" class="word edit" @click="wechatBind">绑定</el-col>
        </el-row>
        <el-row class="word color" align="middle">当前未绑定Github账户</el-row>
      </el-space>
    </el-row>
  </el-space>
</template>

<script>
export default {
  name: "CubeBind"
}
</script>

<script setup>

function wechatBind() {

}

function githubBind() {

}
</script>

<style scoped lang="scss">
.title {
  font-size: 18px;
  padding-bottom: 20px;
}

.body {
  width: 100%;

  .block {
    padding: 14px 0;
    width: 100%;
    border-bottom: 1px solid var(--el-border-color-base);

    .icon {
      width: 10%;
      font-size: 50px;
    }

    .wechat {
      color: #04BE02;
    }

    .word {
      font-size: 14px;
    }

    .color {
      color: var(--el-text-color-secondary)
    }

    .edit {
      cursor: pointer;
      color: var(--el-color-primary)
    }

    .wechat-block, .github-block {
      width: 85%;
      height: 50px;
      margin-left: 5px;
    }
  }
}
</style>