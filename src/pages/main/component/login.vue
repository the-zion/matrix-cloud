<template>
  <el-container class="login-container">
    <el-dialog
        custom-class="loginDialog"
        destroy-on-close
        :width="385"
        :before-close="beforeClose"
        @closed="dialogClosed"
        v-model="props.visible">
      <el-row class="login-body">
        <el-row justify="center" class="title">
          <el-image class="logo" :src="logo" lazy></el-image>
        </el-row>
        <Account v-if="mode === 'account'" v-model:mode="mode" @close="closeDialog"></Account>
        <Code v-if="mode === 'code'" v-model:mode="mode" @close="closeDialog"></Code>
        <Register v-if="mode === 'register'" v-model:mode="mode"
                  @close="closeDialog"></Register>
        <Forget v-if="mode === 'forget'" v-model:mode="mode" @close="closeDialog"></Forget>
        <el-row class="others-login" justify="space-around">
          <el-avatar :size="36" class="icon qq iconfont icon-QQ"/>
          <el-avatar :size="36" class="icon wechat  iconfont icon-wechat-fill"/>
          <el-avatar :size="36" class="icon weibo iconfont icon-weibo"/>
          <el-avatar :size="36" class="icon github iconfont icon-github-fill"/>
        </el-row>
        <el-row justify="center" class="tail">欢迎来到matrix，魔方技术，致力于分享实用的技术干货</el-row>
      </el-row>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "Login"
}
</script>


<script setup>
import {ref} from "vue";
import Account from "./account.vue"
import Code from "./code.vue"
import Register from "./register.vue"
import Forget from "./forget.vue"
import {getAssets} from "../../../utils/globalFunc";

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
})
const logo = getAssets('matrix.svg')

let mode = ref("code")

function beforeClose() {
  emits("update:visible", false)
}

function dialogClosed() {
  mode.value = "code"
}

function closeDialog() {
  beforeClose()
}

</script>

<style scoped lang="scss">
.login-container {
  ::v-deep(.loginDialog) {
    border-radius: 20px;

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding: unset;
    }
  }

  .login-body {
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
}
</style>