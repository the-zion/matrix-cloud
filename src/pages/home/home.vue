<template>
  <el-container class="home-container">
    <el-main class="home-main">
      <div class="home-options">
        <el-row class="home-row">
          <div class="home-group-label">所属类目：</div>
          <el-radio-group v-model="classIndex" class="home-radio-group" @change="classSelect">
            <el-radio :label="0">全部</el-radio>
            <el-radio :label="index + 1" v-for="(item,index) in classList">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="home-row" v-if="classIndex !== 0">
          <div class="home-group-label">所属子类：</div>
          <el-radio-group v-model="subClassIndex" @change="subClassSelect">
            <el-radio :label="index" v-for="(item,index) in classList[classIndex-1].child">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-row>
        <el-row class="home-row">
          <div class="home-group-label">筛选排序：</div>
          <el-select v-model="orderValue" placeholder="Select" class="home-filter" @change="orderSelect">
            <el-option
                v-for="item in orderOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <el-date-picker
              v-model="date"
              type="date"
              placeholder="请选择时间段"
              :editable="false"
              :popper-class="'home-filter'"
              @change="dateSelect"
          >
          </el-date-picker>
        </el-row>
      </div>
      <div class="home-body">
        <!--        <el-empty description="暂无数据"></el-empty>-->
        <div class="body-item">
          <el-row class="body-item-row body-item-title">{{ 'Alipay' }}</el-row>
          <el-row class="body-item-row">
            <el-space wrap :size="10">
              <el-tag
                  v-for="item in tags"
                  :key="item.label"
                  class="mx-1"
                  :type="item.type"
                  effect="plain"
              >
                {{ item.label }}
              </el-tag>
            </el-space>
          </el-row>
          <el-descriptions class="body-item-descriptions">
            <el-descriptions-item label="段落示意:">{{ bodyContent }}</el-descriptions-item>
          </el-descriptions>
          <el-row class="body-item-row" :gutter="20">
            <span class="body-item-userimage">
              <el-avatar :size="24" :src="'./src/assets/images/user.jpg'"></el-avatar>
            </span>
            <span class="body-item-username">{{ '付小小' }}</span>
            <span class="body-item-icon">
              <el-icon>
                <clock/>
              </el-icon>
            </span>
            <span class="body-item-date">{{ '2022-01-31 15:22' }}</span>
          </el-row>
          <el-row class="body-item-row">
            <el-space :size="'small'" :spacer="spacer">
              <div class="body-info">
                <el-icon>
                  <img src="../../assets/images/like.svg" class="body-item-like">
                </el-icon>
                <div class="body-info-count">1111</div>
              </div>
              <div class="body-info">
                <el-icon>
                  <star/>
                </el-icon>
                <div class="body-info-count">1111</div>
              </div>
              <div class="body-info">
                <el-icon>
                  <chat-dot-round/>
                </el-icon>
                <div class="body-info-count">1111</div>
              </div>
            </el-space>
          </el-row>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script setup>
import {ref} from "vue"
import {initData} from "./initData.js"
import {controller} from "./controller.js"

let {classIndex, subClassIndex, classList, orderValue, orderOptions, date, spacer} = initData()
let {classSelect, subClassSelect, orderSelect, dateSelect} = controller()
const tags = ref([
  {type: '', label: 'Tag 1'},
  {type: 'success', label: 'Tag 2'},
  {type: 'info', label: 'Tag 3'},
  {type: 'danger', label: 'Tag 4'},
  {type: 'warning', label: 'Tag 5'},
])
const bodyContent = ref("蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。")

</script>

<style scoped lang="scss">
.home-container {
  height: 100%;

  .home-main {

    .home-options {
      padding: 24px;
      background: #FFFFFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }


    .home-row {
      align-items: start;
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 16px;
      padding-bottom: 11px;

      .home-group-label {
        height: 32px;
        font-size: 13px;
        display: flex;
        align-items: center;
      }

      .home-radio-group {
        width: 90%;
      }

      .home-filter {
        margin-right: 20px;
      }
    }

    .home-row:last-child {
      border-bottom: unset;
      margin-bottom: unset;
      padding-bottom: unset;
    }

    .home-body {
      margin-top: 24px;
      padding: 8px 32px 32px;
      background: #FFFFFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

      .body-item {
        padding: 16px 24px;

        .body-item-title {
          color: #409EFF;
        }

        .body-item-row {
          margin-bottom: 12px;
          display: flex;
          align-items: center;

          .body-item-userimage {
            display: flex;
            margin-left: 5px;
            margin-right: 5px;
          }

          .body-item-username {
            font-size: 14px;
            color: #409EFF;
          }

          .body-item-icon {
            display: flex;
            margin: 0 5px 0 10px;
            color: #C0C4CC;
          }

          .body-item-date {
            font-size: 13px;
            color: #C0C4CC;
          }

          .body-info {
            display: flex;
            color: #909399;

            .body-item-like {
              height: 1em;
              width: 1em;
            }

            .body-info-count {
              margin-left: 5px;
              font-size: 13px;
            }
          }
        }

        .body-item-descriptions {
          width: 730px;
        }
      }
    }
  }
}
</style>