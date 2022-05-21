<template>
  <el-container class="password-container">
    <el-form :model="form" ref="formRef" class="form" :rules="rules">
      <el-form-item class="form-item" prop="password">
        <el-input v-model="form.password" :maxlength="50" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item class="form-item" prop="repeat">
        <el-input v-model="form.repeat" :maxlength="50" placeholder="请重复输入密码"/>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
export default {
  name: "Password"
}
</script>

<script setup>
import {ref, onMounted} from "vue";

import {validatePassword} from "../../../utils/check";

const emits = defineEmits(["open"])
const rules = ref({
  password: [{validator: validatePassword, trigger: 'blur'}],
  repeat: [{validator: validateRepeat, trigger: 'blur'}]
})

let form = ref({password: "", repeat: ""})
let formRef = ref()

function validateRepeat(rule, value, callback) {
  if (!checkRepeat(value)) {
    value || callback(new Error("密码不能为空"))
    callback(new Error("两次密码输入不一致"))
  }
  callback()
}

function checkRepeat(value) {
  return value === form.value.password
}

onMounted(function () {
  emits("open", form.value, formRef.value)
})
</script>

<style scoped lang="scss">
.password-container {
  width: 100%;

  .form {
    width: 100%;

    .form-item {
      width: 100%;
      margin-bottom: 30px;

      .code {
        width: 100%;

        .code-input {
          width: calc(100% - 100px);
        }

        .button {
          height: 42px;
          padding: 12px 0;
          width: 90px;
          text-align: center;
        }
      }

      ::v-deep(.el-input__wrapper) {
        height: 40px;
      }
    }
  }
}
</style>