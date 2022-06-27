<template>
  <el-container class="profile-container">
    <el-row class="title-block" justify="space-between">
      <span class="world">个人资料</span>
    </el-row>
    <el-row class="main-block">
      <el-form :model="form" class="form" ref="formRef" label-position="left" :disabled="form.status === 2">
        <el-form-item prop="username" label="用户名" class="form-item" :label-width="80" :rules="[{
          required: true,
          message: '该字段不能为空',
          trigger: 'blur',
        }]">
          <el-input v-model="form.username" type="text" :maxlength="20" show-word-limit
                    placeholder="请输入用户名" size="large">
          </el-input>
        </el-form-item>
        <el-form-item prop="school" label="毕业院校" class="form-item" :label-width="80">
          <el-input v-model="form.school" type="text" :maxlength="50" show-word-limit
                    placeholder="请输入毕业院校" size="large">
          </el-input>
        </el-form-item>
        <el-form-item prop="company" label="公司" class="form-item" :label-width="80">
          <el-input v-model="form.company" type="text" :maxlength="50" show-word-limit
                    placeholder="请输入所在公司" size="large">
          </el-input>
        </el-form-item>
        <el-form-item prop="job" label="职位" class="form-item" :label-width="80">
          <el-input v-model="form.job" type="text" :maxlength="50" show-word-limit
                    placeholder="请输入职位" size="large">
          </el-input>
        </el-form-item>
        <el-form-item prop="homepage" label="个人主页" class="form-item" :label-width="80" :rules="[{
          type: 'url',
          message: '网址格式错误',
          trigger: ['blur'],
        }]">
          <el-input v-model="form.homepage" type="text" :maxlength="100" show-word-limit
                    placeholder="请输入个人主页地址" size="large">
          </el-input>
        </el-form-item>
        <el-form-item prop="introduce" label="个人介绍" class="form-item" :label-width="80" style="align-items: start">
          <el-input v-model="form.introduce" type="textarea" :maxlength="100" show-word-limit
                    placeholder="请输入个人介绍" size="large" :rows="5" resize="none">
          </el-input>
        </el-form-item>
        <el-button :type="form.status === 1 && 'primary'" class="button" @click="update(formRef)" :disabled="form.status === 2"
        >{{ form.status === 1 ? "保存修改" : "审核中" }}
        </el-button>
      </el-form>
      <el-row class="avatar" align="middle">
        <el-upload
            class="avatar-uploader"
            :http-request="avatarUpload"
            :show-file-list="false"
            accept="image/png, image/jpeg, image/jpg"
            :before-upload="beforeAvatarUpload"
        >
          <template #tip>
            <el-progress v-show="uploading" style="margin-top: 5px" :percentage="percentage" :show-text="false"/>
            <el-row justify="center" align="middle" style="margin-top: 5px">
              <span style="font-size: 14px">我的头像</span>
              <el-tooltip
                  effect="dark"
                  content="支持 jpg、png、jpeg 格式大小 2M 以内的图片"
                  placement="bottom"
                  :hide-after="50"
              >
                <el-icon :size="14" style="margin-left: 5px">
                  <InfoFilled/>
                </el-icon>
              </el-tooltip>
            </el-row>
          </template>
          <el-avatar :src="tempAvatarUrl || form.avatar || avatar.baseUrl + uuid + '.webp'" :size="90" shape="square">
            <el-icon :size="50">
              <UserFilled/>
            </el-icon>
          </el-avatar>
          <el-row class="avatar-shadow" align="middle" justify="center">
            <el-icon :size="25" color="var(--el-color-white)">
              <CameraFilled/>
            </el-icon>
            <span class="word">点击上传</span>
          </el-row>
        </el-upload>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>

import {onMounted, ref} from "vue"
import {error, success, warning} from "../../utils/message";
import {get, post} from "../../utils/axios";
import {initCos} from "../../utils/cos";
import {storeToRefs} from "pinia"
import {loginTimeOut} from "../../utils/globalFunc";
import {userMainStore, baseMainStore} from "../../store";

const cos = initCos()
const userStore = userMainStore()
const baseStore = baseMainStore()
const {uuid} = storeToRefs(userStore)
const {avatar} = storeToRefs(baseStore)


let uploading = ref(false)
let percentage = ref(0)
let tempAvatarUrl = ref("")
let formRef = ref()
let form = ref({
  avatar: "",
  username: "",
  school: "",
  job: "",
  company: "",
  homepage: "",
  introduce: "",
  status: 1,
})

function init() {
  getData()
}

function getData() {
  get("/v1/get/user/profile/update").then(function (reply) {
    form.value = reply.data
  }).catch(function (err) {
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "TOKEN_EXPIRED":
          loginTimeOut()
          return
      }
    }
    error("资料获取失败")
  })
}

function beforeAvatarUpload(rawFile) {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/jpg' && rawFile.type !== 'image/png') {
    error('头像必须是 jpg/jpeg/png 格式的')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    error('图片大小不超过 2MB')
    return false
  }
  return true
}


function avatarUpload(UploadRequestOptions) {
  if (!uuid.value) {
    warning("账号未登录，请先登录")
    return
  }
  uploading.value = true
  percentage.value = 0
  let file = UploadRequestOptions.file
  let filetype = UploadRequestOptions.file.type.split("/")[1]
  cos.uploadFile({
    Bucket: baseStore.avatar.bucket,
    Region: baseStore.avatar.region,
    Key: baseStore.avatar.key + uuid.value + "." + filetype,
    Headers: {
      'x-cos-meta-uuid': uuid.value,
    },
    Body: file,
    onProgress: function (progressData) {
      percentage.value = progressData.percent
    }
  }, function (err, data) {
    if (err) {
      error("图片上传失败，请稍后再试")
      return
    }
    success("图片上传成功")
    uploading.value = false
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      tempAvatarUrl.value = reader.result;
    };
  });
}

function update(formRef) {
  if (!formRef) {
    error("未知错误")
    return
  }
  formRef.validate((valid) => {
    if (!valid) {
      error("信息输入有误，请检查")
    } else {
      toUpdate()
      return true
    }
  })
}

function toUpdate() {
  post("/v1/set/user/profile/update", form.value).then(function () {
    form.value.status = 2
    success("更改成功，后台审核中")
  }).catch(function (err) {
    let response = err.response
    if (response) {
      switch (response.data.reason) {
        case "TOKEN_EXPIRED":
          loginTimeOut()
          return
        case "USER_NAME_CONFLICT":
          error("用户名已存在")
          return
      }
    }
    error("资料更改失败")
  })
}


onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">

.profile-container {
  padding: 20px;
  background-color: var(--el-color-white);
  flex-direction: column;

  .title-block {
    padding-bottom: 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);

    .world {
      font-size: 18px;
      line-height: 22px;
      font-weight: 500;
      color: var(--el-text-color-primary);
    }
  }

  .main-block {
    width: 100%;

    .form {
      width: 570px;

      .button {
        margin: 20px 0 20px 100px;
      }

      .form-item {
        margin: unset;
        padding: 20px;
        align-items: center;
      }
    }

    .avatar {
      padding: 30px 0 0 80px;
      flex-direction: column;

      .avatar-uploader {
        position: relative;

        .avatar-shadow {
          flex-direction: column;
          opacity: 0;
          height: 90px;
          width: 90px;
          position: absolute;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.3);

          .word {
            font-size: 12px;
            color: var(--el-color-white);
          }
        }

        .avatar-shadow:hover {
          opacity: 1;
        }
      }
    }
  }

}
</style>