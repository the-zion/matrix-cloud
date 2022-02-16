<template>
  <el-container class="login-container">
    <el-carousel class="login-carousel" height="100%">
      <el-carousel-item v-for="item in imagesBox" :key="item">
        <img :src="'../../src/assets/images/'+item" class="login-image">
      </el-carousel-item>
    </el-carousel>
    <el-main class="login-main">
      <el-row class="login-left" justify="center" align="middle">
        <el-row class="login-body">
          <el-row class="login-block">
            <router-view v-slot="{ Component }">
              <transition name="login" mode="out-in">
                <component :is="Component"/>
              </transition>
            </router-view>
          </el-row>
        </el-row>
      </el-row>
      <el-row class="login-right" align="middle">
        <el-image class="login-background" src="../../src/assets/images/cube-main.svg"></el-image>
      </el-row>
    </el-main>
  </el-container>
</template>

<script setup>
import {ref} from "vue"

const imagesBox = ["background1.jpg", "background2.jpg", "background3.jpg", "background4.jpg"]
</script>

<style lang="scss" scoped>

.login-container {
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .login-carousel {
    height: 100%;

    .login-image {
      //position: absolute;
      height: 100%;
      width: 100%;
    }
  }

  .login-main {
    position: absolute;
    padding: unset;
    display: flex;
    background: rgba(0, 0, 0, 0);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    .login-left {
      width: 64%;

      .login-body {
        background: #FFFFFF;
        height: 550px;
        width: 444px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        border: 1px solid #dee0e3;

        .login-block {
          padding: 32px;
          height: 100%;
          width: 100%;
        }

        .login-enter-active, .login-leave-active {
          transition: opacity 0.3s linear;
        }

        .login-enter-from, .login-leave-to {
          opacity: 0;
        }
      }
    }


    .login-right {
      width: 36%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #FFFFFF;
      opacity: 0.7;

      .login-background {
        width: 100%;
      }
    }
  }
}
</style>