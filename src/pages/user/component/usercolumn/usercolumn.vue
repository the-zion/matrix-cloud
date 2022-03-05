<template>
  <el-container>
    <el-main>
      <cube-dialog :visible="visible" :define="dialogDefine"></cube-dialog>
      <el-space size="large">
        <el-date-picker v-model="date" type="date" placeholder="选择日期" @change="dataChange">
        </el-date-picker>
        <el-button type="primary" icon="plus" @click="columnClick">新建</el-button>
      </el-space>
      <el-row class="body">
        <cube-column-card v-for="data in dataList" :data="data" :option="'date'"></cube-column-card>
      </el-row>
    </el-main>
    <el-footer>
      <el-pagination
          v-model:currentPage="currentPage"
          class="home-pagination"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
          @current-change="pageCurrentChange"
      >
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "CubeUserColumn"
}
</script>
<script setup>
import {defineEmits, ref} from "vue";
import {globalFunc} from "../../../../utils/globalFunc";
import {ElMessage} from "element-plus";

const emits = defineEmits(["upToTop"])
const currentPage = ref(1)
const date = ref()
const visible = ref()
const dialogDefine = ref()
const {loadFullScreen, getClassList} = globalFunc()
const classList = getClassList()


const dataList = ref([])

for (let i = 0; i < 20; i++) {
  dataList.value.push({
    title: "Docker入门",
    image: '../../src/assets/images/user1.png',
    author: "刘小圆",
    date: "2022-03-02"
  })
}

function dataChange(date) {
  console.log(date)
  let loading = loadFullScreen()
  setTimeout(() => {
    loading.close()
  }, 1000)
}

function pageCurrentChange(item) {
  let loading = loadFullScreen()
  setTimeout(() => {
    loading.close()
  }, 1000)
  emits("upToTop", "")
}

function columnClick() {
  visible.value = true
  dialogDefine.value = {
    title: "专栏新增",
    width: "40%",
    mode: "form",
    position: "right",
    footBtn: [{
      name: "取消",
      click: function () {

      },
    }, {
      name: "发布",
      type: "primary",
      click: function () {

      },
    }],
    beforeClose: function () {
      visible.value = !visible.value
    },
    formDefine: {
      form: [{
        key: "name",
        component: "el-input",
        label: "名字",
        placeholder: "为你的专栏起一个好听的名字吧",
        labelWidth: '70px',
        maxlength: 20,
        style: "width:calc(100% - 70px)",
      }, {
        key: "class",
        component: "el-select",
        placeholder: "选择大类",
        label: "选择大类",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
        options: classList,
        change: function (value) {
          classList.forEach(function (item) {
            if (item.value === value) {
              dialogDefine.value.formDefine.form[1].options = item.children
              dialogDefine.value.formDefine.data.subclass = item.children[0].value
            }
          })
        }
      }, {
        key: "subclass",
        component: "el-select",
        placeholder: "选择子类",
        label: "选择子类",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
        options: classList[0].children
      }, {
        key: "cover",
        component: "el-upload",
        label: "封面",
        labelWidth: '70px',
        style: "width:calc(100% - 70px)",
        imageStyle: "width:396px; height: 230px;border-radius:5px",
        onChange: function (fileObject) {
          let file = fileObject.raw
          const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
          const isLt2M = file.size / 1024 / 1024 < 2

          if (!isJPG) {
            ElMessage.error('只能上传 JPG/PNG/GIF 格式的图片!')
          }
          if (!isLt2M) {
            ElMessage.error('图片大小不得大于 2MB!')
          }
          dialogDefine.value.formDefine.data.image = URL.createObjectURL(file)
          return isJPG && isLt2M
        }
      }],
      data: {class: "language", subclass: "python"},
    }
  }
}
</script>

<style scoped lang="scss">
.body {
  width: 1100px;
  margin-top: 20px;
}

</style>