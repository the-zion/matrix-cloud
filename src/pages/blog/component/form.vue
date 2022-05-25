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
      <el-form-item prop="column" label="所属专栏" class="form-item">
        <el-radio-group v-model="form.column">
          <el-radio class="radio" v-for="item in columnRadio" :label="item.id">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="cover" label="文章封面" class="form-item">
        <el-upload
            class="cover-uploader"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            :before-upload="beforeCoverUpload"
        >
          <el-image fit="cover" v-if="form.cover" :src="form.cover" class="avatar"/>
          <el-space v-else class="cover-uploader-icon" direction="vertical" :size="2">
            <el-icon>
              <Upload/>
            </el-icon>
            <span class="word">上传图片</span>
            <span class="word">JPG/PNG格式图片,大小200KB以内</span>
          </el-space>
        </el-upload>
      </el-form-item>
      <el-form-item prop="url" label="文章摘要" class="form-item">
        <el-input placeholder="摘要（选填）：会在卡片、列表等场景外露，帮助读者快速了解内容，如不填写则默认抓取正文前256字符"
                  maxlength="200" show-word-limit
                  v-model="form.url" type="textarea" resize="none" :rows="5"></el-input>
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
  column: ""
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

let columnRadio = ref([{
  id: 1,
  label: "深入浅出Docker"
}])

function handleCoverSuccess() {

}

function beforeCoverUpload() {

}

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

      .cover-uploader {
        ::v-deep(.el-upload) {
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
          background-color: var(--el-color-white);
        }

        .cover-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 240px;
          height: 148px;
          text-align: center;
          justify-content: center;

          .word {
            width: 170px;
            font-size: 12px;
            line-height: 20px;
            color: #999;
            margin-bottom: 6px;
          }
        }
      }
    }
  }

  .button {
    width: 100%;
  }
}
</style>