<template>
  <!-- 组织成员管理 -->
  <div class="memberManage">
    <div class="title">
      <h3>组织成员</h3>
      <div class="addMember">
        <el-button>添加成员</el-button>
        <el-button>导入成员列表</el-button>
      </div>
    </div>

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
            <div class="mainIt">
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
      <!-- 当前小组信息 -->
      <div class="principalInfo" ref="current"></div>
      <div class="echarts" ref="chartContainer">
        <!-- echarts展示当前人数分布 -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useTransition } from "@vueuse/core";
import * as echarts from "echarts";
const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1500,
});
source.value = 172000;

// 引用 chartContainer
const chartContainer = ref(null);
const current = ref(null);
let chartSum: echarts.ECharts | null = null;
let chart: echarts.ECharts | null = null;
// 初始化图表
const initChart = () => {
  if (chartContainer.value) {
    chartSum = echarts.init(chartContainer.value);
  }
  if (current.value) {
    chart = echarts.init(current.value);
  }
};

// 更新图表
const updateChart = () => {
  const option = {
    title: {
      text: "小组成员整体分布",
    },
    tooltip: {},
    legend: {
      data: ["人数"],
    },
    xAxis: {
      data: ["2022", "2023", "2024", "2025", "2026", "2026"],
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  const currentOption = {
    title: {
      text: "目前在校成员",
      subtext: "数据展示",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "年级分布",
        type: "pie",
        radius: "50%",
        data: [
          { value: 335, name: "2022级" },
          { value: 310, name: "2023级" },
          { value: 234, name: "2024级" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  if (chartSum && chart) {
    chartSum.setOption(option);
    chart.setOption(currentOption);
  }
};

// 窗口调整处理函数
const handleResize = () => {
  if (chartSum && chart) {
    chartSum.resize();
    chart.resize();
  }
};

// 在组件挂载后初始化图表，并设置窗口调整监听器
onMounted(() => {
  initChart();
  updateChart();
  window.addEventListener("resize", handleResize);
});

// 在组件卸载前移除窗口调整监听器
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style lang="scss" scoped>
@import url("http://at.alicdn.com/t/c/font_4649268_8fqkq5k31so.css");
.statistic {
  max-width: 85%;
  margin-top: 20px;
  background-color: var(--el-color-primary-light-9);
  border-radius: 5px;
  .el-col {
    text-align: center;
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
}
.memberManage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.moreInfo {
  height: 80%;
  background-color: #ebebeb;
  border-radius: 3px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  .echarts {
    width: 60%;
    border-radius: 4px;
    background-color: #fff;
    margin: 10px;
    margin-left: 0;
    padding: 10px;
  }
  .principalInfo {
    width: 40%;
    border-radius: 4px;
    background-color: #fff;
    margin: 10px;
    margin-right: 0;
    padding: 10px;
  }
}
.title {
  display: flex;
  justify-content: space-between;
}
</style>
