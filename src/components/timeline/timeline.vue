<template>
  <el-container>
    <el-main>
      <el-timeline>
        <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :placement="activity.placement"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :hollow="activity.hollow"
            :timestamp="activity.timestamp"
        >
          <el-space fill class="body">
            <el-row>{{ activity.content }}</el-row>
            <el-row class="block" v-if="activity.type!=='more'">
              <cube-blog-introduce v-if="activity.type==='blog'" :row="activity.data"
                                   :style="'padding:unset;width:100%'"></cube-blog-introduce>
              <el-space fill :size="30">
                <cube-share v-if="activity.type==='community'" :data="activity.data"
                            @comment-click="activity.data.visible = !activity.data.visible"
                ></cube-share>
                <cube-comment v-if="activity.type==='community' && activity.data.visible"></cube-comment>
              </el-space>
            </el-row>
            <el-row v-if="activity.type==='more'" justify="center" align="middle">
              <el-space>
                <hr class="line"/>
                <el-button plain @click="load">加载更多</el-button>
                <hr class="line"/>
              </el-space>
            </el-row>
          </el-space>
        </el-timeline-item>
      </el-timeline>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
  name: "CubeTimeLine",
}
</script>

<script setup>
import {ref} from "vue"
import {globalFunc} from "../../utils/globalFunc";

let {loadFullScreen} = globalFunc()


function load() {
  let loading = loadFullScreen()
  setTimeout(() => {
    loading.close()
  }, 1000)
}

const activities = ref([
  {
    content: '发表了博客，快去看看吧',
    timestamp: '2022-02-25 20:46',
    size: 'large',
    icon: "document",
    placement: "top",
    type: "blog",
    data: {
      id: '1',
      date: '2016-05-03',
      name: 'TomTomTomTomTomTomTom',
      tag: "数据结构和算法",
      introduction: 'Docker从入门到入土Docker从入门到入土Docker从入门到入土Docker从入门到入土',
      content: '容器其实是一种沙盒技术。顾名思义，沙盒就是能够像一个集装箱一样，把你的应用“装”起来的技术。这样，应用与应用之间，就因为有了边界而不至于相互干扰。',
      title: "Docker入门"
    },
  },
  {
    content: '发表了动态，快去看看吧',
    timestamp: '2022-02-25 20:46',
    size: 'large',
    icon: "chat-dot-round",
    placement: "top",
    type: "community",
    data: {
      id: 1,
      avatar: '../../src/assets/images/user1.png',
      name: "刘思圆",
      date: "2022-2-12 20:56:30",
      text: "我觉得，一个人要想活得有朝气，就得没谱儿，得有新东西进来，新东西出去，得完全不知道明天会发生什么，如果还能一直有“新喜欢的东西”和“新不喜欢的东西”那就太幸福了，“新”代表着你还在不停地接触新东西，而“喜欢和不喜欢”代表着你还有态度，永远骂街，永远热泪盈眶",
      images: ["background1.jpg", "background2.jpg", "background3.jpg"],
      love: 1000,
      comment: 1000,
      visible: false
    }
  },
  {
    content: 'Custom size',
    timestamp: '2022-02-25 20:46',
    size: 'large',
    icon: "MoreFilled",
    placement: "top",
    type: "blog",
    data: {
      id: '1',
      date: '2016-05-03',
      name: 'TomTomTomTomTomTomTom',
      tag: "数据结构和算法",
      introduction: 'Docker从入门到入土Docker从入门到入土Docker从入门到入土Docker从入门到入土',
      content: '容器其实是一种沙盒技术。顾名思义，沙盒就是能够像一个集装箱一样，把你的应用“装”起来的技术。这样，应用与应用之间，就因为有了边界而不至于相互干扰。',
      title: "Docker入门"
    },
  },
  {
    content: 'Custom size',
    timestamp: '2022-02-25 20:46',
    size: 'large',
    icon: "MoreFilled",
    placement: "top",
    type: "blog",
    data: {
      id: '1',
      date: '2016-05-03',
      name: 'TomTomTomTomTomTomTom',
      tag: "数据结构和算法",
      introduction: 'Docker从入门到入土Docker从入门到入土Docker从入门到入土Docker从入门到入土',
      content: '容器其实是一种沙盒技术。顾名思义，沙盒就是能够像一个集装箱一样，把你的应用“装”起来的技术。这样，应用与应用之间，就因为有了边界而不至于相互干扰。',
      title: "Docker入门"
    },
  },
  {
    content: 'Custom size',
    timestamp: '2022-02-25 20:46',
    size: 'large',
    icon: "MoreFilled",
    placement: "top",
    type: "blog",
    data: {
      id: '1',
      date: '2016-05-03',
      name: 'TomTomTomTomTomTomTom',
      tag: "数据结构和算法",
      introduction: 'Docker从入门到入土Docker从入门到入土Docker从入门到入土Docker从入门到入土',
      content: '容器其实是一种沙盒技术。顾名思义，沙盒就是能够像一个集装箱一样，把你的应用“装”起来的技术。这样，应用与应用之间，就因为有了边界而不至于相互干扰。',
      title: "Docker入门"
    },
  },
  {
    icon: "more-filled",
    size: 'large',
    type: "more",
  }
])
</script>

<style scoped lang="scss">
.body {
  width: 100%;

  .line {
    width: 400px;
    background: #DCDFE6;
    border: unset;
    height: 1px
  }

  .block {
    width: 100%;
    min-width: unset;
    padding: 16px 40px;
    border: 1px solid var(--el-border-color-base);
    border-radius: 10px;
    margin: 10px 0
  }
}
</style>