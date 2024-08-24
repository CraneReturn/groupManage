<template>
  <div class="leave">
    <div class="leave-apply">
      <div class="reason item">
        <span>请假理由:</span>
        <el-input
          v-model="input1"
          style="width: 240px"
          placeholder="请假理由"
          clearable
        />
      </div>
      <div class="leave-type item">
        <span>请假类型:</span>
        <el-select
          v-model="input2"
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
          v-model="value1"
          type="datetime"
          placeholder="开始时间"
        />
        <span>-</span>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="结束时间"
        />
      </div>
      <div class="leave-send">
        <el-button type="primary">提交</el-button>
        <el-button>取消</el-button>
      </div>
    </div>
    <div class="leave-record">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="请假理由" width="180" />
        <el-table-column prop="name" label="请假类型" width="180" />
        <el-table-column prop="address" label="请假时间" />
        <el-table-column prop="address" label="状态" />
        <el-table-column prop="address" label="审批人" />
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
import { ref,onMounted } from "vue";
import {getLeaveRecords} from "@/api/student.ts";

const value1 = ref("");
const value2 = ref("");
const input1 = ref("");
const input2 = ref("");

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
const tableData = [
  {
    date: "2016-05-03",
    status: 0,
    approverNickname: "No. 189, Grove St, Los Angeles",
    leaveType:"事假",
  },
];

//获取请假记录
const  getLeaves= ()=>{
    getLeaveRecords(pageNum.value,pageSize.value)
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
      console.log(pageNum.value);
    })
}

// 在组件挂载时调用 API
// onMounted(() => {
//   getLeaves()
// });
</script>

<style lang="scss" scoped>
.leave {
  width: 1000px;
  margin: auto;
  padding: 0 80px;
  padding-top: 100px;
  height: 100vh;
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
