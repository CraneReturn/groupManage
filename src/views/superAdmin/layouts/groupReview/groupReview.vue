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
  显示表格边框 <el-switch v-model="parentBorder" /> 
  <el-table :data="tableData" :border="parentBorder" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4" style="padding-left: 60px;padding-right: 50px;">
          <p m="t-0 b-2">
            小组简介: {{ props.row.intro }}
          </p>  
        </div>
      </template>
    </el-table-column>
    <el-table-column label="小组名称" prop="name" />
    <el-table-column label="小组位置" prop="address" />
    <el-table-column label="申请时间" prop="date" />
    <el-table-column label="操作">
  <template #default="{ row }">
    <el-button @click.native="Apply(row.id)" @click.stop="dialogVisible = true" type="success" plain size="small">通过申请</el-button>
    
    <el-button @click="Apply(row.id)" @click.stop="dialogFormVisible = true" type="danger" plain size="small">拒绝申请</el-button>
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
<el-dialog
    v-model="dialogVisible"
    title="审核"
    width="500"  
  >
    <span>确定要通过该小组申请?</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="passGroup" @click.stop="dialogVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 删除部分的对话框 -->
  <el-dialog v-model="dialogFormVisible" title="审核" width="500">
    <el-form :model="form">
      <el-form-item label="拒绝的原因：&nbsp;" :label-width="formLabelWidth">
        <el-input 
        v-model=refuseReason
        :autosize="{ minRows: 2}"
        type="textarea"
        autocomplete="off"
         />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="refuseGroup(refuseReason)" @click.stop="dialogFormVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</div>
</template>

<script lang="ts" setup>
 import { Search } from '@element-plus/icons-vue'
import { RefreshRight } from '@element-plus/icons-vue'
import {reactive, ref } from 'vue'
import { getGroup } from '@/api/admin.ts';
import { auditGroup } from '@/api/admin.ts'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router' 
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
const formLabelWidth = '140px'
const dialogFormVisible = ref(false)
const dialogVisible = ref(false)
const router = useRouter()  
const parentBorder = ref(false)
const groups=ref([]);
const tableData = ref<any[]>([]); // 使用 ref 来使数据响应式
//更新分页器的事件处理函数，确保每次分页器的当前页码或每页数据量改变时，都会调用 fetchGroups 重新加载数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0); // 定义响应式总记录数变量
const status=ref(0)
const input3 = ref('');
const refuseReason=ref('')

// 从接口获取数据
const fetchGroups=async(groupName,page,pageSize,status)=>{
try{
  const response=await getGroup(groupName,page,pageSize,status);
  console.log(response)
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
  })
)
  console.log('表格数据',tableData.value);
}catch(error){
  console.error('Error fetching groups:',error);
}
}
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchGroups(input3.value,currentPage.value, pageSize.value,status.value);
};
const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  fetchGroups(input3.value,currentPage.value, pageSize.value,status.value);
};
// Initial fetch
fetchGroups(input3.value,currentPage.value, pageSize.value,status.value);
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
    fetchGroups(input3.value,currentPage.value, pageSize.value,status.value);
  }
}
// 点击重置按钮
const refreshData=()=>{
  input3.value='';
  fetchGroups('',currentPage.value, pageSize.value,status.value);
}

const Apply=(groId:any)=>{
  localStorage.setItem('groId',groId)
}
//  通过小组申请
const passGroup=async()=>{
 let groupId=localStorage.getItem('groId');
    //  请求接口
    try{
      console.log(groupId);
      const response=await auditGroup(groupId,' ',1);
      ElNotification({
        title: 'Success',
        message: '小组申请通过',
        type: 'success',
      })
      fetchGroups(input3.value,currentPage.value, pageSize.value,status.value);
    }catch(error){
      ElNotification({
        title: 'Error',
        message: '通过失败',
        type: 'error',
      })
    }
}
// 拒绝小组申请
const refuseGroup=async(reason:any)=>{
  let groupId=Number(localStorage.getItem('groId'));
    //  请求接口
    try{
      const response=await auditGroup(groupId,reason,2);
      ElNotification({
        title: 'Success',
        message: '拒绝成功',
        type: 'success',
      })
      fetchGroups(input3.value,currentPage.value, pageSize.value,status.value);
    }catch(error){
      ElNotification({
        title: 'Error',
        message: '拒绝失败',
        type: 'error',
      })
    }
}
</script>
<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
