<template>
  <el-dialog v-model="props.visible" :top="'5vh'" custom-class="editDialog" title="资料编辑" :width="600"
             @open="open" @closed="closed">
    <el-scrollbar max-height="100%">
      <el-form :model="form" label-position="top" class="form" ref="formRef">
        <el-row justify="space-between">
          <el-form-item label="昵称" class="width" prop="nickname" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
            <el-input v-model="form.nickname" placeholder="请输入一个昵称" :maxlength="20" show-word-limit/>
          </el-form-item>
          <el-form-item label="姓名" class="width">
            <el-input v-model="form.name" placeholder="请输入你的姓名" :maxlength="20" show-word-limit/>
          </el-form-item>
        </el-row>
        <el-row justify="space-between">
          <el-form-item label="性别" class="width">
            <el-select class="select" v-model="form.sex" placeholder="请选择你的性别">
              <el-option
                  v-for="item in sexOptions"
                  :label="item.key"
                  :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="行业" class="width">
            <el-input v-model="form.industry" placeholder="请输入所在行业" :maxlength="20" show-word-limit/>
          </el-form-item>
        </el-row>
        <el-row justify="space-between">
          <el-form-item label="居住地" class="width">
            <el-cascader :show-all-levels="false" class="select" v-model="form.location" :options="locationOptions"
                         placeholder="请选择你的居住地"/>
          </el-form-item>
          <el-form-item label="毕业院校" class="width">
            <el-cascader class="select" :show-all-levels="false" v-model="form.school" :options="schoolOptions"
                         placeholder="请选择毕业院校"/>
          </el-form-item>
        </el-row>
        <el-form-item label="邮箱" class="width" prop="email" :rules="[{
          type: 'email',
          message: '邮箱格式错误',
          trigger: ['blur'],
        }]">
          <el-input v-model="form.email" placeholder="请输入你的邮箱" :maxlength="50" show-word-limit/>
        </el-form-item>
        <el-form-item label="个人网站" prop="web" :rules="[{
          type: 'url',
          message: '网址格式错误',
          trigger: ['blur'],
        }]">
          <el-input v-model="form.web" placeholder="https://" :maxlength="100" show-word-limit/>
        </el-form-item>
        <el-form-item label="Github" prop="github" :rules="[{
          type: 'url',
          message: '网址格式错误',
          trigger: ['blur'],
        }]">
          <el-input v-model="form.github" placeholder="https://" :maxlength="100" show-word-limit/>
        </el-form-item>
        <el-form-item label="Gitee" prop="gitee" :rules="[{
          type: 'url',
          message: '网址格式错误',
          trigger: ['blur'],
        }]">
          <el-input v-model="form.gitee" placeholder="https://" :maxlength="100" show-word-limit/>
        </el-form-item>
        <el-space class="tag" direction="vertical" fill>
          <span>标签</span>
          <el-tooltip
              effect="dark"
              content="标签最多可设置五个，每个字数不超过10"
              placement="right"
          >
            <el-icon class="info_filled">
              <info-filled/>
            </el-icon>
          </el-tooltip>
          <el-space size="large" wrap>
            <el-tag
                round
                type="info"
                v-for="tag in tags"
                :key="tag"
                closable
                @close="tagClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-popover placement="bottom" trigger="click" :show-arrow="false" @hide="popoverHide" :hide-after="10"
                        transition="">
              <template #reference>
                <el-space :size="2" class="add">
                  <el-icon>
                    <plus/>
                  </el-icon>
                  <span>添加</span>
                </el-space>
              </template>
              <el-input :maxlength="10" show-word-limit v-model="tagInput"></el-input>
            </el-popover>
          </el-space>
        </el-space>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=close>取消</el-button>
        <el-button type="primary" @click="save(formRef)"
        >保存</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "MatrixCenterProfileEdit"
}
</script>

<script setup>
import {ref} from "vue"
import {info, error} from "../../../../../utils/message";


const emits = defineEmits(["update:visible"])
const props = defineProps({
  visible: Boolean
})

let tags = ref([])
let tagInput = ref()

let sexOptions = [{
  key: "男"
}, {
  key: "女"
}]

let locationOptions = [{
  value: '广东省',
  label: '广东省',
  children: [
    {
      value: '深圳市',
      label: '深圳市',
    }
  ]
}]

let schoolOptions = [{
  value: '山东省',
  label: '山东省',
  children: [
    {
      value: '青岛市',
      label: '青岛市',
      children: [{
        value: '中国海洋大学',
        label: '中国海洋大学',
      }]
    }
  ]
}]

let form = ref({
  nickname: "",
  sex: "",
  name: "",
  industry: "",
  location: "",
  school: "",
  email: "",
  introduce: "",
  web: "",
  github: "",
  gitee: "",
  tags: ""
})

let formRef = ref()

function tagClose(tag) {
  tags.value.splice(tags.value.indexOf(tag), 1)
}

function popoverHide() {
  if (!tagInput.value) {
    return
  }
  if (tags.value.length === 5) {
    info("标签最多可设置五个")
    return
  }
  tags.value.push(tagInput.value)
  tagInput.value = ""
}

function open() {
  console.log("datata")
}

function close() {
  emits("update:visible", false)
}

function closed() {
  tags.value = []
  formRef.value.resetFields(["nickname", "sex", "name", "industry", "location", "school", "email", "introduce", "web", "github", "gitee"])
  emits("update:visible", false)
}

function save(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid, test1) => {
    if (!valid) {
      formRef.scrollToField(Object.keys(test1)[0])
      error("提交的信息有误，请检查")
    } else {
      return true
    }
  })
}
</script>

<style scoped lang="scss">
.form {
  .width {
    width: 258px;
    margin-bottom: 28px;

    ::v-deep(.select) {
      width: 100%;
    }
  }

  .add {
    cursor: pointer;
    color: var(--el-text-color-secondary);
  }

  .tag {
    position: relative;
    width: 100%;

    .info_filled {
      position: absolute;
      top: 3px;
      left: 35px;
      cursor: pointer;
    }
  }
}
</style>