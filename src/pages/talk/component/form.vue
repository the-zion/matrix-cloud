<template>
  <el-row class="talk-form">
    <el-form ref="formRef" v-model="form" label-position="top" class="form">
      <el-form-item label="标签" class="form-item">
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
      <el-form-item prop="auth" label="发布方式" class="form-item">
        <el-radio-group v-model="form.auth">
          <el-radio class="radio" v-for="item in authRadio" :label="item.id">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button class="button" type="primary" size="large" @click="createColumn">发布</el-button>
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
.talk-form {
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