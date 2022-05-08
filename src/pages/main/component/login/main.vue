<template>
  <el-dialog
      custom-class="loginDialog"
      :close-on-click-modal=false
      class="login"
      destroy-on-close
      :width="385"
      :before-close="beforeClose"
      @closed="dialogClosed"
      v-model="props.visible">
    <el-row class="container">
      <el-row justify="center" class="title">
        <el-image class="logo" :src="'../../../../src/assets/images/matrix.svg'"></el-image>
      </el-row>
      <matrix-login-account v-if="mode === 'account'" v-model:mode="mode" @close="closeDialog"></matrix-login-account>
      <matrix-login-code v-if="mode === 'code'" v-model:mode="mode" @close="closeDialog"></matrix-login-code>
      <matrix-login-register v-if="mode === 'register'" v-model:mode="mode"
                             @close="closeDialog"></matrix-login-register>
      <matrix-login-forget v-if="mode === 'forget'" v-model:mode="mode" @close="closeDialog"></matrix-login-forget>
      <el-row class="others-login" justify="space-around">
        <el-avatar :size="36" class="icon qq iconfont icon-QQ"/>
        <el-avatar :size="36" class="icon wechat  iconfont icon-wechat-fill"/>
        <el-avatar :size="36" class="icon weibo iconfont icon-weibo"/>
        <el-avatar :size="36" class="icon github iconfont icon-github-fill"/>
      </el-row>
      <el-row justify="center" class="tail">欢迎来到matrix，魔方技术，致力于分享实用的技术干货</el-row>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: "MatrixLogin"
}
</script>


<script setup>
import {onMounted} from "vue";
import {controller} from "./controller";

const {initVariable, init, beforeClose, dialogClosed, closeDialog} = controller()
let {mode} = initVariable()
const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
})

onMounted(function () {
  init(emits)
})
</script>

<style scoped lang="scss">
.container {
  width: 384px;
  padding: 24px 32px 32px;

  .title {
    width: 96%;

    .logo {
      height: 40px;
    }
  }

  .others-login {
    width: 100%;
    margin-top: 24px;

    .icon {
      font-size: 20px;
      background: unset;
      border: 1px solid var(--el-border-color);
    }

    .qq {
      color: rgb(74, 154, 253)
    }

    .wechat {
      color: rgb(0, 202, 0);
    }

    .weibo {
      color: rgb(233, 14, 36);
    }

    .github {
      color: var(--el-color-black)
    }
  }

  .tail {
    width: 100%;
    text-align: center;
    font-size: 12px;
    margin-top: 42px;
    color: var(--el-text-color-secondary)
  }
}
</style>