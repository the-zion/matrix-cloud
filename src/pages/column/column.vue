<template>
  <el-container class="column-container" data-background-content-before=":before">
    <el-row class="column-main">
      <el-row class="introduce-block">
        <el-image class="cover" :src="data.cover"></el-image>
        <el-row class="info" align="top">
          <span class="title">{{ data.title }}</span>
          <el-row class="introduce">
            {{ data.introduce }}
          </el-row>
          <el-row class="footer">
            <el-row class="left-area" justify="start" align="bottom">
              <el-button class="button">开始阅读</el-button>
            </el-row>
            <el-row class="right-area" justify="end" align="bottom">
              <span class="view">{{ data.view + "人阅读" }}</span>
              <el-row class="agree-collect" justify="end">
                <el-button class="button">
                  <template #icon>
                    <el-icon class="iconfont icon-like"></el-icon>
                  </template>
                  {{ data.agree > 1000 ? (data.agree / 1000).toFixed(1) + "k" : data.agree }}
                </el-button>
                <el-button class="button" icon="star">收藏</el-button>
              </el-row>
            </el-row>
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
          <component :is="currentOption === 'blog' ? 'matrix-blog-list':'matrix-comment'" shape="card" :gap="10"
                     :page-background="true"></component>
        </el-row>
      </el-row>
    </el-row>
    <el-row class="column-aside">
      <Aside :data="data"></Aside>
    </el-row>
  </el-container>
</template>

<script setup>
import {ref, onMounted} from "vue"
import Aside from "./component/aside.vue"

let data = ref({
  cover: "../../src/assets/images/column.png",
  title: "深入浅出设计模式",
  introduce: "用生动的例子详解 23 种设计模式，结合具体代码实战，以及有趣的课后练习，助你彻底理解设计模式.",
  view: "15735",
  agree: "15735",
  tags: ["go", "云原生", "kubernetes", "go", "云原生", "kubernetes"]
})
let backgroundImage = ref()
let currentOption = ref("blog")
let bar = ref([
  {
    key: "blog",
    label: "文章",
  },
  {
    key: "",
    label: "评论"
  }
])

function init() {
  background()
}

function background() {
  backgroundImage.value = "url(" + data.value.cover + ")"
}

onMounted(function () {
  init()
})

</script>

<style scoped lang="scss">
.column-container:before {
  content: "";
  height: 800px;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), v-bind(backgroundImage);
  background-position: 50% 17%;
  opacity: 0.2;
  background-size: cover;
  filter: blur(20px);
  z-index: -1;
}

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

      .cover {
        width: 150px;
        height: 200px;
        border-radius: 8px;
        box-shadow: var(--el-box-shadow-lighter);
        margin-right: 24px;
      }

      .info {
        width: calc(100% - 174px);
        height: 100%;

        .title {
          height: 32px;
          width: 100%;
          font-size: 22px;
          line-height: 32px;
          color: var(--el-text-color-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 500;
        }

        .introduce {
          font-size: 14px;
          flex: 1 1 auto;
          line-height: 24px;
          margin-top: 4px;
          height: 100px;
          -webkit-line-clamp: 4;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .footer {
          width: 100%;
          height: calc(100% - 144px);

          .button {
            font-weight: 400;
          }

          .left-area {
            width: 50%;
          }

          .right-area {
            width: 50%;

            .view {
              width: 100%;
              font-size: 12px;
              line-height: 20px;
              color: var(--el-text-color-primary);
              font-weight: 500;
              text-align: end;
            }

            .agree-collect {
              width: 100%;
              margin-top: 8px;
            }
          }
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

  .column-aside {
    width: 300px;
  }
}
</style>