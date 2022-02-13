<template>
  <el-backtop target=".main-scrollbar" ref="backTop"></el-backtop>
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
        <el-affix :offset="60">
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
        </el-affix>
        <el-main class="body-main">
          <el-form inline model="formInline">
            <el-form-item label="分类" v-show="classSelect !== 0">
              <el-select v-model="subClassSelect" placeholder="please select your zone" @change="classSelectChange">
                <el-option v-for="item in classList[classSelect].children" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序">
              <el-select v-model="orderSelect" placeholder="please select your zone" @change="orderSelectChange">
                <el-option label="默认" value="id"></el-option>
                <el-option label="最热" value="hot"></el-option>
                <el-option label="一周最热" value="week"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="body-separate"></div>
          <div class="body-block" v-for="item in 9">
            <el-space wrap class="user-line">
              <el-avatar :size="35" :src="'../../src/assets/images/user1.png'"></el-avatar>
              <div class="user-name">刘思圆</div>
              <div class="date">2022-2-12 20:56:30</div>
            </el-space>
            <el-row class="content-word">
              {{
                "我觉得，一个人要想活得有朝气，就得没谱儿，得有新东西进来，新东西出去，得完全不知道明天会发生什么，如果还能一直有“新喜欢的东西”和“新不喜欢的东西”那就太幸福了，“新”代表着你还在不停地接触新东西，而“喜欢和不喜欢”代表着你还有态度，永远骂街，永远热泪盈眶"
              }}
            </el-row>
            <div class="images-line">
              <el-image :preview-src-list="['../../src/assets/images/'+item]" v-for="item in imagesBox"
                        :src="'../../src/assets/images/'+item" class="image-item"></el-image>
            </div>
            <el-space class="foot-line">
              <el-icon class="icon-symbol">
                <img src="../../assets/images/like.svg" style="color: #409EFF;height: 1em;width: 1em;cursor: pointer">
              </el-icon>
              <div class="icon-word">11.1k</div>
              <el-icon class="icon-symbol" @click="dialogTableVisible = true">
                <chat-dot-round/>
              </el-icon>
              <div class="icon-word">11.1k</div>
            </el-space>
            <!--            <div class="foot-line">-->
            <!--              -->
            <!--            </div>-->
          </div>
          <el-pagination
              v-model:currentPage="currentPage3"
              class="body-pagination"
              :page-size="100"
              :small="small"
              layout="prev, pager, next, jumper"
              :total="1000"
              @current-change="pageCurrentChange"
          >
          </el-pagination>
        </el-main>
      </el-container>
    </div>
  </el-container>
</template>

<script setup>
import {initData} from "./initData.js"
import {controller} from "./controller.js"
import {reactive, ref, defineEmits} from "vue";

let imagesBox = ref(["background1.jpg", "background2.jpg", "background3.jpg"])

let {backTop, carouselBox, classList, classSelect, subClassSelect, orderSelect} = initData()
let {
  classClick,
  classSelectChange,
  orderSelectChange,
  pageCurrentChange
} = controller(classSelect, subClassSelect, orderSelect, backTop)
const formInline = reactive({
  user: '',
  region: '',
})
const dialogTableVisible = ref(false)

const onSubmit = () => {
  console.log('submit!')
}

</script>

<style scoped lang="scss">
.community-container {
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
          border-right: unset;

          .el-menu-item.is-active {
            background: var(--el-menu-hover-bg-color);
          }
        }
      }

      .body-main {
        position: relative;
        right: 0px;
        width: 792px;
        border-left: 1px solid var(--el-border-color-base);

        .body-separate {
          height: 8px;
          background: #f5f8fa;
        }

        .body-block {
          padding: 20px;
          border-bottom: 1px solid var(--el-border-color-base);

          .user-line {
            margin-bottom: 20px !important;

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
            margin-bottom: 20px;
          }

          .images-line {
            display: flex;
            margin-bottom: 20px;

            .image-item {
              width: 120px;
              height: 120px;
              margin-right: 20px;
              border-radius: 5px;
            }
          }

          .foot-line {
            margin-bottom: 20px;

            .icon-symbol {
              cursor: pointer;
              color: #409EFF
            }

            .icon-word {
              color: #909399;
              margin-right: 20px;
            }
          }
        }

        .body-pagination {
          margin-top: 20px;
        }
      }
    }
  }
}

</style>