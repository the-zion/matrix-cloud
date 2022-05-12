<template>
  <el-container class="card">
    <el-row class="block" justify="space-between">
      <el-row>
        <el-avatar shape="square" :size="80" :src="'../src/assets/images/boy.png'"/>
        <el-row class="profile" justify="space-between">
          <el-row class="info">
            <el-row class="name">{{ username }}</el-row>
            <el-row class="intro">{{ introduce }}</el-row>
          </el-row>
          <el-space>
            <el-tag
                v-for="item in tags"
                type="info"
                effect="light"
                round
            >
              {{ item.label }}
            </el-tag>
          </el-space>
        </el-row>
      </el-row>
      <el-row id="cartoon" class="cartoon"></el-row>
    </el-row>
  </el-container>
</template>
<script>
export default {
  name: "MatrixUserCard"
}
</script>

<script setup>
import {ref, onMounted} from "vue"
import {echartsInit} from "../../../../utils/globalFunc";

let username = ref("刘小圆sama")
let introduce = ref("海纳百川，有容乃大")
let echarts = echartsInit()
let chart = null
let tags = ref([
  {
    "key": 1,
    "label": "go"
  },
  {
    "key": 2,
    "label": "IT互联网"
  }
])

let cartoonOptions = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'HELLOWORLD',
          fontSize: 60,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            }
          ]
        }
      }
    ]
  }
}

function init() {
  chart = echarts.init(document.getElementById('cartoon'));
  chart.setOption(cartoonOptions)
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;

  .block {
    width: 100%;

    .profile {
      margin-left: 1.25rem;
      flex-direction: column;

      .info {
        flex-direction: column;

        .name {
          font-weight: 600;
          color: var(--el-text-color-primary);
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .intro {
          color: var(--el-text-color-secondary);
          font-size: 13px;
        }
      }
    }

    .cartoon {
      height: 100%;
      width: 600px;
    }
  }
}
</style>