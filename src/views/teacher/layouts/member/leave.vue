<template>
  <div class="leave">
    <div class="searchMember">
      <el-select
        v-model="membeStatus"
        placeholder="成员状态"
        style="width: 150px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-input v-model="input" style="width: 240px" placeholder="学生姓名" /> -->
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="学号">
          <template #default="scope">
            <span>{{ scope.row.account || "暂无" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称">
          <template #default="scope">
            <span>{{ scope.row.nickname || "暂无" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template #default="scope">
            <el-tag> {{ scope.row.sex || "无" }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="原因" width="150px" show-overflow-tooltip>
          <template #default="scope">
            <span>{{ scope.row.reason || "暂无" }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班级">
          <template #default="scope">
            <el-tag> {{ scope.row.ownClass || "暂无" }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="150px">
          <template #default="scope">
            <el-tag> {{ scope.row.applyTime || "暂无" }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审批时间" width="150px">
          <template #default="scope">
            <el-tag> {{ scope.row.reviewTime || "暂无" }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请状态">
          <template #default="scope">
            <el-tag> {{ scope.row.status || "无" }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              :disabled="scope.row.status !== '待审批'"
              @click="handleEdit(scope.row.id, scope.row)"
            >
              审批
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          v-model:current-page="currentPage"
          page-size="10"
          :disabled="disabled"
          layout="prev, pager, next, jumper"
          :total="dataTotal"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="退组成员审批" width="500">
    <div class="userName">
      <span>审批成员:</span><el-tag>{{ form.userName }}</el-tag>
    </div>
    <el-form :model="form">
      <el-form-item label="审批状态">
        <el-select v-model="form.status" placeholder="选择是否通过退组申请">
          <el-option label="通过" value="1" />
          <el-option label="拒绝" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="评价成员">
        <el-input
          v-model="form.evaluate"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="评价成员"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitIt"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { evaluateStudent, getLeave } from "@/api/teacher/leave";
import { ElMessage } from "element-plus";

interface Data {
  id: number;
  applyTime: string;
  reason: string;
  reviewTime: string;
  status: 0 | 1 | 2;
  nickname: string;
  sex: "男" | "女";
  account: string;
  ownClass: string;
}
const currentPage = ref(1);
const disabled = ref(false);
const dialogFormVisible = ref(false);
const dataTotal = ref(0);
const status = ref(0);
const form = reactive({
  evaluate: "",
  id: 0,
  status: "",
  userName: "",
});

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  const obj = {
    pageCount: currentPage.value,
    pageSize: 10,
    status: status.value,
  };
  getLeaveUser(obj);
};
const search = () => {
  status.value = membeStatus.value;
  const obj = {
    pageCount: 1,
    pageSize: 10,
    status: status.value,
  };
  getLeaveUser(obj);
};
// Use ref for a reactive array
const tableData = ref<Data[]>([]);
const membeStatus = ref(0);
const options = [
  { value: 0, label: "待审批" },
  { value: 1, label: "已退组" },
  { value: 2, label: "已拒绝" },
];
function formatDate(dateTimeString: string | number | Date) {
  // 创建 Date 对象
  const date = new Date(dateTimeString);

  // 提取日期部分
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // 返回格式化的字符串
  return `${year}年${month}月${day}日`;
}
function statusDate(status: number | string) {
  // 创建 Date 对象
  let state = "";
  switch (status) {
    case 0:
      state = "待审批";
      break;
    case 1:
      state = "已通过";
      break;
    case 2:
      state = "已拒绝";
      break;
  }

  // 返回格式化的字符串
  return state;
}
// 获取退组信息
const getLeaveUser = (obj: object) => {
  getLeave(obj).then((response) => {
    dataTotal.value = response.data.total;
    const processedData: Data[] = response.data.records.map((item: any) => ({
      id: item.leaveApplication.id,
      applyTime: formatDate(item.leaveApplication.applyTime),
      reason: item.leaveApplication.reason,
      reviewTime: formatDate(item.leaveApplication.reviewTime),
      status: statusDate(item.leaveApplication.status),
      nickname: item.userVO.nickname,
      sex: item.userVO.sex,
      account: item.userVO.account,
      ownClass: item.userVO.ownClass,
    }));
    tableData.value = [...processedData];
  });
};
const handleEdit = (id: number, obj: { nickname: string }) => {
  dialogFormVisible.value = true;
  form.userName = obj.nickname;
  form.id = id;
};
const submitIt = async () => {
  if (!form.evaluate || !form.status) {
    ElMessage({
      message: "信息未填写完整",
      type: "error",
      plain: true,
    });
    return;
  }
  try {
    await evaluateStudent({
      evaluate: form.evaluate,
      id: form.id,
      status: form.status,
    });
    ElMessage({
      message: "审批成功",
      type: "success",
      plain: true,
    });
    dialogFormVisible.value = false;
  } catch (error) {
    ElMessage({
      message: "找回密码失败，请重试",
      type: "error",
      plain: true,
    });
  }
};
onMounted(() => {
  getLeaveUser({
    pageCount: currentPage.value,
    pageSize: 10,
    status: 0,
  });
});
</script>
<style lang="scss">
.page {
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: end;
}
.leave {
  margin-top: 20px;
  .searchMember {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}
.userName {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}
</style>
