<template>
  <div class="leave">
    <div class="leave-apply">
      <div class="reason item">
        <span>请假理由:</span>
        <el-input
          v-model="reason"
          style="width: 240px"
          placeholder="请假理由"
          clearable
        />
      </div>
      <div class="leave-type item">
        <span>请假类型:</span>
        <el-select
          v-model="leaveType"
          clearable
          placeholder="请假类型"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="apply-time item">
        <span>请假时间:</span>
        <el-date-picker
          v-model="starTime"
          type="datetime"
          placeholder="开始时间"
        />
        <span>-</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="结束时间"
        />
      </div>
      <div class="leave-send">
        <el-button type="primary" @click="applyLeave">提交</el-button>
        <el-button @click="cleanLeave">取消</el-button>
      </div>
    </div>
    <div class="leave-record">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="reason" label="请假理由" width="180" />
        <el-table-column prop="leaveType" label="请假类型" width="100" />
        <el-table-column prop="startDate" label="开始时间" />
        <el-table-column prop="endDate" label="结束时间" />
        <el-table-column prop="status" :formatter="formatState" label="状态" />
        <el-table-column prop="approverNickname" label="审批人" />
      </el-table>
      <div class="leave-page">
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 50]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLeaveRecords, leave } from "@/api/student.ts";
import { ElMessage } from "element-plus";

const reason = ref("");
const leaveType = ref("");
const starTime = ref("");
const endTime = ref("");

const pageNum = ref<number>(1);
const pageSize = ref<number>(5);
const total = ref<number>(0);

const options = [
  {
    value: "Option1",
    label: "事假",
  },
  {
    value: "Option2",
    label: "病假",
  },
  {
    value: "Option3",
    label: "其它",
  },
];
const tableData = ref([]);

//请假
const applyLeave = () => {
  console.log(starTime.value, endTime.value);
  if (isnull(reason.value)) {
    ElMessage.warning("请填写请假原因");
  } else if (isnull(leaveType.value)) {
    ElMessage.warning("请填写请假类型");
  } else if (starTime.value == "") {
    ElMessage.warning("请选择请假开始时间");
  } else if (endTime.value == "") {
    ElMessage.warning("请选择请假结束时间");
  } else {
    leave(
      reason.value,
      leaveType.value,
      formatDate(starTime.value),
      formatDate(endTime.value)
    )
      .then((res) => {
        if (res.success) {
          cleanLeave();
          getLeaves();
          ElMessage.success("请假申请已提交");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log();
      });
  }
};

function cleanLeave() {
  reason.value = "";
  leaveType.value = "";
  starTime.value = "";
  endTime.value = "";
}

//获取请假记录
const getLeaves = () => {
  getLeaveRecords(pageNum.value, pageSize.value)
    .then((res) => {
      let data = res.data;
      total.value = data.total;
      tableData.value = data.records;
    })
    .catch((err) => {
      console.log(err);
    });
};

function handleSizeChange() {
  getLeaves();
}

function handleCurrentChange() {
  getLeaves();
}

//格式化日期
const formatDate = (time: string) => {
  const date = new Date(time);
  // 获取年、月、日、小时、分钟、秒
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // 拼接成标准格式 YYYY-MM-DD HH:MM:SS
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(formattedDate);
  return formattedDate;
};

//判断请假状态
function formatState(row: any, columna: any, cellValue: any) {
  if (cellValue == 0) {
    return "待审批";
  } else if (cellValue == 1) {
    return "已通过";
  } else if (cellValue == 2) {
    return "未通过";
  }
}

//空值判断
function isnull(val) {
  const str = val.replace(/(^\s*)|(\s*$)/g, "");
  if (str == "" || str == undefined || str == null) {
    return true;
  } else {
    return false;
  }
}

// 在组件挂载时调用 API
onMounted(() => {
  getLeaves();
});
</script>

<style lang="scss" scoped>
.leave {
  width: 1100px;
  margin: auto;
  padding: 0 80px;
  padding-top: 100px;
  min-height: 100vh;
  padding-bottom: 20px;
  background-color: #fff;
  .leave-apply {
    .item {
      display: flex;
      padding: 10px 0;
      align-items: center;
      span {
        margin: 0 10px;
      }
      input {
        outline: none;
      }
    }
    .leave-send {
      margin-left: 82px;
      margin-top: 10px;
    }
  }
  .leave-record {
    margin-top: 30px;
    .leave-page {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 15px;
    }
  }
}
</style>
