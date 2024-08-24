<template>
  <div class="userCenter">
    <div class="background-img">
      <img src="@/assets/image/2024082121.png" alt="" />
    </div>
    <div class="user-container">
      <div class="user-avatar">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div class="header-content">
        <div class="user-name">{{ userInfo.nickname }}</div>
        <div class="user-college">{{ userInfo.ownClass }}</div>
      </div>
      <div class="user-info">
        <h2>基本信息</h2>
        <div class="info-content">
          <el-form :model="form" label-width="auto">
            <el-form-item label="学号">
              <span>{{userInfo.account}}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickname" placeholder="请输入昵称" clearable />
            </el-form-item>
            <el-form-item label="学院">
              <el-input v-model="form.college" placeholder="请输入你的学院" clearable />
            </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="form.speciality" placeholder="请输入你的专业" clearable />
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="form.ownClass" placeholder="请输入你的班级" clearable />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone" placeholder="请输入你的电话" clearable />
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio value="男" name="sex">男</el-radio>
                <el-radio value="女" name="sex">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="sumbtn">
              <el-button type="primary" @click="reviseInfo">修改</el-button>
              <el-button @click="fetchUserInfo">取消</el-button>
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
          <el-form :model="Pform" label-width="auto">
            <el-form-item label="旧密码">
              <el-input type="password" v-model="Pform.oldpass" show-password />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input type="password" v-model="Pform.newpass" show-password />
            </el-form-item>
            <el-form-item class="sumbtn" style="margin-left: 53px">
              <el-button type="primary" @click="revisePassword">修改密码</el-button>
              <!-- <el-button
                type="danger"
                class="forgetpass"
                @click="foegetWord()"
                plain
                >忘记密码</el-button
              > -->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- <div class="forget-max" v-show="isforget">
      <div class="foeget-pass">
        <h3>忘记密码</h3>
        <div class="pass-con">
          <el-form :model="Fform" label-width="auto">
            <el-form-item label="新密码">
              <el-input type="password" v-model="Fform.newpass" show-password />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" v-model="Fform.conpass" show-password />
            </el-form-item>
            <el-form-item label="验证码">
              <el-input
                style="width: 180px; margin-right: 10px"
                v-model="Fform.code"
                placeholder="在邮箱中获取验证码"
              >
              </el-input>
              <el-button type="primary" plain>获取验证码</el-button>
            </el-form-item>
            <el-form-item class="sumbtn" style="margin-left: 66px">
              <el-button type="primary" @click="onSubmit">确定</el-button>
              <el-button
                type="danger"
                class="forgetpass"
                @click="foegetWord()"
                plain
                >取消</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, UploadFile } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import {
  getOwnGroupInfo,
  getOwnInfo,
  upImg,
  upavatar,
  updateInfo,
  updatePassword,
} from "@/api/student.ts";

const imageUrl = ref(
  "https://upload-bbs.miyoushe.com/upload/2020/12/09/93665875/d1a3de452a1ec0fb6863d675f8b6a7b4_356406130344679371.gif"
);

//上传头像
const handleChange = (file: UploadFile) => {
  console.log("当前文件:", file);
  if (!ispicture(file.raw)) {
    ElMessage.error("请上传图片文件!");
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小超过2MB!");
  } else {
    const formData = new FormData();
    formData.append("file", file.raw);
    upImg(formData) // 调用上传函数
      .then((res) => {
        upavatar(res.data)
          .then((response) => {
            imageUrl.value = res.data;
            ElMessage.success("上传成功");
          })
          .catch((err) => {
            ElMessage.error("上传失败");
            console.error(err);
          });
      })
      .catch((error) => {
        ElMessage.error("上传失败");
        console.error(error);
      });
  }
};

//修改用户信息
const reviseInfo = () => {
  if (isnull(form.value.nickname)) {
    ElMessage.warning("昵称不能为空");
  } else if (isnull(form.value.college)) {
    ElMessage.warning("学院不能为空");
  } else if (isnull(form.value.speciality)) {
    ElMessage.warning("专业不能为空");
  } else if (isnull(form.value.ownClass)) {
    ElMessage.warning("班级不能为空");
  } else if (isnull(form.value.phone)) {
    ElMessage.warning("电话不能为空");
  } else if (!phonereg.test(form.value.phone)) {
    ElMessage.warning("电话格式错误");
  } else {
    updateInfo(
      form.value.nickname,
      form.value.college,
      form.value.speciality,
      form.value.ownClass,
      form.value.phone,
      form.value.sex
    ).then((res) => {
        fetchUserInfo();
        ElMessage.success("修改成功");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const revisePassword = ()=>{
    if(isnull(Pform.value.oldpass)){
      ElMessage.warning("请填写你的旧密码");
    }else if(isnull(Pform.value.newpass)){
      ElMessage.warning("请填写你的新密码");
    }else{
      updatePassword(Pform.value.newpass,Pform.value.oldpass)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
        console.log(Pform.value.newpass);
        
      })
    }
}

const form = ref({
  nickname: "",
  college: "",
  speciality: "",
  ownClass: "",
  phone: "",
  sex: "",
});

const Eform = ref({
  email: "",
  code: "",
});

const Pform = ref({
  oldpass: "",
  newpass: "",
});

const userInfo = ref({
  nickname: "用户",
  avatar: "",
  ownClass: "000",
  account:"000000000"
});

// const Fform = ref({
//   newpass: "",
//   conpass: "",
//   code: "",
// });

// const isforget = ref<boolean>(false);
// const foegetWord = () => {
//   isforget.value = !isforget.value;
// };

//空值判断
function isnull(val) {
  const str = val.replace(/(^\s*)|(\s*$)/g, "");
  if (str == "" || str == undefined || str == null) {
    return true;
  } else {
    return false;
  }
}

let phonereg =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

//判断图片类型
function ispicture(file) {
  let type = file.type;
  if (
    type === "image/git" ||
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type === "image/png" ||
    type === "image/webp"
  ) {
    return true;
  } else {
    return false;
  }
}

//获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await getOwnInfo();
    const data = response.data;
    form.value = { ...data };
    userInfo.value = { ...data };
    Eform.value.email = data.email;
    imageUrl.value = data.avatar;
  } catch (error) {
    console.error("获取组信息失败：", error);
  }
};
// 在组件挂载时调用 API
onMounted(() => {
  fetchUserInfo();
});
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
      .pass-con {
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
