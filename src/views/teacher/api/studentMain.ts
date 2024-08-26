import { getUserStudentMessageMain, getUsergroupMessageMain, 
    getLeavesAll,getMessageLeavesByid,turnDute } from "@/api/teacher/userManger"
import { ElMessage } from "element-plus"
import { ref } from "vue"
//用户信息
let userMaindata = ref([])
const userMaindataMethods = (async (id: string) => {
    userMaindata.value = []
    const data = await getUserStudentMessageMain(id)
    if (data.code == 20000) {
        console.log(data.data);
        userMaindata.value = {...data.data}
    }
})
//小组信息
let groupMaindata = ref([])
const groupMaindataMethods = (async () => {
    groupMaindata.value = []
    const data = await getUsergroupMessageMain()
    if (data.code == 20000) {
        groupMaindata.value = data.data
    }

})
const updateDute=async(id)=>{
    const data =await turnDute(id)
    if(data.code==20000){
        ElMessage({
            message: '添加小组负责人成功',
            type: 'success',
          })
    }else{
        ElMessage({
            message: '添加小组负责人失败',
            type: 'error',
          })
    }
}
let leaveStudent = ref([])
//获取今天日期
const todayDate = (() => {
    const today = new Date()
    const dayToday = today.getDay()
    const yearToday = today.getFullYear()
    const monthToday = today.getMonth()
    return {
        dayToday,
        yearToday,
        monthToday
    }
})
const getStudentsAllLeave = (async (id: number) => {
    const leavesData = await getLeavesAll(id)
    const {
        dayToday,
        yearToday,
        monthToday
    }=todayDate()
    leaveStudent.value = []
    if (leavesData.code == 20000 && leavesData.data.length != 0) {
        leavesData.data.forEach((element: { date: { year: any; month: any; day: any }; createdTime: string | number | Date; leaveId: number }) => {
            element.date = spliceType(element.createdTime)
            if(element.date.year==yearToday && element.date.month==monthToday &&
                element.date.day==dayToday){
                    thisLeaveId.value=element.leaveId
            }
        });
        leaveStudent.value = [...leavesData.data]
    }
})
let thisLeaveId = ref(-1)
const spliceType = ((str: string | number | Date) => {
    if (!str) {
        return {
            year: 2024,
            month: 9,
            day:-1,
        }
    } else {
        const date = new Date(str);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return {
            year,
            month,
            day,
        }
    }
})
//id查询
let byIdLeavesData=ref({})
const byIDLeaves=(async(id:number)=>{
    const data=await getMessageLeavesByid(id)
    if(data.code==20000){
        byIdLeavesData.value={...data.data}
    }
})

//获取请假具体信息

export default {
    userMaindataMethods,
    userMaindata,
    groupMaindataMethods,
    groupMaindata,
    getStudentsAllLeave,
    leaveStudent,
    byIDLeaves,
    byIdLeavesData,
    thisLeaveId,
    updateDute
}