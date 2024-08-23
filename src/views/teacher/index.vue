<!-- 教师端小组信息 -->
<template>
  <div class="layoutTeacher">
    <el-container>
      <el-header class="header">
        <div class="left">
          <!-- 头部信息 -->
          <!-- 小组logo以及小组名称 -->
          <router-link to="/teacher/info">
            <div class="logoAbout" :class="isCollapse ? 'active' : 'passive'">
              <div class="logo">
                <img src="@/assets/image/小组logo.png" alt="logo" />
              </div>
              <div class="info">
                <h1>未来软件工作室</h1>
                <span>指导教师</span>
              </div>
            </div>
          </router-link>
          <div class="change" @click="isCollapse = !isCollapse">
            <el-icon size="25px" v-if="!isCollapse"><Expand /></el-icon>
            <el-icon size="25px" v-else><Fold /></el-icon>
          </div>
        </div>
        <div class="right">
          <button
            class="userInfo"
            v-click-outside="onClickOutside"
            ref="buttonRef"
          >
            <p class="userName">欢迎 {{ userName }}</p>
            <div class="avater">
              <img :src="avater" alt="头像" />
            </div>
          </button>
        </div>
        <el-popover
          ref="popoverRef"
          :virtual-ref="buttonRef"
          trigger="click"
          virtual-triggering
          width="80px"
        >
          <div class="moreUserInfo">
            <!-- 用户信息 -->
            <!-- <div class="teacherInfo">
              <div class="avatar">
                <img
                  src="https://p26-passport.byteacctimg.com/img/user-avatar/3533833ef18f84075f3ecbded27d7a32~140x140.awebp"
                  alt="logo"
                />
              </div>
              <div class="info">
                <p class="userName">
                  <span v-if="!isEditingName">{{ userName }}</span>
                  <el-input
                    v-else
                    v-model="userName"
                    size="small"
                    style="width: 125px"
                    @blur="toggleEdit('name')"
                  />
                  <el-button
                    class="edit"
                    type="text"
                    @click="toggleEdit('name')"
                  >
                    <i class="iconfont icon-bianji"></i>
                  </el-button>
                </p>
                <el-tag size="small">指导教师</el-tag>
              </div>
            </div> -->
            <!-- <div class="userLink">
              <el-descriptions column="1">
                <el-descriptions-item label="手机号">
                  <span v-if="!isEditingPhone">{{ phone }}</span>
                  <el-input
                    v-else
                    v-model="phone"
                    size="small"
                    style="width: 125px"
                    @blur="toggleEdit('phone')"
                  />
                  <el-button
                    class="edit"
                    type="text"
                    @click="toggleEdit('phone')"
                  >
                    <i class="iconfont icon-bianji"></i>
                  </el-button>
                </el-descriptions-item>
                <el-descriptions-item label="邮箱">
                  <span v-if="!isEditingEmail">{{ email }}</span>
                  <el-input
                    v-else
                    v-model="email"
                    size="small"
                    style="width: 125px"
                    @blur="toggleEdit('email')"
                  />
                  <el-button
                    class="edit"
                    type="text"
                    @click="toggleEdit('email')"
                  >
                    <i class="iconfont icon-bianji"></i>
                  </el-button>
                </el-descriptions-item>
              </el-descriptions>
            </div> -->
            <div class="footer">
              <el-button size="small" @click="dialogFormVisible = true"
                >修改密码</el-button
              >
              <b></b>
              <el-button size="small" @click="loginOut">退出登录</el-button>
            </div>
          </div>
        </el-popover>
      </el-header>
      <el-container class="mainEqual">
        <el-aside :class="!isCollapse ? 'aside' : 'asideCollapse'">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#fff"
          >
            <router-link to="/teacher/info">
              <el-menu-item index="1">
                <el-icon><Management /></el-icon>
                <template #title>信息管理</template>
              </el-menu-item>
            </router-link>

            <el-sub-menu index="2">
              <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>成员管理</span>
              </template>

              <router-link to="/teacher/member">
                <el-menu-item index="2-1"> 组织成员</el-menu-item>
              </router-link>
              <router-link to="/teacher/attend">
                <el-menu-item index="2-2">组织考勤</el-menu-item>
              </router-link>
              <router-link to="/teacher/quit">
                <el-menu-item index="2-3"> 退组成员</el-menu-item>
              </router-link>
            </el-sub-menu>
            <router-link to="/teacher/message">
              <el-menu-item index="3" disabled>
                <el-icon><Comment /></el-icon>
                <template #title>消息</template>
              </el-menu-item>
            </router-link>
            <el-menu-item index="4" disabled>
              <el-icon><setting /></el-icon>
              <template #title>更多</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <div class="mainTable">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="(item, index) in breadcrumbItems"
                :key="index"
                :to="item.path"
              >
                <template v-if="item.to">
                  <router-link :to="item.to">{{ item.name }}</router-link>
                </template>
                <template v-else>
                  {{ item.name }}
                </template>
              </el-breadcrumb-item>
            </el-breadcrumb>
            <el-empty v-if="!groupId" description="暂无小组信息">
              <p
                v-if="refuse"
                class="applyTag"
                style="color: rgb(245 63 63 / 47%)"
              >
                {{ refuse }}
              </p>
              <el-button type="primary" @click="visible = true" v-if="!apply"
                >申请小组</el-button
              >
              <p v-else-if="!refuse" class="applyTag">{{ apply }}</p>
            </el-empty>
            <RouterView v-else />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog v-model="dialogFormVisible" title="修改密码" width="400" draggable>
    <el-form :model="password">
      <el-form-item label="旧密码">
        <el-input
          v-model="password.oldPassword"
          autocomplete="off"
          show-password
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          v-model="password.newPassword"
          autocomplete="off"
          show-password
          placeholder="请输入新密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changePassword()"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="visible" title="申请小组" width="650" draggable>
    <el-form :model="form">
      <el-form-item label="小组名称">
        <el-input
          v-model="form.groupName"
          autocomplete="off"
          placeholder="小组名称"
        />
      </el-form-item>
      <el-form-item label="小组地址">
        <el-input
          v-model="form.groupAddress"
          autocomplete="off"
          placeholder="小组地址"
        />
      </el-form-item>
      <el-form-item label="小组介绍">
        <el-input
          resize="none"
          v-model="form.groupIntro"
          :autosize="{ minRows: 6, maxRows: 8 }"
          type="textarea"
          show-word-limit="true"
          maxlength="500"
          placeholder="请输入小组介绍"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitIt"> 提交申请 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { userStore } from "@/stores";
import { addGroup, getSchedule } from "@/api/teacher/group";
import { changeUserPassword } from "@/api/login";
import {
  Comment,
  Management,
  UserFilled,
  Expand,
  Fold,
  Setting,
} from "@element-plus/icons-vue";
import { ElMessage, ClickOutside as vClickOutside } from "element-plus";
interface groupInfo {
  logo?: File;
  logoHref?: string;
  groupName: string;
  groupAddress: string;
  groupIntro: string;
}

const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};
const form = reactive<groupInfo>({
  groupName: "",
  groupAddress: "",
  groupIntro: "",
});
const password = reactive({
  oldPassword: "",
  newPassword: "",
});
// 状态变量
const visible = ref(false);
const isCollapse = ref(false);
const isEditingName = ref(false);
const isEditingPhone = ref(false);
const isEditingEmail = ref(false);
const apply = ref("");
const refuse = ref("");
const dialogFormVisible = ref(false);
const userName = ref(userStore().userName);
const avater = ref(userStore().avatar);
// const phone = ref("");
// const email = ref("");

// 切换编辑模式
// function toggleEdit(type: string) {
//   switch (type) {
//     case "name":
//       isEditingName.value = !isEditingName.value;
//       break;
//     case "phone":
//       isEditingPhone.value = !isEditingPhone.value;
//       break;
//     case "email":
//       isEditingEmail.value = !isEditingEmail.value;
//       break;
//   }
// }
const submitIt = () => {
  addGroup(form).then((response) => {
    ElMessage({
      message: "申请成功，等待管理员审核中...",
      type: "warning",
      plain: true,
    });
  });
};
const changePassword = () => {
  const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (passwordTest.test(password.newPassword)) {
    changeUserPassword(password).then((response) => {
      if (!response.data) {
        ElMessage({
          message: "密码修改成功",
          type: "success",
          plain: true,
        });
        dialogFormVisible.value = false;
      }
    });
  } else {
    ElMessage({
      message: "密码格式不正确：含英文大小写至少八位字符",
      type: "error",
      plain: true,
    });
  }
};
const route = useRoute();

const breadcrumbItems = computed(() => {
  const breadcrumbItems = [];

  let path = "";

  breadcrumbItems.push({
    name: route.name,
    path: route.path,
    to: path === "/" ? null : { path },
  });

  return [{ name: "教师", path: "/teacher" }, ...breadcrumbItems];
});
// 获取当前教师是否有小组
// 查看小组申请进度
const schedule = () => {
  getSchedule().then((response) => {
    switch (response.data.status) {
      case 0:
        // 审核中...
        apply.value = "审核中...";
        break;
      case 2:
        // 拒绝
        refuse.value = `已被拒绝:${response.data.groupRefusedReason}`;
        break;

      default:
        break;
    }
  });
};
const groupId = userStore().groupData.groupId;
console.log(groupId);
onMounted(() => {
  schedule();
});
const loginOut = () => {
  userStore().Logout();
};
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4649268_taducwspn3.css");
.el-menu-item:hover {
  --el-menu-hover-bg-color: #dfe0e095;
}
.mainTable {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.aside {
  width: 220px;
  transition-delay: 300ms;
  transition-duration: 0.25s;
}
.asideCollapse {
  width: 65px;
}
.el-menu {
  height: 100%;
  transition-duration: 0.25s;
  transition: width 0.25s;
  overflow: hidden;
}
:deep(.mainEqual) {
  height: 90vh;
}
.layoutTeacher {
  width: 100vw;
  height: 100vh;
  background-color: #ebebeb;
  header {
    height: 10vh;
    display: flex;
    justify-content: space-between;
    background-color: #ececfa;
    padding: 0;
    --el-header-padding: 0;
    padding-right: 50px;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
    .userInfo {
      background-color: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 20px;

      .avater {
        width: 45px;
        height: 45px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .userName {
        font-size: 14px;
        color: #9c9c9c;
      }
    }
  }

  .logoAbout {
    display: flex;
    align-items: center;
    overflow: hidden;
    transition: width 0.25s, background-color 0.25s;
    border-radius: 10px;
    padding: 5px;
    cursor: pointer;
    .info {
      transition: opacity 0.25s ease, width 0.25s ease;
      white-space: nowrap;
      h1 {
        font-size: 15px;
      }
      span {
        font-size: 10px;
        border-radius: 4px;
        padding: 2px 5px;
        border: 1px solid #ccc;
        color: #9c9c9c;
      }
    }
  }

  .logoAbout:hover {
    background-color: #dedfe0a6;
  }
  .logo {
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    img {
      padding: 5px;
      width: 100%;
    }
  }
}
.el-main {
  background-color: #fff;
}
.active {
  width: 65px;
  gap: 0;
  .info {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }
}
.passive {
  width: 220px;
  gap: 15px;
  .info {
    opacity: 1;
    width: 145px;
    overflow: hidden;
  }
}
.change {
  cursor: pointer;
}
a {
  color: #12181d;
  background-color: transparent;
}
:deep(.el-popper.is-dark::before) {
  background: #fff;
}
.moreUserInfo {
  .teacherInfo {
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    .avatar {
      width: 55px;
      height: 55px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      .userName {
        margin-bottom: 5px;
      }
    }
  }
  .userLink {
    padding: 5px;
    padding-bottom: 0;
  }
  .footer {
    // border-top: 1px solid #ebebeb;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-between;
    .el-button {
      margin: 0;
      width: 100%;
      height: 30px;
      border: none /*  */;
    }
  }
  .edit {
    margin-left: 5px;
  }
}
:deep(.el-empty__bottom) {
  margin-top: 0;
}
.applyTag {
  color: #e2aa53;
  font-size: 14px;
}
</style>
