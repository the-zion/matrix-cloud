<template>
  <el-container class="profile">
    <el-space fill direction="vertical" class="space">
      <el-row class="info">
        <el-row justify="center" class="follow" align="middle">
          <el-row class="block" justify="center">
            <el-row class="word">关注了</el-row>
            <el-row class="word c">{{ data.follow }}</el-row>
          </el-row>
          <el-divider class="follow-divider" direction="vertical" border-style="double"/>
          <el-row class="block" justify="center">
            <el-row class="word">关注者</el-row>
            <el-row class="word number">{{ data.follower }}</el-row>
          </el-row>
        </el-row>
        <el-row class="operate" justify="space-between">
          <el-button class="btn-message" icon="message" color="rgba(0,10,32,.05)">留言</el-button>
          <el-button class="btn-follow" color="#FFB800">+ 关注</el-button>
        </el-row>
        <el-row class="personal">
          <el-row class="title">个人简介</el-row>
          <el-row class="pro">{{ data.profile || "初来乍到，请多指教 ଘ(੭ˊᵕˋ)੭" }}</el-row>
        </el-row>
        <el-space fill class="detail" :size="10">
          <el-space class="each" alignment="flex-start">
            <el-icon class="icon">
              <location/>
            </el-icon>
            <el-row>{{ data.location || "未设置" }}</el-row>
          </el-space>
          <el-space class="each" alignment="flex-start">
            <el-icon class="icon" v-if="data.sex !== '女'">
              <male/>
            </el-icon>
            <el-icon class="icon" v-if="data.sex === '女'">
              <female/>
            </el-icon>
            <el-row>{{ data.sex || "未设置" }}</el-row>
          </el-space>
          <el-space class="each" alignment="flex-start">
            <el-icon class="icon">
              <school/>
            </el-icon>
            <el-row>{{ data.school || "未设置" }}</el-row>
          </el-space>
          <el-space class="each" alignment="flex-start">
            <el-icon class="icon">
              <monitor/>
            </el-icon>
            <el-row>{{ data.industry || "未设置" }}</el-row>
          </el-space>
          <el-space class="each" alignment="flex-start" s>
            <el-icon class="icon">
              <message/>
            </el-icon>
            <el-row>{{ data.email || "未设置" }}</el-row>
          </el-space>
        </el-space>
      </el-row>
      <el-divider class="divider" border-style="double"/>
      <el-row class="achievement">
        <el-row class="title">成就贡献</el-row>
        <el-space fill class="statistics" :size="15">
          <el-space>
            <el-icon class="iconfont icon-eye-fill eye"></el-icon>
            <el-row class="word">阅读总数</el-row>
            <el-row class="num">{{ achievement.view || 0 }}</el-row>
          </el-space>
          <el-space>
            <el-icon class="iconfont icon-like-fill like"></el-icon>
            <el-row class="word">获得点赞</el-row>
            <el-row class="num">{{ achievement.agree || 0 }}</el-row>
          </el-space>
          <el-space>
            <el-icon class="iconfont icon-star-fill star"></el-icon>
            <el-row class="word">获得收藏</el-row>
            <el-row class="num">{{ achievement.collect || 0 }}</el-row>
          </el-space>
          <el-space>
            <el-icon class="iconfont icon-read-fill read"></el-icon>
            <el-row class="word">博客发表</el-row>
            <el-row class="num">{{ achievement.blog || 0 }}</el-row>
          </el-space>
          <el-space>
            <el-icon class="iconfont icon-message-fill message"></el-icon>
            <el-row class="word">发起讨论</el-row>
            <el-row class="num">{{ achievement.talk || 0 }}</el-row>
          </el-space>
        </el-space>
      </el-row>
      <el-divider class="divider" border-style="double"/>
      <el-row class="skills">
        <el-row class="title">技能</el-row>
        <el-space wrap class="space">
          <el-tag
              v-for="item in skills"
              type="info"
              effect="light"
              round
          >
            {{ item }}
          </el-tag>
        </el-space>
      </el-row>
    </el-space>
  </el-container>
</template>

<script>
export default {
  name: "CubeUserProfile"
}
</script>

<script setup>
import {ref} from "vue"
import {Female} from "@element-plus/icons-vue";

// let data = ref({})
let data = ref({
  follow: 2,
  follower: 36,
  profile: "vegetable chicken 我不会GO，如果看到我的提交记录是GO写的，说明那天我摸了复制了代码打卡",
  sex: "男",
  location: "广东省深圳市",
  school: "中国海洋大学",
  industry: "互联网",
  email: "945212191@qq.com"
})

// let achievement = ref({})
let achievement = ref({
  view: "18.8k",
  agree: "361",
  collect: "329",
})

let skills = ref([
  "go", "kubernetes", "docker", "云原生", "javascript", "python"
])
</script>

<style scoped lang="scss">
.profile {
  min-height: 100px;
  background-color: var(--el-color-white);
  padding: 1rem;

  .space {
    width: 100%;

    .title {
      width: 100%;
      line-height: 22px;
      font-weight: 600;
      font-size: 16px;
      color: var(--el-text-color-primary)
    }

    .info {
      width: 100%;

      .follow {
        width: 100%;
        margin-bottom: 0.875rem;

        .block {
          width: 42px;
          margin: 0 1.55rem;

          .word {
            margin: 2px 0;
            font-size: 14px;
            color: var(--el-text-color-regular);
          }

          .number {
            color: var(--el-text-color-primary);
          }
        }

        .follow-divider {
          height: 30px;
        }
      }

      .operate {
        width: 100%;

        .btn-message {
          width: 128px;
          border: rgba(0, 10, 32, .05);
          color: var(--el-text-color-regular);
        }

        .btn-message:hover {
          background-color: rgba(0, 10, 32, .1);
        }

        .btn-message:focus {
          background-color: rgba(0, 10, 32, .1);
        }

        .btn-follow {
          width: 128px;
          color: var(--el-fill-color-lighter);
        }
      }

      .personal {
        width: 100%;
        margin-top: 1.5rem;

        .pro {
          width: 100%;
          margin: 16px 0;
          font-size: 14px;
          line-height: 1.625;
          color: var(--el-text-color-regular);
        }
      }

      .detail {
        width: 100%;

        .each {
          word-break: break-all;
          width: 100%;
          font-size: 14px;
          color: var(--el-text-color-regular);

          .icon {
            font-size: 18px;
            color: var(--el-text-color-primary);
          }
        }
      }

    }

    .divider {
      margin: 10px 0;
      border-top: 1px var(--el-border-color-lighter) var(--el-border-style);
    }

    .achievement {
      width: 100%;

      .statistics {
        margin-top: 1rem;
        width: 100%;

        .eye, .like, .star, .read, .message {
          font-size: 18px;
        }

        .eye {
          color: var(--el-color-primary);
        }

        .like {
          color: rgb(0 175 155)
        }

        .star {
          color: rgb(255 161 22)
        }

        .read {
          color: var(--el-color-danger)
        }

        .message {
          color: var(--el-border-color)
        }

        .word {
          font-size: 14px;
          color: var(--el-text-color-regular);
        }

        .num {
          font-size: 14px;
          color: var(--el-text-color-primary);
        }
      }
    }

    .skills {
      width: 100%;

      .space {
        margin: 1rem 0 !important;
      }
    }
  }
}
</style>