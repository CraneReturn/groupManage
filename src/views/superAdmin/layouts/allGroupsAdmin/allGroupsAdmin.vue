<template>
  <div style="padding: 1%;">
    <div class="mt-4">
    <el-input
      v-model="input3"
      style="max-width: 500px;float: left"
      placeholder="请输入要搜索的小组名"
      class="input-with-select"
      >
      <template #append >
        <el-button :icon="Search" @click="searchGroup(input3)" />
      </template>
    </el-input>
  </div>
    <div class="el-form-item__content" style="float: right;margin-right: 200px">
        <el-button type="default" :icon="RefreshRight" @click="refreshData()">  
            <span style="vertical-align: middle"> 重置 </span>
        </el-button>   
    </div>
    <br>
    <br>
<div>
  switch parent border: <el-switch v-model="parentBorder" /> 
  switch child border: <el-switch v-model="childBorder" />
  <el-table :data="tableData" :border="parentBorder" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">State: {{ props.row.state }}</p>
          <p m="t-0 b-2">City: {{ props.row.city }}</p>
          <p m="t-0 b-2">Address: {{ props.row.address }}</p>
          <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
          <h3>Family</h3>
          <el-table :data="props.row.family" :border="childBorder">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="State" prop="state" />
            <el-table-column label="City" prop="city" />
            <el-table-column label="Address" prop="address" />
            <el-table-column label="Zip" prop="zip" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="小组名称" prop="name" />
    <el-table-column label="小组位置" prop="address" />
    <el-table-column label="操作">
  <template #default="{ row }">
    <el-button @click="handleLook(row.id,row.name) " type="success" plain size="small">查看学生</el-button>
    <el-button @click.native="dialogFormVisible = true" @click.stop="handleEdit(row.id,row.address,row.groupName,row.intro) " 
     type="primary" plain size="small">修改</el-button>
    <el-button @click="handleDelete(row.id)" type="danger" plain size="small">删除</el-button>
  </template>
</el-table-column>

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
<!-- 对话框部分 -->
 <div>

  <el-dialog v-model="dialogFormVisible" title="修改小组信息" width="500"  >
    <el-form :model="form">
      <el-form-item label="小组名称" :label-width="formLabelWidth">
        <el-input v-model="form.groupName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="小组位置" :label-width="formLabelWidth">
        <el-input v-model="form.groupAddress" autocomplete="off" />
      </el-form-item>
      <el-form-item label="小组简介" :label-width="formLabelWidth">
        <el-input v-model="form.groupIntro" autocomplete="off" />
      </el-form-item>
      <el-form-item label="小组id" :label-width="formLabelWidth" style="display: none;">
        <el-input v-model="form.groupId" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click.stop="dialogFormVisible = false" @click.native="getupdateApi(form)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
 </div>
</div>
</template>
<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { RefreshRight } from '@element-plus/icons-vue'
import {reactive, ref } from 'vue'
import { getGroup } from '@/api/admin.ts';
import { putGroup } from '@/api/admin.ts'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router' 
import { ElMessage } from 'element-plus'
const router = useRouter()  
const parentBorder = ref(false)
const childBorder = ref(false)
const groups=ref([]);
const tableData = ref<any[]>([]); // 使用 ref 来使数据响应式
//更新分页器的事件处理函数，确保每次分页器的当前页码或每页数据量改变时，都会调用 fetchGroups 重新加载数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0); // 定义响应式总记录数变量
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const input3 = ref('');
const handleLook=(id,name)=>{
  router.push({name:'groupStudents',query:{id,name}})
}

var form = reactive({
    groupAddress:'',
    groupName:'',
    groupIntro:'',
    groupId:'',
  })

// 从接口获取数据
const fetchGroups=async(groupName,page,pageSize)=>{
try{
  const response=await getGroup(groupName,page,pageSize,'');
  groups.value=response.data;//根据接口返回的数据结构进行调整
  total.value = response.data.total;
  tableData.value=response.data.records.map((item:any)=>({
    date:new Date(item.createTime).toISOString().split('T')[0],
    name:item.groupName,
    groupName:item.groupName,
    state:item.status,
    city:item.groupAddress,
    address:item.groupAddress,
    id:item.groupId,
    intro:item.groupIntro,
    family:item.nickname.map((name:string)=>({
      name,
      state:'已经上市',
      city:'背景',
      address:item.groupAddress,
      zip:'N/A',
    })
  )
  })
)
  console.log('表格数据',tableData.value);
}catch(error){
  console.error('Error fetching groups:',error);
}
}
  const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchGroups(input3.value,currentPage.value, pageSize.value);
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  fetchGroups(input3.value,currentPage.value, pageSize.value);
};

// Initial fetch
fetchGroups(input3.value,currentPage.value, pageSize.value);
// 获取信息
const handleEdit = (id,address,groupName,intro) => {
  form = reactive({
    groupAddress:address,
    groupName:groupName,
    groupIntro:intro,
    groupId:id,
  })
};
// 更新编辑后的小组信息
const getupdateApi=(form)=>{
  const groupData=async(groupUpdateDTO)=>{
    try{
    const updateGroupmess=await putGroup(groupUpdateDTO);
    ElNotification({
    title: 'Success',
    message: '小组信息更新成功',
    type: 'success',
  })
  }catch(error){
    console.error('小组信息更新失败',error);
  }
  }
  groupData(form);
  fetchGroups(input3.value,currentPage.value, pageSize.value);
}
// 判断信息搜索信息是否为空
function isOnlySpaces(input) {  
  // 创建正则表达式匹配任何非空格字符  
  const regex = /^[\s]*$/;  
  // 使用test方法检查输入是否符合正则表达式  
  return regex.test(input);  
}  

// 搜索小组
const searchGroup=(string)=>{
  if(isOnlySpaces(string)==true){
    ElMessage.error('搜索内容不能为空');
  }else{
    // 请求调用
    fetchGroups(input3.value,currentPage.value, pageSize.value);
  }
}
// 点击重置按钮
const refreshData=()=>{
  input3.value='';
  fetchGroups('',currentPage.value, pageSize.value);
}

//删除
const handleDelete = (id: string) => {
  // 处理删除操作
  console.log('删除:', id);
};
props:{
  total;
} 

</script>
<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
