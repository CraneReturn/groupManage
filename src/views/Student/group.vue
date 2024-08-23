<template>
  <div class="infoMax">
    <div class="infoManage">
      <div class="title">
        <h1>信息管理</h1>
      </div>

      <div class="main">
        <!-- 小组logo以及小组名称 -->
        <!-- 小组指导老师 -->
        <div class="oprateInfo">
          <div class="logoAbout">
            <div class="logo">
              <img :src="groupInfo.logo" alt="logo" v-if="!updateStatus" />
            </div>
            <div class="info">
              <h1>{{groupInfo.groupName}}</h1>
              <span class="successColor">学生</span>
            </div>
          </div>
          <div class="oprate">
            <el-button type="danger" plain>退出小组</el-button>
          </div>
        </div>

        <div class="groupInfo">
          <el-divider content-position="left"
            ><p class="divider">小组介绍</p></el-divider
          >
          <p class="info" v-if="!updateStatus">{{ groupInfo.groupIntro }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted} from "vue";
import { getOwnGroupInfo } from '@/api/student.ts';

const groupInfo = ref({
  groupName:"",
  groupIntro:"",
});
const info = ref(groupInfo.groupIntro);
const name = ref(groupInfo.groupName);

// 定义一个获取组信息的函数
const fetchGroupInfo = async () => {
  try {
    const response = await getOwnGroupInfo();  // 调用 API
    groupInfo.value = response.data;           // 将数据存储到 groupInfo 中
  } catch (error) {
    console.error("获取组信息失败：", error);   // 错误处理
  }
};

// 在组件挂载时调用 API
onMounted(() => {
  fetchGroupInfo();
});

</script>
<style lang="scss" scoped>
.infoMax{
    width: 100%;
    background-color: #ffffff;
    height: 100vh;
}
.divider {
  font-size: 16px;
}
.logoAbout {
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: width 0.25s, background-color 0.25s;
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
  gap: 15px;
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    img {
      padding: 5px;
      width: 100%;
    }
  }
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
    }
  }
}
.infoManage {
  display: flex;
  flex-direction: column;
  width: 1000px;
  padding-top: 30px;
  background-color: #fff;
  margin: auto;
  position: relative;
  .title {
    position: sticky;
    top: -20px;
    background-color: #fff;
    width: 100%;
    margin-top: -20px;
    padding: 20px 0;
  }
  .groupInfo .info {
    font-size: 14px;
    padding: 0 20px;
  }
}
.oprateInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
}
.successColor {
  color: var(--el-color-success-light-3);
  border: 1px solid var(--el-color-success-light-3);
}
</style>
