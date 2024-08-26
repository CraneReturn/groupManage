<template>
  <div class="loginIndex">
    <div class="top">
      <img
        src="@/assets/image/school.png"
        alt="河南科技学院logo"
        class="logo"
      />
    </div>
    <div class="main">
      <div class="tip">
        <p>WELCOME TO</p>
        <h1>小组管理系统</h1>
      </div>
      <Login />
    </div>
  </div>
</template>
<script setup lang="ts">
import Login from "./login.vue";
</script>
<style lang="scss" scoped>
.loginIndex {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url("@/assets/image/background.jpeg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  
}
.top {
  padding: 5px 10px;
  padding-right: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--el-color-white);
  width: 100%;
  opacity: 0.92;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 12vh;
  .logo {
    height: 100%;
  }
  p {
    font-size: 25px;
  }
}
.main {
  display: flex;
  justify-content: space-around;
  height: 100%;
  align-items: center;
  .tip {
    width: 50%;
    letter-spacing: 5px;
    color: var(--el-color-white);
    height: 40%;
    padding-left: 100px;
    p {
      font-size: 25px;
      font-family: cursive;
    }
    h1 {
      margin-top: 25px;
      font-size: 45px;
    }
  }
}
</style>
