<template>
  <el-dialog v-model="props.visible" custom-class="collectDialog" :width="520"
             @open="open" @closed="closed" destroy-on-close>
    <el-row class="title" justify="center">{{ title }}</el-row>
    <el-form :model="form" ref="formRef" class="form" hide-required-asterisk>
      <el-form-item class="form-item" label="名称" prop="name" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
        <el-input v-model="form.name" :maxlength="50" placeholder="请输入收藏集名称"/>
      </el-form-item>
      <el-form-item class="form-item" label="描述" prop="introduce">
        <el-input v-model="form.introduce" :maxlength="100" type="textarea" :rows="8" resize="none" show-word-limit
                  placeholder="请输入收藏描述（限00字，选填）"/>
      </el-form-item>
      <el-form-item class="form-item" prop="authority">
        <el-radio-group v-model="form.authority" class="radio">
          <el-radio :label="1">
            <span>公开</span>
            <span class="explain">公共可见此收藏集</span>
          </el-radio>
          <el-radio :label="2">
            <span>隐私</span>
            <span class="explain">仅自己可见此收藏集</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="commit(formRef)" :loading="loading">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "CollectDialog"
}
</script>

<script setup>
import {ref} from "vue"
import {error} from "../../../utils/message";

const emits = defineEmits(["update:visible"])
const props = defineProps({
  mode: String,
  visible: Boolean,
})

let mode = ref("")
let loading = ref(false)
let title = ref("")
let form = ref({})
let formRef = ref()


function open() {
  initData()
}

function initData() {
  mode.value = props.mode
  loading.value = false
  if (mode.value === 'create') {
    title.value = "新建收藏集"
    form.value = {name: "", introduce: ""}
  } else {
    title.value = "编辑收藏集"
    getData()
  }
}

function getData() {

}

function commit(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("表单输入有误，请检查")
    } else {
      toCommit()
      return true
    }
  })
}

function toCommit() {

}

function close() {
  emits("update:visible", false)
}

function closed() {
  emits("update:visible", false)
}
</script>

<style scoped lang="scss">
.collectDialog {
  .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    text-align: center;
    color: #252933;
    margin-bottom: 28px;
  }

  .form-item {
    .radio {
      flex-direction: column;
      align-items: start;

      .explain {
        margin-left: 10px;
        font-size: 13px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>