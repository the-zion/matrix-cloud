<template>
  <el-row class="qr">
    <el-row class="title">{{ props.title }}</el-row>
    <el-row class="code" justify="center">
      <div id="wechat" style="height: 200px"></div>
    </el-row>
    <el-row class="choose-block" justify="space-between">
      <el-row style="cursor: pointer" @click="mode('code')">验证码登录</el-row>
      <el-row style="cursor: pointer" @click="mode('account')">账号密码登录</el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixQrCode"
}
</script>

<script setup>
import "../../../utils/wechat"
import {onBeforeMount, onMounted} from "vue";

const emits = defineEmits(["update:mode", "close"])
const props = defineProps({
  title: String
})

function init() {
  newWechat()
}

function newWechat() {
  new WxLogin({
    id: "wechat",
    appid: import.meta.env.VITE_WECHAT_APPID,
    scope: import.meta.env.VITE_WECHAT_SCOPE,
    redirect_uri: encodeURIComponent(import.meta.env.VITE_WECHAT_REDIRECT_URL),
    state: "abc",
    style: "height: 180px",//二维码样式
    href: new URL(`../style/wechat.css`, import.meta.url).href
  })

  let a = document.getElementById('wechat')
}

function mode(mode) {
  emits("update:mode", mode)
}

onMounted(function () {
  init()
})
</script>

<style scoped lang="scss">
.qr {
  width: 100%;

  .title {
    color: var(--el-text-color-primary);
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }

  .code {
    width: 100%;
  }

  .choose-block {
    width: 100%;
  }
}
</style>