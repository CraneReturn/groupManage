<template>
  <div class="infoManage">
    <div class="title">
      <h1>信息管理</h1>
    </div>

    <div class="main">
      <!-- 小组logo以及小组名称 -->
      <!-- 小组指导老师 -->
      <div class="logoAbout">
        <div class="logo">
          <img src="@/assets/image/小组logo.png" alt="logo" />
        </div>
        <div class="info">
          <h1>未来软件工作室</h1>
          <span>指导教师</span>
        </div>
      </div>

      <div class="groupInfo">
        <el-divider content-position="left"
          ><p class="divider">小组介绍</p></el-divider
        >
        <p class="info">
            未来软件工作室由高国红，李士勇两位老师于2011年6月创办，以提高学生软件开发技术为核心培养目标，秉承追求卓越，采取理论基础、实践能力与综合素质并重的人才培养理念，旨在全方位提高学生的就业质量和创新创业能力。
            工作室成立以来，逐步形成了Web设计开发、大前端设计开发两大学习方向以及Java
          Web、数据处理、移动开发、UI设计等若干细分方向，凝练了成熟的学习路线和培养方案。
            一路走来我们成绩斐然，先后获得国家级创新创业项目5项，河南省创业扶持资金项目2项，校级创新创业项目8项，在各类学科竞赛中获国家级奖项12项，省级奖项91项，设计开发各类软件产品40余个，培养毕业生40余人，均就职于京东、联想、新浪等知名企业，平均就业年薪达20万元以上。
            未来，做一个有影响力的团队，未来人，做一个有影响力的人。未来有你，未来可期。
        </p>
      </div>
      <!-- 小组介绍 -->
      <div class="groupDevelop">
        <el-divider content-position="left"
          ><p class="divider">小组发展</p></el-divider
        >
        <div class="develop" style="height: 300px; max-width: 600px">
          <el-steps direction="vertical" :active="number">
            <el-step :title="title" :description="description" />
            <el-step :title="title" :description="description" />
            <el-step title="今天" description="我们一直在前进..." />
          </el-steps>
        </div>
      </div>
      <!-- 小组经历 -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
const title = ref("发展");
const description = ref(
  "张三111111111111111111111111111列列列11111111111111111111111111111111111111111111111111111111111111111111111111127给哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈斤斤计较急急急急急急急急急急急急急急急急急急急急急急急急急急急急急急1111111111"
);
const number = ref(3);
interface Develop {
  title: string;
  description: string;
}
// 使用数组存放小组发展中的标题和描述
const developArray = reactive<Develop[]>([
  {
    title: "开始",
    description: "111111",
  },
]);
</script>
<style lang="scss" scoped>
.divider {
  font-size: 15px;
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
      border: 1px solid #ccc;
      color: #9c9c9c;
    }
  }
}
.infoManage {
  display: flex;
  flex-direction: column;
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
    font-size: 13px;
    padding: 0 20px;
  }
  .develop {
    padding: 10px 20px;
  }
}
</style>
