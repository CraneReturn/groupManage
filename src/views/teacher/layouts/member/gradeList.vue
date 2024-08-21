<template>
  <div class="grades">
    <div class="table">
      <el-table :data="alluserData" style="width: 100%">
        <el-table-column label="年级">
          <template #default="scope">
            
            <el-tag>{{ scope.row.grade }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="学号">
          <template #default="scope">
            <span>{{  scope.row.account  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">
            <span>{{  scope.row.nickname  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template #default="scope">
            <el-tag> {{  scope.row.sex  }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="班级">
          <template #default="scope">
            <el-tag> {{  scope.row.ownClass  }} </el-tag>
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
          v-model:current-page="userPage"
          :size="size"
          :disabled="disabled"
          layout="prev, pager, next, jumper"
          :total="alluserpage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import userTeacherMange from '@/views/teacher/api/userMange'
interface User {
  date: string;
  name: string;
  address: string;
}
const {userPage,getAllUserMethods,alluserpage,alluserData} =userTeacherMange
import type { ComponentSize } from "element-plus";
const currentPage3 = ref(5);
const pageSize3 = ref(100);
const size = ref<ComponentSize>("default");
const disabled = ref(false);
let userAllData=reactive([])
onBeforeMount(async()=>{
  await getAllUserMethods()
  console.log(alluserData,'hahahahah');
  
  // userAllData=data
  // console.log(userAllData,'1111');
  
  
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
