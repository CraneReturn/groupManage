<!-- 教师端小组信息 -->
<template>
  <div class="layoutTeacher">
    <el-container>
      <el-header class="header">
        <div class="left">
          <!-- 头部信息 -->
          <!-- 小组logo以及小组名称 -->
          <div class="logoAbout" :class="isCollapse ? 'active' : 'passive'">
            <div class="logo">
              <img src="@/assets/image/小组logo.png" alt="logo" />
            </div>
            <div class="info">
              <h1>未来软件工作室</h1>
              <span>指导教师</span>
            </div>
          </div>
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
      <el-container class="mainEqual">
        <el-aside :class="!isCollapse ? 'aside' : 'asideCollapse'">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#fff"
          >
            <el-menu-item index="1">
              <el-icon><Comment /></el-icon>
              <template #title>消息</template>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><UserFilled /></el-icon>
                <span>成员管理</span>
              </template>
              <el-menu-item index="2-1">组织成员</el-menu-item>
              <el-menu-item index="2-2">组织考勤</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3">
              <el-icon><Management /></el-icon>
              <template #title>信息管理</template>
            </el-menu-item>
            <el-menu-item index="4" disabled>
              <el-icon><setting /></el-icon>
              <template #title>更多</template>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main>
          <div class="mainTable">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"
                >homepage</el-breadcrumb-item
              >
              <el-breadcrumb-item>
                <a href="/">promotion management</a>
              </el-breadcrumb-item>
              <el-breadcrumb-item>promotion list</el-breadcrumb-item>
              <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
            <RouterView />
          </div>
        </el-main>
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
  Expand,
  Fold,
  Setting,
} from "@element-plus/icons-vue";
const isCollapse = ref(false);
</script>
<style lang="scss" scoped>
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
    padding-right: 20px;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
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
</style>
