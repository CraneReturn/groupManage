<!-- 教师端小组信息 -->
<template>
  <div class="layoutTeacher">
    <el-container class="main">
      <el-header class="header">
        <div class="left">
          <h1>小组管理系统</h1>
          <div class="change" @click="isCollapse = !isCollapse">
            <el-icon size="25px" v-if="!isCollapse"><Expand /></el-icon>
            <el-icon size="25px" v-else><Fold /></el-icon>
          </div>
        </div>

        <div class="right">
          <div class="userInfo">
            <p class="userName">钟离</p>
            <div class="avater">
              <img
                src="https://upload-bbs.miyoushe.com/upload/2020/12/09/93665875/d1a3de452a1ec0fb6863d675f8b6a7b4_356406130344679371.gif"
                alt="头像"
              />
            </div>
          </div>
        </div>
      </el-header>
      <Avator></Avator>
      <el-container class="main">
        <el-aside width="220px"
          ><el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#fff"
          >
            <!-- 头部信息 -->
            <!-- 小组logo以及小组名称 -->
            <div class="logoAbout">
              <div class="logo">
                <img src="@/assets/image/school.png" alt="logo" />
              </div>
              <div class="info">
                <span>管理员</span>
              </div>
            </div>
            <router-link to="/superAdmin/analysis">
            <el-menu-item index="1">
              <el-icon><Comment /></el-icon>
              <template #title>控制台</template>
            </el-menu-item>
          </router-link>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>小组管理</span>
              </template>
              <router-link to="/superAdmin/allGroups">
              <el-menu-item index="2-1">
                现有小组
              </el-menu-item>
            </router-link>
              <router-link to="/superAdmin/groupReview">
              <el-menu-item index="2-2">
                待审核小组
              </el-menu-item>
            </router-link>
            <router-link to="/superAdmin/outGroup">
              <el-menu-item index="2-3">
                审核未通过小组
              </el-menu-item>
            </router-link>
            </el-sub-menu>
            <router-link to="/superAdmin/allteachers">
            <el-menu-item index="3">
              <el-icon><Management /></el-icon>  
              <template #title>
                教师管理
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/superAdmin/repairReview">
            <el-menu-item index="4">
              <el-icon><Management /></el-icon>  
              <template #title>
                报修审核
              </template>
            </el-menu-item>
          </router-link>
            <el-menu-item index="5" disabled>
              <el-icon><setting /></el-icon>
              <template #title>更多</template>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import {
  Comment,
  Management,
  UserFilled,
  Setting,
} from "@element-plus/icons-vue";
import Avator from './components/Avator.vue'
const isCollapse = ref(false);
</script>
<style lang="scss" scoped>
.el-menu-item:hover {
  --el-menu-hover-bg-color: #dfe0e095;
}
.el-menu {
  height: 100%;
}
:deep(.el-container) {
  height: 100%;
}
.layoutTeacher {
  width: 100vw;
  height: 100vh;
  background-color: #ebebeb;
  header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    background-color: #ececfa;
    padding: 0;
    --el-header-padding: 0;
    padding: 0 20px;
    align-items: center;
    .userInfo {
      display: flex;
      align-items: center;
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
      .userName {
        font-size: 14px;
      }
    }
  }
  .logoAbout {
    display: flex;
    align-items: center;
    gap: 15px;
    transition-duration: 0.25s;
    border-radius: 10px;
    padding: 10px;
    padding-right: 20px;
    cursor: pointer;
  }
  .logoAbout:hover {
    background-color: #dedfe0;
  }
  .logo {
    width: 120px;
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
.el-main {
  background-color: #fff;
}
</style>
