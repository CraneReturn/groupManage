<!-- 组织成员信息 -->
<template>
  <div class="memberInfo">
    <!-- 成员基本信息 -->
    <div class="titleInfo">
      <div class="person">
        <div class="avater">
          <img src="@/assets/image/小组logo.png" alt="成员头像" />
        </div>
        <div class="info">
          <h1>{{ userMaindata.ownClass }}{{ userMaindata.nickname }}</h1>
          <div class="label"><span>{{ userMaindata.authority == 3 ? `${groupMaindata.groupName}负责人` :
            groupMaindata.groupName
          }}负责人</span><span>{{ userMaindata.grade }}</span></div>
        </div>
      </div>
      <div class="oprateUser">
        <el-button>转让负责人/更改为负责人</el-button>
      </div>
    </div>

    <div class="userMain">
      <div class="personInfo">
        <el-descriptions title="成员个人档案" column="1">
          <el-descriptions-item label="成员姓名">{{ userMaindata.nickname }}</el-descriptions-item>
          <el-descriptions-item label="班级"><el-tag size="small">{{ userMaindata.ownClass
          }}</el-tag></el-descriptions-item>
          <el-descriptions-item label="学院"><span>{{ userMaindata.college }}</span></el-descriptions-item>
          <el-descriptions-item label="职位">{{ userMaindata.authority == 3 ? '小组负责人' : '普通成员' }}</el-descriptions-item>
          <el-descriptions-item label="性别">
            <el-tag size="small">{{ userMaindata.sex }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学号">
            <el-tag size="small">{{ userMaindata.account }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="手机号">
            <el-tag size="small">{{ userMaindata.phone }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
        <img src="@/assets/image/小组logo.png" alt="logo" class="backgroundLogo" />
      </div>
      <div class="attendance">
        <h3>假勤</h3>
        <div class="attend">
          <el-calendar 
          @input ="handleDateClick"
          :range="[new Date(previousMonday.prevYear, previousMonday.prevMonth, previousMonday.prevDay)
            , new Date(nowMonday.nextYear, nowMonday.nextMonth, nowMonday.nextDay)]" :disabled-date="disabledDate">
            <template #date-cell="{ data }">
            <div v-if="data.date!==previousMonday">
                <div v-for="item in leaveStudent" class="floatMessageLeave">
                  <div v-if="data.date.getMonth()+1==item.date.month
                      && data.date.getFullYear()==item.date.year
                      && data.date.getDate()==item.date.day
                      "
                      class="floatMessageLeavetag">
                    <el-tag type="primary" size="small" v-if="
                    data.date.getMonth()+1== thismothDate.month">
             
                      <span>请假</span>
                    
                    </el-tag>
                  </div>
                </div>
    
            </div>
              <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(1).join('-') }}
                {{ data.isSelected ? '✔️' : '' }}
              </p>
            </template>
          </el-calendar>

          <div class="attendInfo">
            <h3>请假信息</h3>
            <el-scrollbar max-height="180px" noresize="true">
              <el-descriptions column="3">
                <el-descriptions-item label="请假类型">
                  <el-tag size="small">病假</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="审批人">
                  <span size="small">计科223李向阳</span>
                </el-descriptions-item>
                <el-descriptions-item label="审批状态">
                  <el-tag size="small">通过</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions column="1">
                <el-descriptions-item label="请假时间">
                  <el-tag size="small">2024-10-25 10：00</el-tag>-
                  <el-tag size="small">2024-10-25 10：00
                  </el-tag></el-descriptions-item>
                <el-descriptions-item label="原因">
                  <span class="reason">111111111111111111111</span></el-descriptions-item>
              </el-descriptions>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// 获取当前日期
const current = new Date();
const today = current.getDay();
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
import studentMain from '@/views/teacher/api/studentMain'
const { userMaindataMethods, userMaindata, groupMaindataMethods, 
  groupMaindata,leaveStudent,getStudentsAllLeave } = studentMain
const router = useRoute()
const data = ref(true)
const uid = router.query.memberId
const getLastDayOfMonth = () => {
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let month = currentMonth + 1;
  const dateDay = getDaysInMonth(currentYear, month)
  return {
    currentYear,
    month,
    dateDay
  }
}
let thismothDate = reactive({ currentYear: 2024, month: 8, dateDay: 30 })
let previousMonday = ref({
  prevYear: 1,
  prevMonth: 2,
  prevDay: 3
})
let nowMonday = ref({
  nextYear: 1,
  nextMonth: 2,
  nextDay: 3
})
onMounted(async () => {
  await userMaindataMethods(uid)
  await groupMaindataMethods()
  const thismoth = getLastDayOfMonth()
  await getStudentsAllLeave(uid)
  thismothDate.currentYear = thismoth.currentYear
  thismothDate.month = thismoth.month
  thismothDate.dateDay = thismoth.dateDay
  previousMonday.value = getPreviousMonday(thismothDate.currentYear, thismothDate.month, 1);
  nowMonday.value = getNextSunday(thismothDate.currentYear, thismothDate.month, thismothDate.dateDay + 1);

})
const getDaysInMonth = (year: number, month: number) => {
  if (month === 1) {
    // 检查是否是闰年
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
      return 29;
    }
  }
  switch (month) {
    case 0: case 2: case 4: case 6: case 7: case 9: case 11:
      return 31;
    case 3: case 5: case 8: case 10: case 12:
      return 30;
    default:
      return 'Invalid month';
  }
}
const getPreviousMonday = (year: number, month: number, date: number | undefined) => {
  const inputDate = new Date(year, month - 1, date);
  const dayOfWeek = inputDate.getDay();
  const daysUntilPreviousMonday = (dayOfWeek + 6) % 7;

  const previousMonday = new Date(inputDate);
  previousMonday.setDate(inputDate.getDate() - daysUntilPreviousMonday);

  const prevYear = previousMonday.getFullYear();
  const prevMonth = String(previousMonday.getMonth() + 1).padStart(2, '0');
  const prevDay = String(previousMonday.getDate()).padStart(2, '0');

  return {
    prevYear,
    prevMonth,
    prevDay
  }
}
const getNextSunday = (year: number, month: number, date: number | undefined) => {
  const inputDate = new Date(year, month - 1, date);
  const dayOfWeek = inputDate.getDay();
  const daysUntilNextSunday = (0 - dayOfWeek + 7) % 7 || 7; // 0代表周日

  const nextSunday = new Date(inputDate);
  nextSunday.setDate(inputDate.getDate() + daysUntilNextSunday);

  const nextYear = nextSunday.getFullYear();
  const nextMonth = String(nextSunday.getMonth() + 1).padStart(2, '0');
  const nextDay = String(nextSunday.getDate()).padStart(2, '0');
  return {
    nextYear,
    nextMonth,
    nextDay
  }
}

const disabledDate = (time: { getFullYear: () => number; getMonth: () => number; }) => {
  const today = new Date();
  return time.getFullYear() !== today.getFullYear() || time.getMonth() !== today.getMonth() || time.getDate() < today.getDate() || time.getDate() > today.getDate();
}

</script>
<style lang="scss">
.memberInfo {
  width: 100%;
  height: 100%;
}

.personInfo {
  background-color: #fff;
  position: relative;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 30%;
  overflow: hidden;
}

.attendance {
  background-color: #fff;
  margin: 10px;
  margin-left: 0;
  padding: 10px;
  border-radius: 5px;
  width: 70%;
  overflow: scroll;

  h3 {
    color: var(--el-text-color-primary);
    font-size: 16px;
    font-weight: bold;
    margin: 5px;
  }
}

.person {
  display: flex;
  align-items: end;
  overflow: hidden;
  transition: width 0.25s, background-color 0.25s;
  border-radius: 10px;
  padding: 5px;
  gap: 15px;
  cursor: pointer;

  .info {
    h1 {
      font-size: 15px;
    }

    .label {
      display: flex;
      margin: 5px 0;
      gap: 4px;

      span {
        font-size: 8px;
        border-radius: 4px;
        padding: 2px 3px;
        border: 1px solid #ccc;
        color: #9c9c9c;
      }
    }
  }

  .avater {
    width: 75px;
    height: 75px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ebebeb;
    box-shadow: 1px 1px 12px #ebebeb;
    display: flex;
    align-items: center;

    img {
      padding: 5px;
      width: 100%;
    }
  }
}

.userMain {
  height: 80%;
  margin-top: 10px;
  background-color: #ebebeb;
  display: flex;

  .backgroundLogo {
    position: absolute;
    width: 200px;
    opacity: 0.5;
    transform: rotateZ(325deg);
    z-index: 0;
    bottom: 15px;
    right: -50px;
  }
}

.weekStatus {
  max-width: 350px;
  display: flex;
  padding: 5px;
  border: 1px solid #ebebeb;
  border-radius: 4px;

  .userAttend {
    display: flex;
    flex-direction: column;
  }

  .week {
    border-bottom: 1px solid #ebebeb;
  }

  .date {
    display: flex;
    gap: 5px;
    padding: 5px;
    text-align: center;
    justify-content: space-between;
  }
}

.attend {
  .el-scrollbar {
    border: 1px solid #ebebeb;
    border-radius: 4px;
    padding: 10px;
  }

  .reason {
    overflow-wrap: break-word;
    word-break: break-all;
  }
}

.is-selected {
  color: #1989fa;
}

.el-calendar__button-group {
  display: none !important;
}
::v-deep .el-calendar__button-group {
  display: none;
}
::v-deep .el-calendar-table:not(.is-range) td.next {
  display: none!important;
}

::v-deep .el-calendar-table:not(.is-range) td.prev {
  visibility: hidden !important;;
}
.el-calendar-table{
  width: 100%;
  height: 100%;
  &:not(.is-range){
      td.next{
          pointer-events: none;
      }
      td.prev{
          pointer-events: none;
      }
  }
}
.floatMessageLeave{
  position: relative;
  width: 100%;
  height: 100%;
}
.floatMessageLeavetag{
  position: absolute;
  bottom:20px;
}
</style>
