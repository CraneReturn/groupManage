<template>
  <div class="attend">
    <div class="searchMember">
      <!-- <el-select v-model="value" placeholder="成员年级" style="width: 150px">
        <el-option
          v-for="item in gradeDataAll"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </el-select> -->
      <el-input
        v-model="sendNickName"
        style="width: 240px"
        placeholder="按姓名搜索"
      />
      <el-button type="primary" @click="searchLeaves">搜索</el-button>
      <el-button type="default" @click="getNewAllData">重置</el-button>
    </div>
    <div class="table">
      <el-table :data="leavesdata" style="width: 100%">
        
        <el-table-column label="请假人员">
          <template #default="scope">
    
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="批假人员">
          <template #default="scope">
            <span>{{ scope.row.appRoveName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="请假原因">
          <template #default="scope">
            <span>{{ scope.row.reason}}</span>
          </template>
        </el-table-column>

        <el-table-column label="请假类型">
          <template #default="scope">
            <el-tag> {{ scope.row.leaveType}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="请假时长" min-width="150px">
          <template #default="scope">
            <el-tag>{{ scope.row.startDate}}-{{ scope.row.endDate}} </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              @click="goToUserMessage(scope.row.userId)"
            >
              详情信息
            </el-button>
          </template>
        </el-table-column>
        
      </el-table>
      <div class="page">
        <el-pagination
          background
          v-model:current-page="leavepage"
          :size="size"
          :disabled="disabled"
          layout="prev, pager, next, jumper"
          :total="leaveallpage*10"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import userTeacherMange from '@/views/teacher/api/userMange'
import leaveMange from '@/views/teacher/api/dailyManger'
import { useRouter } from 'vue-router'
const {getNewGrade} =userTeacherMange
const router=useRouter()
const {getStudentLeave,leavesdata,searchLeaves,leaveallpage,leavepage,sendNickName,getNewAllData}=leaveMange
onMounted(async()=>{
  await getNewGrade()
  await getStudentLeave()
})
interface User {
  date: string;
  name: string;
  address: string;
}
import type { ComponentSize } from "element-plus";
const size = ref<ComponentSize>("default");
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const goToUserMessage=(id)=>{
  router.push({
    path: '/teacher/person',
    query: { memberId: id }
  })
}
watch(leavepage, async (newValue, oldValue) => {
    console.log('11111');
    
    if (newValue != oldValue) {
        if (sendNickName.value == '') {
            await getStudentLeave()
        } else {
            await searchLeaves()
        }
    }
})
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
