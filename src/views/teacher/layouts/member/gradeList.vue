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
              @click="gotoStudentMain(scope.row.id)"
            >
              详情
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
          :total="alluserpage*10"
          @current-change="getAllUserMethods"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import userTeacherMange from '@/views/teacher/api/userMange'
import { useRouter } from 'vue-router'
const {getAllUserMethods,alluserData,alluserpage,userPage}=userTeacherMange
interface User {
  date: string;
  name: string;
  address: string;
}
const router=useRouter()
import type { ComponentSize } from "element-plus";
const currentPage3 = ref(5);
const pageSize3 = ref(100);
const size = ref<ComponentSize>("default");
const disabled = ref(false);
let userAllData=reactive([])
onBeforeMount(async()=>{
  await getAllUserMethods()  
})
const gotoStudentMain=((id:number)=>{
  router.push({
    path: '/teacher/person',
    query: { memberId: id }
  })
})
</script>
<style lang="scss">
.page {
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: end;
}
</style>
