<template>
  <el-row class="forget">
    <el-row class="title">重新设置密码</el-row>
    <el-form v-if="step === 'step1'" :model="form1" class="form" :rules="rules1" ref="formRef1" status-icon>
      <el-form-item prop="select" required>
        <el-select class="select" v-model="form1.select" placeholder="选择密码重置方式" @change="selectChange">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="form1.select === 'phone'" prop="phone">
        <el-input class="inputPhone" v-model="form1.phone" type="text" placeholder="输入手机号">
          <template #prepend>
            <el-row>+86</el-row>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="form1.select === 'email'" prop="email">
        <el-input class="input" v-model="form1.email" type="text" placeholder="输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input class="inputCode" v-model="form1.code" type="text" placeholder="验证码">
          <template #append>
            <el-row v-show="!codeSending" :style="{width: width + 'px'}" style="cursor:pointer;"
                    @click="sendCode()">
              {{ text + (interval ? ' 秒后可重发' : '') }}
            </el-row>
            <el-button v-show="codeSending" class="sending" type="primary" loading>发送中</el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-form v-if="step === 'step2'" :model="form2" class="form" :rules="rules2" ref="formRef2" status-icon>
      <el-form-item prop="password">
        <el-input class="input" v-model="form2.password" type="password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="repeat">
        <el-input class="input" v-model="form2.repeat" type="password" show-password placeholder="请重复密码"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="button-block">
      <el-button class="button" color="rgb(36, 37, 40)" size="large" :loading="loading"
                 @click="step === 'step1' ? nextStep(formRef1):passwordReset(formRef2)">
        {{ step === 'step1' ? "下一步" : "密码重置" }}
      </el-button>
    </el-row>
    <el-row class="choose-block" justify="space-between">
      <el-row style="cursor: pointer" @click="mode('code')">验证码登录</el-row>
      <el-row style="cursor: pointer" @click="mode('account')">账号密码登录</el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "MatrixLoginForget"
}
</script>

<script setup>
import {onMounted} from "vue"
import {initVariable, init, selectChange, sendCode, nextStep, passwordReset, mode} from "./controller";

const emit = defineEmits(["update:mode"])
let {
  width,
  text,
  codeSending,
  interval,
  step,
  loading,
  formRef1,
  formRef2,
  options,
  form1,
  form2,
  rules1,
  rules2
} = initVariable()
onMounted(function () {
  init(emit)
})

</script>

<style scoped lang="scss">
.forget {
  width: 100%;

  .title {
    color: var(--el-text-color-primary);
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    margin-top: 32px;
    margin-bottom: 24px;
    width: 100%;
  }

  .form {
    width: 100%;
    margin-bottom: unset !important;

    .select {
      width: 100%;

      ::v-deep(.el-input__wrapper) {
        height: 40px;
        border-radius: 8px;
      }
    }

    .input {
      ::v-deep(.el-input__wrapper) {
        border-radius: 8px;
        height: 40px;
      }
    }

    .inputPhone {
      ::v-deep(.el-input-group__prepend) {
        background-color: unset;
        border-radius: 8px 0 0 8px;
        width: 15px;
        color: var(--el-text-color-regular);
      }

      ::v-deep(.el-input__wrapper) {
        height: 40px;
        border-radius: 0 8px 8px 0;
      }
    }

    .inputCode {
      ::v-deep(.el-input__wrapper) {
        height: 40px;
        border-radius: 8px 0 0 8px;
      }

      ::v-deep(.el-input-group__append) {
        background-color: unset;
        border-radius: 0 8px 8px 0;
        color: var(--el-text-color-regular);
      }

      ::v-deep(.sending) {
        display: flex;
        font-weight: 400;
        font-size: 13px;
      }
    }
  }

  .button-block {
    width: 100%;
    margin: 8px 0 16px;

    .button {
      width: 100%;
      border-radius: 8px;
    }
  }

  .choose-block {
    width: 100%;
  }
}
</style>