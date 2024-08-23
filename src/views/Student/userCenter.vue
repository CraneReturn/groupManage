<template>
  <div class="userCenter">
    <div class="background-img">
      <img src="@/assets/image/2024082121.png" alt="" />
    </div>
    <div class="user-container">
      <div class="user-avatar">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div class="header-content">
        <div class="user-name">蛋黄派</div>
        <div class="user-college">信息工程学院</div>
      </div>
      <div class="user-info">
        <h2>基本信息</h2>
        <div class="info-content">
          <el-form :model="form" label-width="auto">
            <el-form-item label="昵称">
              <el-input v-model="form.name" clearable />
            </el-form-item>
            <el-form-item label="学院">
              <el-input v-model="form.college" clearable />
            </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="form.speciality" clearable />
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="form.ownClass" clearable />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone" clearable />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio value="male">男</el-radio>
                <el-radio value="female">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="sumbtn">
              <el-button type="primary" @click="onSubmit">修改</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="user-info">
        <h2>邮箱</h2>
        <div class="info-content">
          <el-form :model="Eform" label-width="auto">
            <el-form-item label="邮箱">
              <el-input v-model="Eform.email" />
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                style="width: 180px; margin-right: 10px"
                v-model="Eform.code"
                placeholder="在邮箱中获取验证码"
              >
              </el-input>
              <el-button type="primary" plain>获取验证码</el-button>
            </el-form-item>
            <el-form-item class="sumbtn" style="margin-left: 53px">
              <el-button type="primary" @click="onSubmit">绑定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="user-info">
        <h2>密码</h2>
        <div class="info-content">
          <el-form :model="Eform" label-width="auto">
            <el-form-item label="旧密码">
              <el-input v-model="Eform.email" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="Eform.email" />
            </el-form-item>
            <el-form-item class="sumbtn" style="margin-left: 53px">
              <el-button type="primary" @click="onSubmit">修改密码</el-button>
              <el-button type="danger" class="forgetpass" @click="foegetWord()" plain>忘记密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="forget-max" v-show="isforget">
      <div class="foeget-pass">
        <h3>忘记密码</h3>
        <div class="pass-con">
          <el-form :model="Eform" label-width="auto">
            <el-form-item label="新密码">
              <el-input v-model="Eform.email" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="Eform.email" />
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                style="width: 180px; margin-right: 10px"
                v-model="Eform.code"
                placeholder="在邮箱中获取验证码"
              >
              </el-input>
              <el-button type="primary" plain>获取验证码</el-button>
            </el-form-item>
            <el-form-item class="sumbtn" style="margin-left: 66px">
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button type="danger" class="forgetpass" @click="foegetWord()" plain>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";
import { log } from "console";

const imageUrl = ref(
  "https://upload-bbs.miyoushe.com/upload/2020/12/09/93665875/d1a3de452a1ec0fb6863d675f8b6a7b4_356406130344679371.gif"
);

const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const form = reactive({
  name: "",
  college: "",
  speciality: "",
  ownClass: "",
  phone: "",
  sex: "",
});

const Eform = reactive({
  email: "",
  code: "",
});

const isforget = ref<boolean>(false);

const onSubmit = () => {
  console.log("submit!");
};

const foegetWord = () => {
  isforget.value= !isforget.value;
};
</script>

<style lang="scss" scoped>
.userCenter {
  width: 900px;
  min-height: 100vh;
  margin: auto;
  position: relative;
  background-color: #fff;
  .background-img {
    width: 100%;
    height: 210px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .user-container {
    width: 100%;
    position: relative;
    .user-avatar {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -40px;
      left: 20px;
    }
    .header-content {
      padding-left: 135px;
      padding-bottom: 20px;
      .user-name {
        font-size: 18px;
      }
      .user-college {
        color: #666;
        font-size: 13px;
      }
    }
  }
  .user-info {
    padding: 2px 15px;
    .info-content {
      padding: 0 30px;
      .sumbtn {
        margin-left: 38px;
      }
      .forgetpass {
        width: 68px;
        font-size: 12px;
        height: 24px;
        margin-top: 5px;
      }
    }
  }
  h2 {
    color: #666;
    font-size: 21px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-top: 10px;
    font-weight: bold;
    text-align: left;
  }
  .forget-max {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1001;
    .foeget-pass {
      position: fixed;
      width: 500px;
      height: 280px;
      background-color: aliceblue;
      top: 50%;
      left: 50%;
      border-radius: 5px;
      transform: translate(-50%, -60%);
      padding: 10px;
      .pass-con{
        padding: 10px;
        margin-top: 10px;
      }
    }
  }
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  border-radius: 50%;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
