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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";

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
</script>

<style lang="scss" scoped>
.userCenter {
  width: 1000px;
  height: 100vh;
  margin: auto;
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
    padding: 15px;
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
