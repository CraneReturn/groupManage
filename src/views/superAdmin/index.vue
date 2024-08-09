<template>
    <el-container class="admin-home">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-active="activeMenu" class="menu" router>
            <el-menu-item index="/superAdmin">首页</el-menu-item>
            <el-sub-menu index="management" v-if="showManagement">
              <template #title>管理类</template>
              <el-menu-item index="/superAdmin/allGroups">小组管理</el-menu-item>
              <el-menu-item index="/superAdmin/allTeachers">教师管理</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="system" v-if="showSystem">
              <template #title>审核类</template>
              <el-menu-item index="/superAdmin/groupReview">小组申请审核</el-menu-item>
              <el-menu-item index="/superAdmin/repairReview">小组报修审核</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
  
      <el-container>
        <el-header class="top">
          <div class="logo">
            <!-- 放置图标 -->
            <el-icon><Fold /></el-icon>
          </div>
          <div class="user-info" @click="toggleSubMenu">
            {{ userName }}
            <el-dropdown v-model="subMenuVisible">
              <el-icon><CaretBottom /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
  
          </div>
        </el-header>
  
        <el-main class="content">
          <!-- 放置表格 -->
          <router-view/>
        </el-main>
  
        <el-footer class="footer">
          版权信息
        </el-footer>
      </el-container>
    </el-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeMenu: '/superAdmin',
        showManagement: true,
        showSystem: true,
        userName: 'John Doe',
        subMenuVisible: false,
      };
    },
    methods: {
      toggleSubMenu() {
        this.subMenuVisible = !this.subMenuVisible;
      },
    },
  };
  </script>
  
  <style>
  .admin-home {
    height: 100vh;
  }
  
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    /* 样式 */
  }
  
  .user-info {
    cursor: pointer;
  }
  
  .content {
    /* 样式 */
  }
  
  .footer {
    /* 样式 */
  }
  </style>
  
  