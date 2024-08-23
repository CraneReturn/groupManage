<template>
  <div class="leave">
    <div class="searchMember">
      <el-select v-model="value" placeholder="成员状态" style="width: 150px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <el-input v-model="input" style="width: 240px" placeholder="学生姓名" /> -->
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
        <el-table-column label="申请时间">
          <template #default="scope">
            <el-tag> 计科213 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请状态">
          <template #default="scope">
            <el-tag> 病假 </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              详情信息
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          v-model:current-page="currentPage"
          page-size="5"
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
import { getLeave } from "@/api/teacher/leave";

const currentPage = ref(1);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

// Use ref for a reactive array
const tableData = ref([]);

const input = ref();
const value = ref("");
const options = [
  { value: "全部", label: "" },
  { value: "已退组", label: "" },
  { value: "待审批", label: "待审批" },
  { value: "已拒绝", label: "已拒绝" },
];

// 获取退组信息
const getLeaveUser = () => {
  const obj = {
    pageCount: currentPage.value,
    pageSize: 5,
    status: "",
  };
  getLeave(obj).then((response) => {
    console.log(response);

    tableData.value = response.data; // Assign data to the .value property
  });
};
onMounted(() => {
  getLeaveUser();
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
</style>
