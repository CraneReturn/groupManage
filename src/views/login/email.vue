<template>
  <div class="email">
    <el-input
      v-model="email"
      type="email"
      size="large"
      placeholder="用户邮箱"
      clearable
    />
    <div class="codeIt">
      <el-input
        v-model="code"
        placeholder="输入验证码"
        size="large"
        clearable
        style="width: 180px"
      />
      <el-button color="#3f7ab9" type="primary" plain>发送验证码</el-button>
    </div>
  </div>
  <el-button type="primary" class="loginIt">登录</el-button>
</template>
<script setup lang="ts">
import { ref } from "vue";
let email = ref();
let code = ref();
</script>
<style lang="scss" scoped>
.email {
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
.codeIt {
  display: flex;
  justify-content: space-between;
  button {
    height: 40px;
  }
}
.loginIt {
  height: 40px;
  margin-top: 44px;
  width: 100%;
}
</style>
