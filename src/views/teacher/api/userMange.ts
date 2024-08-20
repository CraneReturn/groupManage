import { getAllUser } from "@/api/teacher/userManger"
import { reactive, ref } from "vue"

const userPage=ref<number>(1)
//获取用户列表
let userData=reactive([])
const getAllUserMethods=(async()=>{
    userData=await getAllUser(1,10)
})
export default {
    userPage,
    getAllUserMethods,
    userData
}