<template>
  <el-dialog v-model="props.visible" custom-class="editDialog" :width="400"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ title }}</el-row>
    <el-row class="description" justify="center">{{ description }}</el-row>
    <matrix-identity-verification v-if="step === 'one'" @open="subOpen"></matrix-identity-verification>
    <!--    <el-button type="primary">Primary</el-button>-->
    <template #footer>
          <span class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button v-show="step === 'one'" type="primary" @click="nextStep"
            >下一步</el-button>
            <el-button v-show="step === 'two'" type="primary" @click="save"
            >保存</el-button>
          </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "MatrixCenterSecurityEdit"
}
</script>

<script setup>
import {ref} from "vue"
import {success, error} from "../../../../../utils/message";

const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean,
  mode: String
})

let title = ref("")
let description = ref("")
let step = ref("")
let mode = ""
let form = null
let formRef = null

function open() {
  initData()
}

function initData() {
  mode = props.mode
  step.value = "one"
  title.value = "身份验证"
  description.value = "为了保护你的帐号安全，请验证身份，验证成功后进行下一步操作"
}

function titleSet() {
  switch (mode) {
    case "email":
      title.value = "邮箱设置"
      description.value = "请输入邮箱账号与验证码完成邮箱设置"
      break
    case "phone":
      title.value = "手机号设置"
      description.value = "请输入手机号与验证码完成手机号设置"
      break
    case "password":
      title.value = "密码设置"
      description.value = "请输入新密码以完成密码设置"
      break
  }
}

function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}

function subOpen(f, r) {
  form = f
  formRef = r
}

function nextStep() {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("提交的信息有误，请检查")
    } else {
      step.value = "two"
      titleSet()
      return true
    }
  })
}

function save() {

}
</script>

<style scoped lang="scss">
.editDialog {
  .title {
    margin-top: 8px;
    font-size: 24px;
    color: var(--el-text-color-primary);
  }

  .description {
    margin: 2px auto 24px;
    font-size: 14px;
    color: #8590a6;
    max-width: 240px;
    line-height: 25px;
    text-align: center;
  }
}
</style>