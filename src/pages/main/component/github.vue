<template>
  <el-container class="github">
    <el-main>
      <el-result
          class="result"
          :icon="type"
          :title="title"
          :sub-title="description"
      >
        <template v-if="type !== 'error'" #icon>
          <el-avatar :size="56" class="icon iconfont icon-github-fill"/>
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

const userStore = userMainStore()
let type = ref()
let title = ref()
let description = ref()

function init() {
  let err = useRoute().query["error"]
  if (err){
    type.value = "error"
    title.value = err
    description.value = useRoute().query["error_description"]
  }else{
    githubLogin()
  }
}

function githubLogin(){
  title.value = "登录中"
  description.value = "使用GitHub登录中，请稍后..."
  post("/v1/user/login/github", {code: useRoute().query["code"]}).then(function (reply) {
    localStorage.setItem(import.meta.env.VITE_MATRIX_TOKEN_KEY, reply.data.token)
    userStore.getUserProfile()
    router.push({name: 'home', query: {page: 'news'}})
  }).catch(function () {
    type.value = "error"
    title.value = "登录失败"
    description.value = "未知错误，请稍后再试"
  })
}

onMounted(function () {
  init()
})


</script>

<style scoped lang="scss">
.github{
  .result{
    .icon{
      font-size: 56px;
      background-color: var(--el-color-white);
      color: var(--el-color-black);
    }
  }
}
</style>