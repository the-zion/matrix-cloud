<template>
  <el-form class="form" v-model="form">
    <el-form-item prop="cover" label="封面摘要" class="form-item">
      <el-radio-group v-model="radio" class="radio-group">
        <el-radio :label="1">有封面</el-radio>
        <el-radio :label="2">无封面</el-radio>
      </el-radio-group>
      <el-row class="cover-block">
        <el-upload
            v-if="radio === 1"
            class="uploader"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="cover"/>
          <el-icon v-else :size="28" class="uploader-icon" :color="'var(--el-text-color-secondary)'">
            <Plus/>
          </el-icon>
        </el-upload>
        <el-input
            class="textarea"
            v-model="form.textarea"
            maxlength="256"
            resize="none"
            placeholder="摘要（选填）：会在卡片、列表等场景外露，帮助读者快速了解内容，如不填写则默认抓取正文前256字符"
            show-word-limit
            type="textarea"
        />
      </el-row>
    </el-form-item>
    <el-form-item prop="tag" label="文章标签" class="form-item">
      <el-space wrap size="large">
        <el-popover placement="bottom-start" :width="432" trigger="hover" :show-arrow="false">
          <template #reference>
            <el-button icon="Plus" size="small">添加</el-button>
          </template>
          <matrix-tag v-model:selectedTags="form.tags"></matrix-tag>
        </el-popover>
        <el-tag
            v-for="tag in form.tags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="tagClose(tag)"
        >
          {{ tag }}
        </el-tag>
      </el-space>
    </el-form-item>
    <el-form-item prop="column" label="专栏分类" class="form-item">
      <el-row class="column-block">
        <el-row class="head">我的专栏</el-row>
        <el-radio-group v-model="form.column" class="group">
          <el-radio :label="item.id" v-for="item in columns" class="radio" size="small">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-row>
    </el-form-item>
    <el-form-item prop="type" label="文章类型" class="form-item">
      <el-radio-group v-model="form.type">
        <el-radio :label="1">原创</el-radio>
        <el-radio :label="2">转载</el-radio>
        <el-radio :label="3">翻译</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="auth" label="发布方式" class="form-item">
      <el-radio-group v-model="form.auth">
        <el-radio :label="1">公开</el-radio>
        <el-radio :label="2">私密</el-radio>
        <el-radio :label="3">关注者可见</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "MatrixSendBlog"
}
</script>

<script setup>
import {onMounted, ref} from "vue"

const emits = defineEmits(["open"])

let form = ref({
  imageUrl: "",
  textarea: "",
  tags: [],
  type: 1,
  auth: 1
})
let radio = ref(1)
let columns = ref([{
  id: 1,
  label: "云原生"
}, {
  id: 2,
  label: "Mysql"
}])

function uploadSuccess() {

}

function beforeUpload() {

}

function tagClose(tag) {
  form.value.tags.splice(form.value.tags.indexOf(tag), 1)
}

function validateTag(rule, value, callback) {
  value.length === 0 && callback(new Error("标签不能为空"))
  callback()
}


onMounted(function () {
  emits("open", form)
})
</script>

<style scoped lang="scss">
.form {
  width: 100%;

  .form-item {
    margin-bottom: 30px;
    width: 100%;

    .radio-group {
      width: 100%;
    }

    .cover-block {
      margin: 16px 0;
      width: 100%;

      .uploader {
        margin-right: 24px;

        .cover {
          width: 178px;
          height: 178px;
          display: block;
        }

        ::v-deep(.el-upload) {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }

        .uploader-icon {
          width: 160px;
          height: 90px;
          text-align: center;
        }
      }

      .textarea {
        width: 368px;
        height: 90px;

        ::v-deep(.el-textarea__inner) {
          height: 100%;
        }
      }
    }

    .column-block {
      width: 475px;
      height: 160px;
      padding: 0 16px;
      border: 1px solid var(--el-border-color-light);
      border-radius: 4px;
      flex-direction: column;

      .head {
        width: 100%;
        height: 33px;
        border-bottom: 1px solid var(--el-border-color-light);
        margin-bottom: 6px;
      }

      .group {
        width: 100%;
        height: calc(100% - 40px);
        overflow: auto;
        align-items: flex-start;

        .radio {
          height: 37px;
        }
      }
    }
  }
}
</style>