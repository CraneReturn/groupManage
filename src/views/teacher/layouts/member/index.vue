<template>
  <!-- 组织成员管理 -->
  <div class="memberManage">
    <div class="statistic">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="statistic-card">
            <div class="icon">
              <i class="iconfont icon-zongshu"></i>
            </div>
            <div class="main">
              <el-statistic :value="total"></el-statistic>
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
              <el-statistic :value="currentNumber"></el-statistic>
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
      <div class="principalInfo" ref="current"></div>
      <div class="echarts" ref="chartContainer">
      </div>
    </div>
    <div class="title">
      <div class="addMember">
        <el-button @click="userAddFlag = true">添加成员</el-button>
        <el-button class="imporUserButton">
          导入表格添加学生
          <input type="file" @change="importDownLoaduser" />
        </el-button>
        <el-button @click="lookDownloadUsetype">查看导入格式</el-button>
      </div>
    </div>
    <List />
    <AddNewMember />
  </div>
</template>
<script setup lang="ts">
import List from "./gradeList.vue";
import { getSample, uploadUserfile } from "@/api/teacher/userManger";
import {
  ref,
  onMounted,
  onBeforeUnmount,
  onBeforeMount,
  computed,
  watch,
  reactive,
} from "vue";
import { useTransition } from "@vueuse/core";
import * as echarts from "echarts";
import AddNewMember from "./addMember.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import userTeacherMange from "@/views/teacher/api/userMange";
const {
  userPage,
  getNewGrade,
  getAllUserMethods,
  alluserpage,
  userAddFlag,
  wholeStudentDataX,
  wholeStudentY,
} = userTeacherMange;
const total = ref(wholeStudentY.value[wholeStudentY.value.length - 1]);
let internalNumber = [...wholeStudentY.value]; // 创建原数组的副本
internalNumber = internalNumber
  .splice(0, 3)
  .reduce((a: number, b: number) => a + b, 0);
const currentNumber = ref(internalNumber);
const source = ref(0);
console.log(wholeStudentY.value);

interface DataObject {
  name: string;
  value: string | number;
}
source.value = 172000;
const input = ref();
const value = ref("");
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
    disabled: true,
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
// 引用 chartContainer
const chartContainer = ref(null);
const current = ref(null);
let chartSum: echarts.ECharts | null = null;
let chart: echarts.ECharts | null = null;

let currentData = ref<DataObject[]>([]);

const data: DataObject[] = wholeStudentDataX.value
  .slice(0, 3)
  .map((year: any, index: string | number) => ({
    name: `${year}级`,
    value: wholeStudentY.value[index] || "", // Default to empty string if no value
  }));
currentData.value = data;
console.log(wholeStudentDataX.value, data, wholeStudentY.value);

// 初始化图表
const initChart = () => {
  if (chartContainer.value) {
    chartSum = echarts.init(chartContainer.value);
  }
  if (current.value) {
    chart = echarts.init(current.value);
  }
};
const lookDownloadUsetype = () => {
  ElMessageBox.confirm("确定下载导入小组成员模板?", {
    confirmButtonText: "下载",
    cancelButtonText: "取消",
    type: "info",
    draggable: true,
  })
    .then(async () => {
      const sampleData = await getSample();
      const url = window.URL.createObjectURL(sampleData);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "小组成员导入下载模板.xlsx"; // 文件名
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // 释放URL对象
      window.URL.revokeObjectURL(url);
    })
    .catch(() => {});
};
//导入
const importDownLoaduser = async (event: { target: { files: any[] } }) => {
  const file = event.target.files[0];
  if (!file) {
    ElMessage({
      message: "请您先上传文件",
      type: "error",
    });
    return;
  }
  const fileName = file.name;
  const isTableFile =
    fileName.toLowerCase().endsWith(".xlsx") ||
    fileName.toLowerCase().endsWith(".xls");

  if (isTableFile) {
    const fileData = await uploadUserfile(file);
    if (fileData.code == 20000) {
      ElMessage({
        message: "上传文件导入成功",
        type: "success",
      });
      await getAllUserMethods();
    } else {
      ElMessage({
        message: "上传文件导入失败",
        type: "error",
      });
    }
  } else {
    ElMessage({
      message: "请上传表格文件",
      type: "error",
    });
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
      data: wholeStudentDataX.value,
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: wholeStudentY.value,
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
        data: currentData.value,
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
watch(
  wholeStudentDataX,
  (newValue, oldValue) => {
    initChart();
    updateChart();
  },
  {
    deep: true,
  }
);
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
onBeforeMount(async () => {
  await getNewGrade();

  console.log(wholeStudentDataX, "3333");
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

  .echarts {
    width: 55%;
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
  height: 100px;
  padding: 20px 10px;
  align-items: center;

  .searchMember {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}

.imporUserButton {
  position: relative;

  input {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 6;
    width: 100%;
    opacity: 0;
    height: 100%;
  }
}
</style>
