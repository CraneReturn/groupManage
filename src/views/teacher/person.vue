<!-- 组织成员信息 -->
<template>
  <div class="memberInfo">
    <!-- 成员基本信息 -->
    <div class="person">
      <div class="avater">
        <img src="@/assets/image/小组logo.png" alt="成员头像" />
      </div>
      <div class="info">
        <h1>计科223李向阳</h1>
        <div class="label"><span>三月负责人</span><span>2022级</span></div>
      </div>
    </div>
    <div class="userMain">
      <div class="personInfo">
        <el-descriptions title="成员个人档案" column="1">
          <el-descriptions-item label="成员姓名">李向阳</el-descriptions-item>
          <el-descriptions-item label="班级"
            ><el-tag size="small">计科223</el-tag></el-descriptions-item
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
          <div class="status">
          <div class="currentStatus">
            <p>状态</p>
            
          </div>
          </div>
          <div class="monthStatus"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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
  .status {
    border: 1px solid #ebebeb;
    border-radius: 4px;
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
  height: 65%;
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
</style>
