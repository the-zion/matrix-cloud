<template>
  <el-container class="community-container">
    <div class="community-body">
      <div class="carousel-block">
        <el-carousel height="208px">
          <el-carousel-item v-for="item in carouselBox" :key="item">
            <el-image style="width: 100%" :src="'../../src/assets/images/'+item" :fit="'cover'"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-container class="body-container">
        <el-aside class="body-aside" width="208px">
          <el-menu
              :default-active="0"
              class="aside-menu"
          >
            <el-menu-item v-for="(item,index) in classList" :index="index" class="aside-menu-item"
                          @click="classClick">
              <el-icon>
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.label }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="body-main">
          <el-form inline model="formInline">
            <el-form-item label="分类" v-show="classSelect !== 0">
              <el-select v-model="subClassSelect" placeholder="please select your zone">
                <el-option v-for="item in classList[classSelect].children" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序">
              <el-select v-model="orderSelect" placeholder="please select your zone">
                <el-option label="默认" value="id"></el-option>
                <el-option label="最热" value="hot"></el-option>
                <el-option label="一周最热" value="week"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="body-separate"></div>
          <div class="body-block">
            <el-space wrap class="user-line">
              <el-avatar :size="35" :src="'../../src/assets/images/user1.png'"></el-avatar>
              <div class="user-name">刘思圆</div>
              <div class="date">2022-2-12 20:56:30</div>
            </el-space>
            <el-row class="content-word">
              {{ "我觉得，一个人要想活得有朝气，就得没谱儿，得有新东西进来，新东西出去，得完全不知道明天会发生什么，如果还能一直有“新喜欢的东西”和“新不喜欢的东西”那就太幸福了，“新”代表着你还在不停地接触新东西，而“喜欢和不喜欢”代表着你还有态度，永远骂街，永远热泪盈眶" }}
            </el-row>
            <!--            <div class="user-line">-->
            <!--              <el-avatar :size="35" :src="'../../src/assets/images/user1.png'"></el-avatar>-->
            <!--              <div class="user-name">刘思圆</div>-->
            <!--            </div>-->
            <el-space fill>
              <el-image :src="'../../src/assets/images/background1.jpg'" style="width: 20%"></el-image>
              <el-image :src="'../../src/assets/images/background2.jpg'" style="width: 20%"></el-image>
              <el-image :src="'../../src/assets/images/background3.jpg'" style="width: 30%"></el-image>
            </el-space>
            <div class="images-line"></div>
            <div class="foot-line"></div>
          </div>
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>
<script setup>
import {initData} from "./initData.js"
import {controller} from "./controller.js"
import {reactive} from "vue";

let {carouselBox, classList, classSelect, subClassSelect, orderSelect} = initData()
let {classClick} = controller(classSelect, subClassSelect, orderSelect)
const formInline = reactive({
  user: '',
  region: '',
})


const onSubmit = () => {
  console.log('submit!')
}

</script>

<style scoped lang="scss">
.community-container {
  height: 100%;
  margin: auto;

  .community-body {
    display: flex;
    flex-direction: column;
    width: 1000px;
    margin: auto;
    min-height: 100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .carousel-block {
      height: 208px;
    }

    .body-container {
      height: 100%;

      .body-aside {
        .aside-menu {
          height: 100%;

          .el-menu-item.is-active {
            background: var(--el-menu-hover-bg-color);
          }
        }
      }

      .body-main {
        .body-separate {
          height: 8px;
          background: #f5f8fa;
        }

        .body-block {
          padding: 20px;

          .user-line {

            .user-name {
              font-size: 14px;
              color: #606266;
              line-height: 30px;
            }

            .date {
              font-size: 14px;
              color: #909399;
              line-height: 30px;
            }
          }

          .content-word {
            min-height: 24px;
            font-size: 15px;
            font-weight: 400;
            white-space: pre-wrap;
            line-height: 24px;
            margin: 10px 0;
          }
        }
      }
    }
  }
}

</style>