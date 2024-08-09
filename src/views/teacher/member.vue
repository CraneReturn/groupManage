<template>
  <!-- 组织成员管理 -->
  <div class="memberManage">
    <h3>组织成员</h3>
    <div class="statistic">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="statistic-card">
            <div class="icon">
              <i class="iconfont icon-zongshu"></i>
            </div>
            <div class="main">
              <el-statistic :value="98500"></el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>小组成员总数</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="statistic-card">
            <div class="icon">
              <i class="iconfont icon-dangqian"></i>
            </div>
            <div class="main">
              <el-statistic :value="98500"></el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>目前在校人数</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="statistic-card">
            <div class="icon">
              <i class="iconfont icon-qingjia"></i>
            </div>
            <div class="main">
              <el-statistic :value="98500"></el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>请假成员人数</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="statistic-card">
            <div class="icon">
              <i class="iconfont icon-taotaishuliang"></i>
            </div>
            <div class="main">
              <el-statistic :value="98500"></el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>淘汰成员人数</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="moreInfo">
      <div class="echarts">
        <!-- echarts展示当前人数分布 -->
      </div>
      <!-- 小组当前负责人信息 -->
      <div class="principalInfo"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useTransition } from "@vueuse/core";
const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1500,
});
source.value = 172000;
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4649268_8fqkq5k31so.css");
.memberManage{
  background-color: antiquewhite;
}
.statistic {
  max-width: 85%;
  margin-top: 20px;
  background-color: var(--el-color-primary-light-9);
  border-radius: 5px;
  .el-col {
    text-align: center;
  }
}

.el-statistic {
  --el-statistic-content-font-size: 20px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  .iconfont {
    font-size: 25px;
  }
}

.statistic-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}
</style>
