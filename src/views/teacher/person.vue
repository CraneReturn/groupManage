<!-- 组织成员信息 -->
<template>
  <div class="memberInfo">
    <!-- 成员基本信息 -->
     <div class="titleInfo">
      <div class="person">
        <div class="avater">
          <img src="@/assets/image/小组logo.png" alt="成员头像" />
        </div>
        <div class="info">
          <h1>计科223李向阳</h1>
          <div class="label"><span>三月负责人</span><span>2022级</span></div>
        </div>
      </div>
      <div class="oprateUser">
        <el-button>转让负责人/更改为负责人</el-button>
      </div>
     </div>
    
    <div class="userMain">
      <div class="personInfo">
        <el-descriptions title="成员个人档案" column="1">
          <el-descriptions-item label="成员姓名">李向阳</el-descriptions-item>
          <el-descriptions-item label="班级"
            ><el-tag size="small">计科223</el-tag></el-descriptions-item
          >
          <el-descriptions-item label="学院"
            ><span>计算机科学与技术学院</span></el-descriptions-item
          >
          <el-descriptions-item label="职位">三月负责人</el-descriptions-item>
          <el-descriptions-item label="性别">
            <el-tag size="small">男</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学号">
            <el-tag size="small">20221452223</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="手机号">
            <el-tag size="small">1555555555555</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <img
          src="@/assets/image/小组logo.png"
          alt="logo"
          class="backgroundLogo"
        />
      </div>
      <div class="attendance">
        <h3>假勤</h3>
        <div class="attend">
          <div class="weekStatus">
            <!-- 一周的请假 -->
            <div class="userAttend">
              <div class="date week">
                <el-tag type="info" v-for="index in 7">周日</el-tag>
              </div>
              <div class="date">
                <el-tag type="success" size="small" v-for="index in 7"
                  >在勤</el-tag
                >
              </div>
            </div>
          </div>

          <div class="attendInfo">
            <!-- 请假时间 -->
            <!-- 类型 -->
            <!-- 原因 -->
            <!-- 审批人 -->
            <!-- 审批状态 -->
            <h3>请假信息</h3>
            <el-scrollbar max-height="180px" noresize="true">
              <el-descriptions column="3">
                <el-descriptions-item label="请假类型">
                  <el-tag size="small">病假</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="审批人">
                  <span size="small">计科223李向阳</span>
                </el-descriptions-item>
                <el-descriptions-item label="审批状态">
                  <el-tag size="small">通过</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions column="1">
                <el-descriptions-item label="请假时间">
                  <el-tag size="small">2024-10-25 10：00</el-tag>-
                  <el-tag size="small"
                    >2024-10-25 10：00
                  </el-tag></el-descriptions-item
                >
                <el-descriptions-item label="原因">
                  <span class="reason">111111111111111111111</span
                ></el-descriptions-item>
              </el-descriptions>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// 获取当前日期
const current = new Date();
const today = current.getDay();
console.log(today);
</script>
<style lang="scss">
.memberInfo {
  width: 100%;
  height: 100%;
}
.personInfo {
  background-color: #fff;
  position: relative;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 30%;
  overflow: hidden;
}
.attendance {
  background-color: #fff;
  margin: 10px;
  margin-left: 0;
  padding: 10px;
  border-radius: 5px;
  width: 70%;
  overflow: hidden;
  h3 {
    color: var(--el-text-color-primary);
    font-size: 16px;
    font-weight: bold;
    margin: 5px;
  }
}
.person {
  display: flex;
  align-items: end;
  overflow: hidden;
  transition: width 0.25s, background-color 0.25s;
  border-radius: 10px;
  padding: 5px;
  gap: 15px;
  cursor: pointer;
  .info {
    h1 {
      font-size: 15px;
    }
    .label {
      display: flex;
      margin: 5px 0;
      gap: 4px;
      span {
        font-size: 8px;
        border-radius: 4px;
        padding: 2px 3px;
        border: 1px solid #ccc;
        color: #9c9c9c;
      }
    }
  }
  .avater {
    width: 75px;
    height: 75px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ebebeb;
    box-shadow: 1px 1px 12px #ebebeb;
    display: flex;
    align-items: center;
    img {
      padding: 5px;
      width: 100%;
    }
  }
}
.userMain {
  height: 75%;
  margin-top: 10px;
  background-color: #ebebeb;
  display: flex;
  .backgroundLogo {
    position: absolute;
    width: 200px;
    opacity: 0.5;
    transform: rotateZ(325deg);
    z-index: 0;
    bottom: 15px;
    right: -50px;
  }
}
.weekStatus {
  max-width: 350px;
  display: flex;
  padding: 5px;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  .userAttend {
    display: flex;
    flex-direction: column;
  }
  .week {
    border-bottom: 1px solid #ebebeb;
  }
  .date {
    display: flex;
    gap: 5px;
    padding: 5px;
    text-align: center;
    justify-content: space-between;
  }
}
.attend {
  .el-scrollbar {
    border: 1px solid #ebebeb;
    border-radius: 4px;
    padding: 10px;
  }
  .reason {
    overflow-wrap: break-word;
    word-break: break-all;
  }
}
</style>
