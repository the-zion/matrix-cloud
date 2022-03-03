<template>
  <cube-dialog :visible="visible" :define="dialogDefine"></cube-dialog>
  <el-row class="title">安全设置</el-row>
  <el-space fill class="body">
    <el-space fill class="block">
      <el-row justify="space-between">
        <el-col :span="4" class="word">账户密码</el-col>
        <el-col :span="2" class="word edit" @click="passWordModify">修改</el-col>
      </el-row>
      <el-row class="word color">当前密码强度：强</el-row>
    </el-space>
    <el-space fill class="block">
      <el-row justify="space-between">
        <el-col :span="4" class="word">绑定手机</el-col>
        <el-col :span="2" class="word edit" @click="phoneModify">修改</el-col>
      </el-row>
      <el-row class="word color">已绑定手机：199****0758</el-row>
    </el-space>
    <el-space fill class="block">
      <el-row justify="space-between">
        <el-col :span="4" class="word">绑定邮箱</el-col>
        <el-col :span="2" class="word edit" @click="emailModify">修改</el-col>
      </el-row>
      <el-row class="word color">已绑定邮箱：945212191@qq.com</el-row>
    </el-space>
  </el-space>
</template>

<script>
export default {
  name: "CubeSecurity"
}
</script>

<script setup>
import {ref} from "vue"
import {ElMessage} from "element-plus";

const visible = ref(false)
const dialogDefine = ref()
const formValidate = ref(false)

function passWordModify() {
  visible.value = true
  dialogDefine.value = {
    title: "密码修改",
    width: "35%",
    mode: "form",
    footBtn: [{
      name: "验证码发送",
      click: function () {
        dialogDefine.value.footBtn[0].disabled = true
        ElMessage.success("验证码已发送，两分钟内有效")
        let time = 120
        let interval = setInterval(() => {
          time--
          dialogDefine.value.footBtn[0].name = "剩余时间：" + time
          if (time === 0) {
            dialogDefine.value.footBtn[0].disabled = false
            clearInterval(interval)
          }
        }, 1000)
      },
    }, {
      name: "确认",
      type: "primary",
      click: function () {
        if (formValidate.value) {
          visible.value = !visible.value
          formValidate.value = false
        } else {
          ElMessage.error("有字段未通过校验，请仔细检查")
        }
        console.log(dialogDefine.value.formDefine.data)
      },
    }],
    beforeClose: function () {
      visible.value = !visible.value
    },
    formDefine: {
      form: [{
        key: "password",
        component: "el-input",
        label: "新密码",
        type: "password",
        placeholder: "请输入密码",
        labelWidth: '70px',
        maxlength: 16,
        style: "width:calc(100% - 70px)",
      }, {
        key: "repeat",
        component: "el-input",
        placeholder: "请再次输入密码",
        label: "再输入",
        type: "password",
        labelWidth: '70px',
        maxlength: 16,
        style: "width:calc(100% - 70px)",
      }, {
        key: "option",
        component: "el-select",
        placeholder: "请选择认证方式",
        label: "认证方式",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
        options: [{
          value: "phone",
          label: "手机验证"
        }, {
          value: "email",
          label: "邮箱验证"
        }]
      }, {
        key: "code",
        component: "el-input",
        placeholder: "请输入验证码",
        label: "验证码",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
      }],
      data: {password: "", repeat: "", option: "phone", code: ""},
      rules: {
        password: [{
          required: true,
          validator: function (rule, value, callback) {
            let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            if (value === '') {
              callback(new Error('密码不能为空'))
            } else if (!reg.test(value)) {
              callback(new Error('密码需同时包含字母和数字，至少 8 个字符'))
            }
          }, trigger: ['blur', 'change']
        }],
        repeat: [{
          required: true,
          validator: function (rule, value, callback) {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== dialogDefine.value.formDefine.data.password) {
              callback(new Error("两次输入不一致"))
            } else {
              callback()
            }
          }, trigger: ['blur', 'change']
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: ['blur', 'change']
        }]
      },
      validate: function (_, pass) {
        formValidate.value = pass
      }
    }
  }
}

function phoneModify() {
  visible.value = true
  dialogDefine.value = {
    title: "手机号修改",
    width: "35%",
    mode: "form",
    footBtn: [{
      name: "验证码发送",
      click: function () {
        dialogDefine.value.footBtn[0].disabled = true
        ElMessage.success("验证码已发送，两分钟内有效")
        let time = 120
        let interval = setInterval(() => {
          time--
          dialogDefine.value.footBtn[0].name = "剩余时间：" + time
          if (time === 0) {
            dialogDefine.value.footBtn[0].disabled = false
            clearInterval(interval)
          }
        }, 1000)
      },
    }, {
      name: "确认",
      type: "primary",
      click: function () {
        if (formValidate.value) {
          visible.value = !visible.value
          formValidate.value = false
        } else {
          ElMessage.error("有字段未通过校验，请仔细检查")
        }
      },
    }],
    beforeClose: function () {
      visible.value = !visible.value
    },
    formDefine: {
      form: [{
        key: "phone",
        component: "el-input",
        label: "手机号",
        placeholder: "请输入手机号",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
      }, {
        key: "option",
        component: "el-select",
        placeholder: "请选择认证方式",
        label: "认证方式",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
        options: [{
          value: "phone",
          label: "手机验证"
        }, {
          value: "email",
          label: "邮箱验证"
        }]
      }, {
        key: "code",
        component: "el-input",
        placeholder: "请输入验证码",
        label: "验证码",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
      }],
      data: {phone: "", repeat: "", option: "phone", code: ""},
      rules: {
        phone: [{
          required: true,
          validator: function (rule, value, callback) {
            let reg = /^1[0-9]{10}$/
            if (value === '') {
              callback(new Error('手机号不能为空'))
            } else if (!reg.test(value)) {
              callback(new Error('请输入正确的手机号'))
            }
          }, trigger: ['blur', 'change']
        }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: ['blur', 'change']
        }]
      },
      validate: function (_, pass) {
        formValidate.value = pass
      }
    }
  }
}

function emailModify() {
  visible.value = true
  dialogDefine.value = {
    title: "邮箱修改",
    width: "35%",
    mode: "form",
    footBtn: [{
      name: "验证码发送",
      click: function () {
        dialogDefine.value.footBtn[0].disabled = true
        ElMessage.success("验证码已发送，两分钟内有效")
        let time = 120
        let interval = setInterval(() => {
          time--
          dialogDefine.value.footBtn[0].name = "剩余时间：" + time
          if (time === 0) {
            dialogDefine.value.footBtn[0].disabled = false
            clearInterval(interval)
          }
        }, 1000)
      },
    }, {
      name: "确认",
      type: "primary",
      click: function () {
        if (formValidate.value) {
          visible.value = !visible.value
          formValidate.value = false
        } else {
          ElMessage.error("有字段未通过校验，请仔细检查")
        }
      },
    }],
    beforeClose: function () {
      visible.value = !visible.value
    },
    formDefine: {
      form: [{
        key: "email",
        component: "el-input",
        label: "邮箱",
        placeholder: "请输入邮箱地址",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
      }, {
        key: "option",
        component: "el-select",
        placeholder: "请选择认证方式",
        label: "认证方式",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
        options: [{
          value: "phone",
          label: "手机验证"
        }, {
          value: "email",
          label: "邮箱验证"
        }]
      }, {
        key: "code",
        component: "el-input",
        placeholder: "请输入验证码",
        label: "验证码",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
      }],
      data: {email: "", repeat: "", option: "phone", code: ""},
      rules: {
        email: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur',
        },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          }],
        code: [{
          required: true,
          message: '请输入验证码',
          trigger: ['blur', 'change']
        }]
      },
      validate: function (_, pass) {
        formValidate.value = pass
      }
    }
  }
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
  }
}
</style>