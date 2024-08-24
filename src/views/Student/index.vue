<template>
  <div class="student">
    <div class="top-nav">
      <router-link to="group">
        <div class="groupAbout">
          <div class="logo">
            <img src="@/assets/image/小组logo.png" alt="logo" />
          </div>
          <div class="info">
            <h1>{{groupInfo.groupName}}</h1>
            <span>学生</span>
          </div>
        </div>
      </router-link>
      <el-dropdown placement="bottom-start">
        <div class="user-info">
          <p class="user-name">{{userInfo.nickname}}</p>
          <div class="avater">
            <img
              :src="userInfo.avatar"
              alt="头像"
            />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="userCenter">
              <el-dropdown-item> 个人中心 </el-dropdown-item>
            </router-link>
            <router-link to="leave">
              <el-dropdown-item> 请假 </el-dropdown-item>
            </router-link>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="student-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted} from "vue";
import { getOwnGroupInfo,getOwnInfo } from '@/api/student.ts';

const groupInfo = ref({
  groupName:"",
  groupIntro:"",
  groupLogo:""
});

const userInfo = ref({
  nickname:"",
  avatar:""
})

const fetchGroupInfo = async () => {
  try {
    const response = await getOwnGroupInfo();  // 调用 API
    groupInfo.value = response.data;           // 将数据存储到 groupInfo 中
  } catch (error) {
    console.error("获取组信息失败：", error);   // 错误处理
  }
};

const fetchUserInfo = async () => {
  try {
    const response = await getOwnInfo();
    userInfo.value = response.data;           
  } catch (error) {
    console.error("获取组信息失败：", error); 
  }
};

// 在组件挂载时调用 API
onMounted(() => {
  fetchGroupInfo();
  fetchUserInfo();
});
</script>

<style lang="scss" scoped>
.student {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: #f4f6f9;
  a{
    color: var(--color-text);
  }
  .top-nav {
    background-color: #ececfa;
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    position: fixed;
    padding: 0 5px;
    .groupAbout {
      display: flex;
      align-items: center;
      overflow: hidden;
      border-radius: 10px;
      padding: 5px;
      cursor: pointer;
      .info {
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

    .groupAbout:hover {
      background-color: #dedfe0a6;
    }
    .logo {
      width: 50px;
      height: 50px;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      margin-right: 10px;
      img {
        padding: 5px;
        width: 100%;
      }
    }
  }
  .user-info {
    display: flex;
    align-items: center;
    outline: none;
    gap: 10px;
    .avater {
      width: 45px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name {
      font-size: 14px;
    }
  }
}
</style>
