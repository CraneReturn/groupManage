<template>
  <div class="attend">
    <div class="searchMember">
      <el-select v-model="value" placeholder="Select" style="width: 150px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select>
      <el-input
        v-model="input"
        style="width: 240px"
        placeholder="Please input"
      />
      <el-button type="primary">搜索</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="年级">
          <template #default="scope">
            <el-tag>{{ scope.row.date }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="学号">
          <template #default="scope">
            <span>{{ 20221524323 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">
            <span>李向阳</span>
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template #default="scope">
            <el-tag> 女 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="班级">
          <template #default="scope">
            <el-tag> 计科213 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="请假类型">
          <template #default="scope">
            <el-tag> 病假 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="请假时长">
          <template #default="scope">
            <el-tag> 19：00-20：00 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              详情信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          v-model:current-page="currentPage3"
          v-model:page-size="pageSize3"
          :size="size"
          :disabled="disabled"
          layout="prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
interface User {
  date: string;
  name: string;
  address: string;
}
import type { ComponentSize } from "element-plus";
const currentPage3 = ref(5);
const pageSize3 = ref(100);
const size = ref<ComponentSize>("default");
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const tableData: User[] = [
  {
    date: "2016",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
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
</script>
<style lang="scss">
.page {
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: end;
}
.attend {
  margin-top: 20px;
  .searchMember {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
</style>
