<template>
  <div class="login">
    <p class="title">欢迎登录<span>小组管理</span></p>
    <!-- 账号/工号登录 -->
    <!-- 短信登录 -->
    <div class="loginMain">
      <div class="loginWays">
        <button class="active" @click="changePassword">
          <p>密码登录</p>
          <span></span>
        </button>
        <!-- <button :class="{ active: !passwordShow }" @click="changeCode">
          <p>邮箱登录</p>
          <span></span>
        </button> -->
      </div>
      <div>
        <password v-if="passwordShow" />
        <a class="forget" v-if="passwordShow" @click="changeCode">忘记密码</a>
        <email v-else @back="back" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Password from "./password.vue";
import Email from "./email.vue";
import { ref } from "vue";

let passwordShow = ref(true);

const changeCode = () => {
  passwordShow.value = false;
};

const changePassword = () => {
  passwordShow.value = true;
};
function back(value: boolean) {
  passwordShow.value = value;
}
</script>

<style lang="scss" scoped>
a {
  font-size: 12px;
  color: #ccc;
  cursor: pointer;
}
a:hover {
  color: var(--jjext-color-dropdown-text);
}
.login {
  min-width: 375px;
  background-color: var(--el-menu-bg-color);
  height: 425px;
  border-radius: 5px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: 1px 2px 10px #333;

  .title {
    font-size: 23px;
    font-weight: 600;
    letter-spacing: 1px;

    span {
      color: #ccc;
      font-size: 15px;
      font-weight: 100;
      margin-left: 10px;
    }
  }

  .loginMain {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .loginWays {
    display: flex;
    gap: 10px;

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 15px;
        transition-duration: 0.25s;
      }

      span {
        display: block;
        width: 20px;
        height: 2px;
        margin-top: 5px;
        border-radius: 5px;
      }

      &.active {
        p {
          color: var(--jjext-color-dropdown-text);
        }

        span {
          background-color: var(--jjext-color-dropdown-text);
        }
      }
    }
  }
}
</style>
