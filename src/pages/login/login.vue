<template>
  <el-container>
    <el-main class="login-main">
      <div class="login-left">
        <div class="login-body">
          <div class="login-block">
            <router-view v-slot="{ Component }">
              <transition name="login" mode="out-in">
                <component :is="Component"/>
              </transition>
            </router-view>
          </div>
        </div>
      </div>
      <div class="login-right">
        <img class="login-background" src="../../assets/images/cube-main.svg">
      </div>
    </el-main>
  </el-container>
</template>

<script setup>

</script>

<style lang="scss">
.login-main {
  position: absolute;
  padding: unset;
  display: flex;
  background: #FFFFFF;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .login-left {
    width: 64%;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-body {
      height: 550px;
      width: 444px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      border: 1px solid #dee0e3;

      .login-block {
        padding: 32px;
        height: calc(100% - 64px);
        display: flex;
        flex-direction: column;
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
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .login-background {
      width: 100%;
    }
  }
}
</style>