import { getAllUser, getGrade } from "@/api/teacher/userManger"
import { ElMessage } from "element-plus"
import { reactive, ref, watch } from "vue"

const userPage = ref<number>(1)
let alluserpage = ref<number>()
let alluserData = ref([])
let gradeDataAll = ref([])

//获取用户列表
const getAllUserMethods = (async () => {
    const data = await getAllUser(userPage.value, 10)
    alluserpage.value = data.data.pages
    alluserData.value = []
    alluserData.value.push(...data.data.records)
})
const userAddFlag = ref<boolean>(false)
const wholeStudentDataX = ref<any>([])
const wholeStudentY = <any>ref([])
//在校人员
const stayStudent = ref([])
const getNewGrade = (async () => {
    const gradeData = await getGrade()
    gradeDataAll.value = []
    wholeStudentDataX.value = []
    wholeStudentY.value = []
    if (gradeData.code == 20000 && gradeData.data.length != 0) {
        const addValue: any[] = []
        const getWholeDatax: any[] = []
        const getWholeDatay: any[] = []
        gradeData.data.forEach(g => {
            getWholeDatax.push(g.grade)
            getWholeDatay.push(g.count)
            addValue.push({ value: g.grade, label: g.grade })
        });
        gradeDataAll.value.push(...addValue)
        wholeStudentDataX.value.push(...getWholeDatax)
        wholeStudentY.value.push(...getWholeDatay)
    } else {
        gradeDataAll.value = []
    }
    return null
})
watch(userPage, (newValue, oldValue) => {
   if(newValue!==oldValue){
    getAllUserMethods()
   }
  });
interface RuleForm {
    nickname: string
    grade: string
    account: string
    phone: string,
    email: string,
    sex: string
}
export default {
    userPage,
    getAllUserMethods,
    alluserpage,
    alluserData,
    userAddFlag,
    getNewGrade,
    gradeDataAll,
    wholeStudentDataX,
    wholeStudentY
}