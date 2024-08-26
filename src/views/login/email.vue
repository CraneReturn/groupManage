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
      <el-button
        color="#3f7ab9"
        type="primary"
        plain
        @click="send"
        :disabled="sendIt"
      >
        {{ sendIt ? `发送中...(${countdown})` : "发送验证码" }}
      </el-button>
    </div>
    <div class="password">
      <el-input
        v-model="password"
        size="large"
        placeholder="请输入用户密码"
        show-password
      />
    </div>
  </div>
  <div class="userOprate">
    <el-button type="primary" class="loginIt" @click="back">返回登录</el-button>
    <el-button type="primary" class="loginIt" @click="find">找回密码</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineEmits } from "vue";
import { sendCode, findPassword } from "@/api/login";
import { ElMessage } from "element-plus";

const sendIt = ref(false);
const email = ref("");
const code = ref("");
const password = ref("");
const countdown = ref(60);

const isEmailValid = (email: string) =>
  /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/.test(email);
const passwordTest = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
const send = async () => {
  if (!isEmailValid(email.value)) {
    ElMessage({
      message: "邮箱格式错误",
      type: "error",
      plain: true,
    });
    return;
  }

  sendIt.value = true;
  try {
    await sendCode({ codeType: 2, email: email.value });
    const timer = setInterval(() => {
      if (countdown.value <= 0) {
        sendIt.value = false;
        countdown.value = 60;
        clearInterval(timer);
        sessionStorage.removeItem("countdown");
      } else {
        countdown.value--;
        sessionStorage.setItem("countdown", countdown.value.toString());
      }
    }, 1000);
  } catch (error) {
    ElMessage({
      message: "发送失败，请重试",
      type: "error",
      plain: true,
    });
    sendIt.value = false;
  }
};

const find = async () => {
  if (!email.value || !code.value || !password.value) {
    ElMessage({
      message: "信息未填写完整",
      type: "error",
      plain: true,
    });
    return;
  }
  if (!isEmailValid(email.value)) {
    ElMessage({
      message: "邮箱格式错误",
      type: "error",
      plain: true,
    });
    return;
  }

  if (!passwordTest(password.value)) {
    ElMessage({
      message: "密码格式不正确：含英文大小写至少八位字符",
      type: "error",
      plain: true,
    });
    return;
  }

  try {
    await findPassword({
      email: email.value,
      code: code.value,
      password: password.value,
    });
    ElMessage({
      message: "密码找回成功",
      type: "success",
      plain: true,
    });
    back();
  } catch (error) {
    ElMessage({
      message: "找回密码失败，请重试",
      type: "error",
      plain: true,
    });
  }
};

const loadCountdown = () => {
  const storedCountdown = sessionStorage.getItem("countdown");
  if (storedCountdown) {
    countdown.value = parseInt(storedCountdown, 10);
  }
};
const emit = defineEmits(["back"]);

function back() {
  emit("back", true);
}
onMounted(() => {
  loadCountdown();
});

watch(countdown, (newVal) => {
  if (newVal <= 0) {
    sessionStorage.removeItem("countdown");
  }
});
</script>

<style lang="scss" scoped>
.email {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  margin-top: 20px;
  width: 100%;
}

.userOprate {
  display: flex;
  align-items: center;
}
</style>
