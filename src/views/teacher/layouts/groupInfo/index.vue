<template>
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
            <div class="upload" v-else>
              <input type="file" id="uploadLogo" title="" />
              <img
                src="https://portrait.gitee.com/uploads/avatars/namespace/564/1693077_wlgzs_1578990928.png!avatar100"
                alt=""
              />
              <div class="shadow">
                <el-icon><Upload /></el-icon>
              </div>
            </div>
          </div>
          <div class="info">
            <h1 v-if="!updateStatus">未来软件工作室</h1>
            <div v-else>
              <el-input
                v-model="name"
                style="width: 240px"
                maxlength="15"
                placeholder="Please input"
                show-word-limit
                type="text"
              />
            </div>
            <span class="successColor">审核通过</span>
            <!-- <span :class="groupInfo.status ? 'checking' : 'successColor'">{{
              groupInfo.status ? "审核中..." : "审核通过"
            }}</span> -->
          </div>
        </div>
        <!-- <div class="oprate">
          <el-button @click="submit" v-if="updateStatus"> 提交 </el-button>
          <el-button @click="update">{{
            updateStatus ? "取消更改" : "更改信息"
          }}</el-button>
        </div> -->
      </div>

      <div class="groupInfo">
        <el-divider content-position="left"
          ><p class="divider">小组介绍</p></el-divider
        >
        <p class="info" v-if="!updateStatus">{{ groupInfo.intro }}</p>
        <div class="changeInfo" v-else>
          <el-input
            v-model="info"
            maxlength="500"
            placeholder="Please input"
            show-word-limit
            type="textarea"
            :autosize="{ minRows: 10 }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
const updateStatus = ref(false);
import { Upload } from "@element-plus/icons-vue";
const groupInfo = {
  name: "未来软件工作室",
  intro: ` 未来软件工作室由高国红，李士勇两位老师于2011年6月创办，以提高学生软件开发技术为核心培养目标，秉承追求卓越，采取理论基础、实践能力与综合素质并重的人才培养理念，旨在全方位提高学生的就业质量和创新创业能力。
          工作室成立以来，逐步形成了Web设计开发、大前端设计开发两大学习方向以及Java
          Web、数据处理、移动开发、UI设计等若干细分方向，凝练了成熟的学习路线和培养方案。
          一路走来我们成绩斐然，先后获得国家级创新创业项目5项，河南省创业扶持资金项目2项，校级创新创业项目8项，在各类学科竞赛中获国家级奖项12项，省级奖项91项，设计开发各类软件产品40余个，培养毕业生40余人，均就职于京东、联想、新浪等知名企业，平均就业年薪达20万元以上。
          未来，做一个有影响力的团队，未来人，做一个有影响力的人。未来有你，未来可期。`,
  address: "河南科技学院",
  status: 1,
  createTime: "2024-04-01",
  logo: "https://portrait.gitee.com/uploads/avatars/namespace/564/1693077_wlgzs_1578990928.png!avatar100",
};
const update = () => {
  updateStatus.value = !updateStatus.value;
};
const info = ref(groupInfo.intro);
const name = ref(groupInfo.name);
</script>
<style lang="scss" scoped>
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
  .develop {
    padding: 10px 20px;
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
.checking {
  color: #f3d19e;
  border: 1px solid #f3d19e;
}
.upload {
  position: relative;
  width: 50px;
  height: 50px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  #uploadLogo {
    width: 100%;
    height: 100%;
    cursor: pointer;
    position: relative;
    opacity: 0;
    z-index: 100;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
  }
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: rgba($color: #000, $alpha: 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    .el-icon {
      width: 30px;
      color: #fff;
    }
  }
}
</style>
