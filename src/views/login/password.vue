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
    </div>
  </div>
  <el-button type="primary" @click="loginIt()">登录</el-button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "@/stores";
import { ElMessage } from "element-plus";
const store = userStore();
let count = ref();
let password = ref();
const loginIt = () => {
  if (!count.value || !password.value) {
    ElMessage({
      message: "信息未填写完整",
      type: "warning",
      plain: true,
    });
  }
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

button {
  height: 40px;
  width: 100%;
  margin-top: 44px;
}
</style>
