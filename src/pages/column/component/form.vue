<template>
  <el-row class="column-form">
    <el-form ref="formRef" v-model="form" label-position="top" class="form">
      <el-form-item label="文章标签" class="form-item">
        <el-popover placement="bottom-start" :width="432" trigger="click" :show-arrow="false">
          <template #reference>
            <el-select
                class="select"
                size="large"
                v-model="form.tags"
                popper-class="tags-dropdown-select"
                multiple
                placeholder="请选择标签"
            >
            </el-select>
          </template>
          <matrix-tag v-model:selectedTags="form.tags"></matrix-tag>
        </el-popover>
      </el-form-item>
      <el-form-item prop="auth" label="创建方式" class="form-item">
        <el-radio-group v-model="form.auth">
          <el-radio class="radio" v-for="item in authRadio" :label="item.id">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="source" label="文章来源" class="form-item">
        <el-radio-group v-model="form.source">
          <el-radio class="radio" v-for="item in sourceRadio" :label="item.id">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="url" label="转载url" class="form-item">
        <el-input :disabled="form.source === 1" placeholder="请输入转载url" maxlength="200" show-word-limit
                  v-model="form.url" type="textarea" resize="none" :rows="3"></el-input>
      </el-form-item>
    </el-form>
    <el-button class="button" type="primary" size="large" @click="createColumn">创建</el-button>
  </el-row>
</template>

<script>
export default {
  name: "Form"
}
</script>

<script setup>
import {ref} from "vue"
import {error} from "../../../utils/message";

let form = ref({
  source: 1,
  auth: 1,
  url: "",
  tags: [],
})
let formRef = ref()
let authRadio = [{
  id: 1,
  label: "公开"
}, {
  id: 2,
  label: "私密"
}, {
  id: 3,
  label: "关注者可见"
}]
let sourceRadio = [{
  id: 1,
  label: "原创"
}, {
  id: 2,
  label: "转载"
}]

function checkForm() {
  if (form.value.tags.length === 0) {
    error("请选择标签")
    return false
  }

  if (form.value.source === 2 && form.value.url === '') {
    error("请填写转载网址")
    return false
  }
  return true
}

function createColumn() {
  if (!checkForm()) {
    return null
  }
}


</script>

<style scoped lang="scss">
.column-form {
  width: 100%;

  .form {
    width: 100%;

    .form-item {
      width: 100%;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--el-border-color-light);

      .select {
        width: 100%;
      }

      .radio {
        font-weight: 400;
      }
    }
  }

  .button {
    width: 100%;
  }
}
</style>