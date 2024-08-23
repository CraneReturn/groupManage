import { getUserStudentMessageMain, getUsergroupMessageMain, getLeavesAll } from "@/api/teacher/userManger"
import { ref } from "vue"
//用户信息
let userMaindata = ref([])
const userMaindataMethods = (async (id: string) => {
    userMaindata.value = []
    const data = await getUserStudentMessageMain(id)
    if (data.code == 20000) {
        userMaindata.value = data.data
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
let leaveStudent = ref([])
const getStudentsAllLeave = (async (id: number) => {
    const leavesData = await getLeavesAll(id)
    leaveStudent.value = []
    if (leavesData.code == 20000 && leavesData.data.length != 0) {
        leavesData.data.forEach(element => {
            element.date=spliceType(element.createdTime)
        });
        leaveStudent.value = [...leavesData.data]
    }
})
const spliceType = ((str: string | number | Date) => {
    if (!str) {
        return {
            year: 2024,
            month: 9,
            day: 1,
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
//获取请假具体信息

export default {
    userMaindataMethods,
    userMaindata,
    groupMaindataMethods,
    groupMaindata,
    getStudentsAllLeave,
    leaveStudent
}
