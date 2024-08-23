import { reactive, ref } from "vue";
import { getLeaves } from "@/api/teacher/userManger"
//请假管理
const leavepage=ref<number>(1)
let leaveallpage=ref<number>(1)
let leavesdata=ref([])
//获取小组请假信息
const getStudentLeave=(async()=>{
    const data=await getLeaves(leavepage.value,10)
    leavesdata.value=[]
    if(data.code==20000){
        leavesdata.value=[...data.data.records]
        leaveallpage.value=data.data.pages
    }
})

export default{
    leavepage,
    leavesdata,
    leaveallpage,
    getStudentLeave
}