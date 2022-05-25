<template>
  <el-container class="column-container">
    <el-drawer
        v-model="drawer"
        custom-class="drawer"
        direction="rtl"
        @closed="drawer = false"
        destroy-on-close
    >
      <template #title>
        <!--        todo 2.2.0版本以上换成header-->
        <el-row class="title">专栏创建</el-row>
      </template>
      <Form></Form>
    </el-drawer>
    <el-row class="column-header" align="middle" justify="space-between">
      <el-space>
        <el-image class="logo" @click="backToHome"
                  :src="'../../src/assets/images/matrix.svg'"
                  fit="contain"
        ></el-image>
        <span class="title">专栏创建</span>
      </el-space>
      <el-button type="primary" icon="ArrowDown" @click="drawer = true">创建</el-button>
    </el-row>
    <el-row class="column-main">
      <el-row class="introduce-area" justify="center">
        <el-row class="introduce-block">
          <el-upload
              class="cover-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <el-image v-if="coverUrl" class="cover" :src="coverUrl"></el-image>
            <el-icon v-else class="cover-uploader-block">
              <Plus/>
            </el-icon>
          </el-upload>
          <el-row class="info" align="top">
            <el-input class="title" placeholder="请输入标题" v-model="title" maxlength="20" show-word-limit></el-input>
            <el-input class="introduce" placeholder="请输入简介" type="textarea" resize="none" maxlength="100"
                      show-word-limit
                      v-model="introduce"></el-input>
          </el-row>
        </el-row>
      </el-row>
      <el-row class="operation-block">
        <el-row class="operation">
          <span class="option" v-for="item in bar" :key="item.key"
                :class="{'option-select': currentOption === item.key}" @click="currentOption = item.key">{{
              item.label
            }}</span>
        </el-row>
      </el-row>
      <el-row class="detail-block">
        <el-row class="main" justify="center">
          <el-table :data="tableData" class="table" style="width: 100%" height="440"
                    row-class-name="row-class"
                    header-row-class-name="header-row-class"
                    header-cell-class-name="header-cell-class">
            <el-table-column fixed prop="id" label="序号" :min-width="1"/>
            <el-table-column show-overflow-tooltip prop="title" label="标题" :min-width="3"/>
            <el-table-column show-overflow-tooltip prop="tags" label="标签" :min-width="3">
              <template #default="scope">
                <el-row style="width: 100%; overflow-x: auto">
                  <el-space>
                    <el-tag type="info" v-for="item in scope.row.tags">{{ item }}</el-tag>
                  </el-space>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="操作" :min-width="1">
              <template #default="scope">
                <el-button
                    size="small"
                    type="danger"
                    @click="rowDelete(scope.$index, scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              class="page"
              v-model:current-page="currentPage"
              :page-size="20"
              :pager-count="11"
              layout="prev, pager, next"
              :total="1000"
          />
        </el-row>
      </el-row>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue"
import {backToHome} from "../../utils/globalFunc";
import Form from "./component/form.vue"

let coverUrl = ref("")
let title = ref("")
let introduce = ref("")
let drawer = ref(false)
let currentPage = ref(1)
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

const tableData = ref([])

function init() {
  getData()
}

function getData() {
  for (let i = 0; i <= 9; i++) {
    tableData.value.push({
      id: i,
      title: '深入浅出Docker',
      tags: ["go", "云原生", "微服务", "go", "云原生", "微服务"]
    })
  }
}

function handleAvatarSuccess() {

}

function beforeAvatarUpload() {

}

function rowDelete() {

}

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">

.column-container {
  width: 100%;
  flex-direction: column;

  ::v-deep(.el-overlay) {
    background-color: unset;

    .drawer {
      background-color: var(--el-fill-color-lighter);
      box-shadow: var(--el-box-shadow-lighter);

      .el-drawer__header {
        margin-bottom: unset;
      }

      .title {
        font-size: 18px;
        font-weight: 400;
        color: var(--el-text-color-primary);
      }
    }
  }

  .column-header {
    width: 100%;
    height: 50px;
    padding: 0 40px;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--el-border-color);
    //box-shadow: var(--el-box-shadow-light);
    position: relative;
    z-index: 1;

    .logo {
      width: 95px;
      cursor: pointer;
    }

    .title {
      font-size: 16px;
      color: var(--el-text-color-primary);
    }
  }

  .column-main {
    width: 100%;

    .introduce-area {
      width: 100%;
      padding: 1.5rem 0;
      background-color: var(--el-color-white);

      .introduce-block {
        width: 737px;

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

          .cover-uploader-block {
            font-size: 28px;
            color: #8c939d;
            width: 120px;
            height: 150px;
            text-align: center;
            justify-content: center;
          }
        }

        .cover {
          width: 150px;
          height: 200px;
          border-radius: 8px;
          box-shadow: var(--el-box-shadow-lighter);
        }

        .info {
          width: 563px;
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
              }
            }
          }

          .title::-webkit-input-placeholder {
            color: var(--el-text-color-placeholder);
          }

          .introduce {
            height: calc(100% - 36px);

            ::v-deep(.el-textarea__inner) {
              box-shadow: unset;
              padding: unset;
              height: 100%;
              width: 100%;
              font-size: 14px;
              line-height: 24px;
              color: var(--el-text-color-primary);
            }

            ::v-deep(.el-input__count) {
              right: 0;
            }
          }

          .introduce::-webkit-input-placeholder {
            color: var(--el-text-color-placeholder);
          }
        }
      }
    }

    .operation-block {
      width: 100%;
      background-color: var(--el-color-white);
      box-shadow: 0px 2px 3px rgb(0 0 0 / 12%);

      .operation {
        width: 737px;
        margin: auto;
        height: 35px;

        .option {
          font-size: 16px;
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
    }

    .detail-block {
      width: 100%;

      .main {
        width: 737px;
        margin: 20px auto;
        padding: 1rem;
        box-shadow: var(--el-box-shadow-lighter);
        background-color: var(--el-color-white);
        border-radius: 5px;

        .table {
          width: 100%;

          ::v-deep(.header-row-class) {
            height: 45px;
          }

          ::v-deep(.row-class) {
            height: 45px;
          }

          ::v-deep(.header-cell-class) {
            color: var(--el-text-color-primary);
            font-weight: 500;
            font-size: 16px;
          }
        }

        .page {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>