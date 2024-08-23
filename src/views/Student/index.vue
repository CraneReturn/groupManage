<template>
  <div class="student">
    <div class="top-nav">
      <router-link to="group">
        <div class="groupAbout">
          <div class="logo">
            <img src="@/assets/image/小组logo.png" alt="logo" />
          </div>
          <div class="info">
            <h1>未来软件工作室</h1>
            <span>学生</span>
          </div>
        </div>
      </router-link>
      <el-dropdown placement="bottom-start">
        <div class="user-info">
          <p class="user-name">蛋黄派</p>
          <div class="avater">
            <img
              src="https://upload-bbs.miyoushe.com/upload/2020/12/09/93665875/d1a3de452a1ec0fb6863d675f8b6a7b4_356406130344679371.gif"
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

<script setup lang="ts"></script>

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
