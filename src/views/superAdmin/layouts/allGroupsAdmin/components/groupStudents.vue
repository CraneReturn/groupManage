<template>
  <div>
    <h2>{{ groupName }}</h2>  
    <br>
    <el-button type="primary" @click="backAllGroup"> < 返回</el-button>
    <br>
    <br>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="account" label="学号" width="260" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="sex" label="性别" width="180" />
      <el-table-column prop="college" label="专业" width="180" />
      <el-table-column prop="ownClass" label="班级" />
      </el-table>
    </div>

    <!-- 分页器部分 -->
    <div class="demo-pagination-block" style="padding-left: 3%;padding-top: 1%;">
      <span style="float: left;padding-right: 2%; padding-top: 5px;">总数:{{ total }}</span>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

  </div>
</template>
<script>
 
</script>
<script setup>
import { useRouter } from 'vue-router' 
import { useRoute } from 'vue-router';
import {reactive, ref } from 'vue';
import { getGroupStu } from '@/api/admin.ts';
const groups=ref([]);
const route = useRoute();
const router = useRouter()  
const id=route.query.id
const groupName=route.query.name

//更新分页器的事件处理函数，确保每次分页器的当前页码或每页数据量改变时，都会调用 fetchGroups 重新加载数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0); // 定义响应式总记录数变量
const tableData = ref([]);
// 从接口获取数据
const fetchGroupstudents=async(groupId,pageNum,pageSize)=>{
try{
  const response=await getGroupStu(groupId,pageNum,pageSize);
  console.log(response);
  
  groups.value=response.data;//根据接口返回的数据结构进行调整
  total.value = response.data.total;
  tableData.value=response.data.records.map((item)=>({
    account:item.account,
    name:item.nickname,
    sex:item.sex,
    ownClass:item.ownClass,
    college:item.college,
  }));
}catch(error){
  console.error('Error fetching groups:',error);
}
}
fetchGroupstudents(id,currentPage.value, pageSize.value);
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchGroupstudents(id,currentPage.value, pageSize.value);
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchGroupstudents(id,currentPage.value, pageSize.value);
};
const backAllGroup=()=>{
  router.push({path:'allGroups'})
}
props:{
  total;
} 
</script>
