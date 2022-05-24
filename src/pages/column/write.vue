<template>
  <el-container class="column-container">
    <el-row class="column-main">
      <el-row class="introduce-block">
        <el-upload
            class="cover-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <el-image v-if="coverUrl" class="cover" :src="coverUrl"></el-image>
          <el-icon v-else class="cover-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
        <el-row class="info" align="top">
          <el-input class="title" placeholder="请输入标题" v-model="title"></el-input>
          <!--          <span class="title">{{ data.title }}</span>-->
          <el-row class="introduce">
            {{ data.introduce }}
          </el-row>
        </el-row>
      </el-row>
      <el-row class="detail-block">
        <el-row class="header">
          <span class="option" v-for="item in bar" :key="item.key"
                :class="{'option-select': currentOption === item.key}" @click="currentOption = item.key">{{
              item.label
            }}</span>
        </el-row>
        <el-row class="main">
        </el-row>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue"

let data = ref({
  cover: "../../src/assets/images/column.png",
  title: "深入浅出设计模式",
  introduce: "用生动的例子详解 23 种设计模式，结合具体代码实战，以及有趣的课后练习，助你彻底理解设计模式.",
  view: "15735",
  agree: "15735",
  tags: ["go", "云原生", "kubernetes", "go", "云原生", "kubernetes"]
})

let body = null
let coverUrl = ref("")
let title = ref("")
let currentOption = ref("blog")
let bar = ref([
  {
    key: "blog",
    label: "已收录",
  },
  {
    key: "",
    label: "全部可收录"
  }
])

function init() {
  background()
}

function background() {
  body = document.body
  body.style.backgroundColor = "var(--el-color-white)"
}

function handleAvatarSuccess() {

}

function beforeAvatarUpload() {

}

onBeforeUnmount(() => {
  body.style.backgroundColor = "rgb(247 248 250)"
})

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">

.column-container {
  width: fit-content;
  margin: 40px auto;

  .column-main {
    width: 737px;
    margin-right: 56px;

    .introduce-block {
      width: 100%;
      height: 200px;
      margin-bottom: 54px;

      .cover-uploader {
        margin-right: 24px;

        ::v-deep(.el-upload) {
          border: 1px dashed var(--el-border-color);
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: var(--el-transition-duration-fast);
        }

        .cover-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 150px;
          height: 200px;
          text-align: center;
        }
      }

      .cover {
        width: 150px;
        height: 200px;
        border-radius: 8px;
        box-shadow: var(--el-box-shadow-lighter);
      }

      .info {
        width: calc(100% - 176px);
        height: 100%;

        .title {

          ::v-deep(.el-input__wrapper) {
            box-shadow: unset;
            padding: unset;

            .el-input__inner {
              height: 32px;
              width: 100%;
              font-size: 22px;
              line-height: 32px;
              color: var(--el-text-color-primary);
              font-weight: 500
            }
          }
        }

        .title::-webkit-input-placeholder {
          color: var(--el-text-color-placeholder);
        }

        .introduce {
          font-size: 14px;
          flex: 1 1 auto;
          line-height: 24px;
          margin-top: 4px;
          height: calc(100% - 36px);
          -webkit-line-clamp: 4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }
    }

    .detail-block {
      width: 100%;

      .header {
        width: 100%;
        height: 45px;
        border-bottom: 1px solid var(--el-border-color);

        .option {
          font-size: 18px;
          line-height: 28px;
          color: var(--el-text-color-primary);
          margin-right: 40px;
          cursor: pointer;
          margin-bottom: -1px;
          font-weight: 500;
        }

        .option-select {
          border-bottom: 2px solid var(--el-text-color-primary);
        }
      }

      .main {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
}
</style>