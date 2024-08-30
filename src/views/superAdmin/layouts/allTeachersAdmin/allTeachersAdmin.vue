<template >
  <div style="padding: 1%;margin-top: 3%;">
    <div style="height: 54px;">
      <div class="mt-4" >
        <el-input
          v-model="input3"
          style="max-width: 500px;float: left"
          placeholder="请输入要搜索的内容"
          class="input-with-select"
          >
          <template #prepend>
            <el-select v-model="select" placeholder="选择" style="width: 115px">
              <el-option label="工号" value="1" />
              <el-option label="姓名" value="2" />
            </el-select>
          </template>
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
    </div>
      <div style="height: 50px;">
        <label for="file-upload" class="custom-file-upload" >
          + 选择文件
        </label>
        <input 
        id="file-upload" 
        type="file" 
        @change="handleFileChange" 
        accept=".xlsx,.xls" 
        hidden
        />
        <el-button @click="downloadTeacher" type="success" :icon="Download" style="margin-left: 30px;">
          <span style="vertical-align: middle">下载导入老师样表</span>
          </el-button>
        <el-button @click="handleDelete()" type="danger" :icon="Delete">
          <span style="vertical-align: middle">删除</span>
          </el-button>
      </div>

          <el-table
            ref="multipleTableRef"
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :row-key="row=>row.id"
            :selection="selectedRows"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column property="account" label="工号" width="190" />
            <el-table-column property="nickname" label="姓名" width="120" />
            <el-table-column property="sex" label="性别" width="120" />
            <el-table-column property="groupName" label="小组名称"  />
            <el-table-column label="操作">
            <template #default="{ row }">
              <el-button @click.native="dialogFormVisible = true" @click.stop="handleEdit(row.id,row.account,row.groupName,row.nickname,row.sex,row.groupId) " 
              type="primary" plain size="small">修改</el-button>
            </template>
          </el-table-column>
          </el-table>

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
    <div>
      <el-dialog v-model="dialogFormVisible" title="修改教师信息" width="500"  >
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="form.teaSex">
            <el-radio value="男" name="teaSex">男</el-radio>
            <el-radio value="女" name="teaSex">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工号" :label-width="formLabelWidth">
        <el-input v-model="form.account" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="小组" :label-width="formLabelWidth">
        <el-input v-model="form.groupName" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="教师id" :label-width="formLabelWidth" style="display: none;">
        <el-input v-model="form.teaId" autocomplete="off" />
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
import { Download  } from '@element-plus/icons-vue'
import { RefreshRight } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { Delete } from '@element-plus/icons-vue'
import {reactive, ref } from 'vue'
import { ElTable, rowContextKey } from 'element-plus'
import { getTea } from '@/api/admin.ts';
import { del } from '@/api/admin.ts'
import { ElMessage } from 'element-plus'
import { uploadTea } from '@/api/admin.ts';
import { putTea } from '@/api/admin.ts';
import { ElNotification } from 'element-plus'

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const input3 = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0); // 定义响应式总记录数变量
const tableData = ref<any[]>([]); // 使用 ref 来使数据响应式
const selectedRows = ref<any[]>([]); // 使用 ref 来使数据响应式
const dialogFormVisible = ref(false)
const teachers=ref([]);
const select = ref('')
const account=ref('');
const nickname=ref('');
const file = ref(null);
const formLabelWidth = '140px'
var form = reactive({
    account:'',
    nickname:'',
    groupName:'',
    groupId:'',
    teaId:'',
    teaSex:''
  })
  interface User {
  id:string
  account: string
  name: string
  sex: string
  groupName: string
}
// const teachersIds=ref([]);
const handleEdit = (id,account,groupName,nickname,sex,groupId) => {
  form = reactive({
    account:account,
    nickname:nickname,
    groupName:groupName,
    groupId:groupId,
    teaId:id,
    teaSex:sex
  })
};
// 上传修改过的教师信息
const getupdateApi=(form)=>{
  const groupData=async(form)=>{
    try{
    let account=form.account;
    let nickname=form.nickname;
    let sex=form.teaSex;
    let id=form.teaId;
    if(isOnlySpaces(account)==true){
    ElMessage.error('教师工号不能为空');
    }else if(isOnlySpaces(nickname)==true){
      ElMessage.error('教师姓名不能为空');
    }else {
      const updateGroupmess=await putTea(account,id,nickname,sex);
        ElNotification({
        title: 'Success',
        message: '教师信息更新成功',
        type: 'success',
      })
    }
  }catch(error){
    console.error('小组信息更新失败',error);
  }
  }
  groupData(form);
  fetchTeachers(account.value,nickname.value,currentPage.value, pageSize.value);
}

const downloadTeacher=()=>{
    // 创建一个隐藏的链接元素
    const link = document.createElement('a');
  
  // 设置文件的 URL，假设模板文件存储在 public/templates/teacher_template.xlsx
  link.href = '/templates/teacher-template.xlsx';
  
  // 设置下载的文件名
  link.download = 'teacher-template.xlsx';
  
  // 触发点击事件，下载文件
  link.click();
}
// 选择文件
const handleFileChange = (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    // 检查文件类型
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    if (allowedTypes.includes(selectedFile.type)) {
      file.value = selectedFile;
      submitFile();
    } else {
      ElNotification({
      title: 'Error',
      message: '请选择有效的 Excel 文件。',
      type: 'error',
    })
      file.value = null;
    }
  }
};
// 上传文件
const submitFile = async () => {
  if (file.value) {
    try {
      await uploadTea(file.value);
      ElNotification({
        title: 'Success',
        message: '文件上传成功',
        type: 'success',
      })
    } catch (error) {
      ElNotification({
      title: 'Error',
      message: '请使用下载的教师样表，此格式文件上传失败',
      type: 'error',
    })
    }
  } else {
    ElNotification({
    title: 'Error',
    message: '请先选择一个文件',
    type: 'error',
  })
  }
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
// 删除信息
const handleDelete=async()=>{
  const teachersIds=multipleSelection.value.map(row=>row.id);
  if(teachersIds.length>0){
    try{
      const response=await del(teachersIds);
      //重新加载页面
      fetchTeachers(account.value,nickname.value,currentPage.value, pageSize.value);
    }catch(error){
      ElMessage.error('删除失败');
    }

  }else{
    ElMessage.warning('请首先选择要删除的项');
  }
  
}
// 从接口获取数据
const fetchTeachers=async(account,nickname,pageNum,pageSize)=>{
try{
  const response=await getTea(account,nickname,pageNum,pageSize);
  console.log(response);
  teachers.value=response.data;//根据接口返回的数据结构进行调整
  total.value = response.data.total;
  tableData.value=response.data.records.map((item)=>({
    account:item.account,
    nickname:item.nickname,
    sex:item.sex,
    groupName:item.groupName,
    id:item.id
  }));
}catch(error){
  console.error('Error fetching groups:',error);
}
}
fetchTeachers(account.value,nickname.value,currentPage.value, pageSize.value);
// 分页器
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  fetchTeachers(account.value,nickname.value,currentPage.value, pageSize.value);
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
  fetchTeachers(account.value,nickname.value,currentPage.value, pageSize.value);
};

// 判断信息搜索信息是否为空
function isOnlySpaces(input) {  
  // 创建正则表达式匹配任何非空格字符  
  const regex = /^[\s]*$/;  
  // 使用test方法检查输入是否符合正则表达式  
  return regex.test(input);  
}  

// 搜索
const searchGroup=(string)=>{
  if(isOnlySpaces(string)==true){
    ElMessage.error('搜索内容不能为空');
  }else{
    if(!select.value){
    ElMessage.error('请选择搜索条件');
    }else{
      switch(select.value){
        // 搜索工号
        case'1':
          account.value=input3.value;
          fetchTeachers(account.value,'',currentPage.value, pageSize.value);
          break;
          // 搜索姓名
        case'2':
          nickname.value=input3.value;
          fetchTeachers('',nickname.value,currentPage.value, pageSize.value);
          break;
        default:
         ElMessage.error('选择了无效的选项');        
      }
    }
  }
}
// 点击重置按钮
const refreshData=()=>{
  account.value=input3.value='';
  nickname.value=input3.value=''
  fetchTeachers(account.value,nickname.value,currentPage.value, pageSize.value);
}

</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
/* 自定义上传按钮的样式 */
.custom-file-upload {
  border: 1px solid #e0e0e0;
  display: inline-block;
  padding: 3px 12px;
  cursor: pointer;
  background-color: #909399; /* 灰色背景 */
  color: white; /* 文字颜色 */
  border-radius: 4px; /* 圆角边框 */
}

.custom-file-upload:hover {
  background-color: #e0e0e0; /* 鼠标悬停时的背景颜色 */
}
</style>
