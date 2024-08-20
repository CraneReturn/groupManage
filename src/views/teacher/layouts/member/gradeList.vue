<template>
  <div class="grades">
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
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              详情
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
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
import { onMounted, ref } from "vue";
import userTeacherMange from '@/views/teacher/api/userMange'
interface User {
  date: string;
  name: string;
  address: string;
}
const {userPage,getAllUserMethods,userData} =userTeacherMange
import type { ComponentSize } from "element-plus";
const currentPage3 = ref(5);
const pageSize3 = ref(100);
const size = ref<ComponentSize>("default");
const disabled = ref(false);

onMounted(()=>{
  getAllUserMethods()
  console.log(userData,'11111');
  
})
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
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
</style>
