<template>
  <el-container class="qq">
    <el-main>
      <el-result
          class="result"
          :icon="type"
          :title="title"
          :sub-title="description"
      >
        <template v-if="type !== 'error'" #icon>
          <el-avatar :size="56" class="icon" :src="getAssets('qq.png')"/>
        </template>
      </el-result>
    </el-main>
  </el-container>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import {post} from "../../../utils/axios";
import {userMainStore} from "../../../store/user";
import router from "../../../router";
import {getAssets, setTitle} from "../../../utils/globalFunc";
import {wordCheck} from "../../../utils/secret";

const userStore = userMainStore()
let type = ref()
let title = ref()
let description = ref()

function init() {
  setTitle("QQ 登录")
  if (!useRoute().query["state"] || !useRoute().query["code"]) {
    resultMark("error", "登录失败", "关键参数缺失")
    return
  }

  if (!stateCheck(useRoute().query["state"])) {
    resultMark("error", "登录失败", "参数校验失败")
    return
  }
  qqLogin()
}

function stateCheck(state) {
  return wordCheck(state)
}

function qqLogin() {
  resultMark("", "登录中", "使用QQ登录中，请稍后...")
  post("/v1/user/login/qq", {code: useRoute().query["code"]}).then(function (reply) {
    localStorage.setItem(import.meta.env.VITE_MATRIX_TOKEN_KEY, reply.data.token)
    userStore.getUserProfile()
    router.push({name: 'home', query: {page: 'news'}})
  }).catch(function () {
    resultMark("error", "登录失败", "未知错误，请稍后再试")
  })
}

function resultMark(t, ti, des){
  type.value = t
  title.value = ti
  description.value = des
}

onMounted(function () {
  init()
})


</script>

<style scoped lang="scss">
.qq {
  .result {
    .icon {
      font-size: 56px;
      background-color: var(--el-color-white);
      color: var(--el-color-black);
    }

    ::v-deep(.el-avatar>img) {
      height: 40px !important;
    }
  }
}
</style>