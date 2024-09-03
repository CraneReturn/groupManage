import { reactive, ref, watch } from "vue";
import { searchLeavesSend, allLeavesSend, getUserMessageSend } from "@/api/teacher/userManger"
import { ElMessage } from "element-plus";
//请假管理
const leavepage = ref<number>(1)
let leaveallpage = ref<number>(1)
let leavesdata = ref([])
const sendNickName = ref('')
//获取小组请假信息
const getStudentLeave = (async () => {
    
    const allData = await allLeavesSend(leavepage.value, 10);
    if (allData.code == 20000) {
        leavesdata.value=[]
        leaveallpage.value = allData.data.pages;
    
        // if (allData.data.records.length !== 0) {
        //     const promises = allData.data.records.map(async (leaves) => {
        //         const id = leaves.userId;
        //         const leaveUserMessage = await getUserMessageByid(id);
        //         leaves.userMessage = { ...leaveUserMessage };
        //     });
        //     await Promise.all(promises);
        // }
        leavesdata.value = [...allData.data];
    

    } else {
        leavesdata.value = [];
    }
})
const searchLeaves = (async () => {
    if (sendNickName.value == '') {
        ElMessage.error('请先输入你想搜索的学生姓名')
    } else {
        leavepage.value = 1
        const searchData = await searchLeavesSend(sendNickName.value, leavepage.value, 10)
        leavesdata.value=[]
        leaveallpge.value = searchData.data.pages;
        if (searcahData.code == 20000) {
            // if (searchData.data.records.length !== 0) {
            //     const promises = searchData.data.records.map(async (leaves) => {
            //         const id = leaves.userId;
            //         const leaveUserMessage = await getUserMessageByid(id);
            //         leaves.userMessage = { ...leaveUserMessage };
            //     });
            //     await Promise.all(promises);
            // }
            leavesdata.value = [...searchData.data];

        } else {
            leavesdata.value = []
        }
    }
})
const getUserMessageByid = (async (id: number) => {
    let userMessage = {}
    const newdata = await getUserMessageSend(id)
    if (newdata.code == 20000) {
        userMessage = newdata.data
    }
    return userMessage
})

const getNewAllData=async()=>{
    leaveallpage.value=1;
    sendNickName.value = ''
    await getStudentLeave()

}
export default {
    leavepage,
    leavesdata,
    leaveallpage,
    getStudentLeave,
    searchLeaves,
    sendNickName,
    getNewAllData
}