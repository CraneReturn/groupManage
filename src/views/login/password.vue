<template>
  <div class="password">
    <el-input
      v-model="count"
      size="large"
      placeholder="用户学号/工号"
      clearable
    />
    <div class="codeIt">
      <el-input
        v-model="password"
        type="password"
        placeholder="请输入用户密码"
        show-password
        size="large"
      />
      <a href="#">忘记密码</a>
    </div>
  </div>
  <el-button type="primary" @click="loginIt()">登录</el-button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "@/stores";
const store = userStore();
let count = ref();
let password = ref();
const loginIt = () => {
  store.Login(count.value, password.value);
};
</script>
<style lang="scss" scoped>
.password {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
a {
  font-size: 12px;
  color: #ccc;
}
a:hover {
  color: var(--jjext-color-dropdown-text);
}
button {
  height: 40px;
  width: 100%;
  margin-top: 20px;
}
</style>
