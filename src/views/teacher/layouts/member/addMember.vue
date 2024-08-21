<template>
    <div>
        <!-- <el-button plain @click="userAddFlag = true">
            Click to open the Dialog
        </el-button> -->

        <el-dialog v-model="userAddFlag" title="添加小组新成员" width="500">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
                class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item label="姓名" prop="nickname">
                    <el-input v-model="ruleForm.nickname" />
                </el-form-item>
                <el-form-item label="年级" prop="grade">
                    <el-select v-model="ruleForm.grade" placeholder="请选择年级">
                        <el-option v-for="item in gradeDataAll" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-segmented v-model="ruleForm.sex" :options="locationOptions" />
                </el-form-item>
                <el-form-item label="学号" prop="account">
                    <el-input v-model="ruleForm.account" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="ruleForm.email" />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="ruleForm.phone" />
                </el-form-item>
                <el-form-item>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="userAddFlag = false">取消</el-button>
                    <el-button type="primary" @click="addNewUserGroup(ruleForm)">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
  
<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue'
import { addNewStudent } from "@/api/teacher/userManger"
import { type ComponentSize, ElMessage, type FormInstance, type FormRules } from 'element-plus'
import userTeacherMange from '@/views/teacher/api/userMange'
const { userAddFlag, getNewGrade, gradeDataAll,getAllUserMethods} = userTeacherMange
onBeforeMount(async () => {
    await getNewGrade()
})
interface RuleForm {
    nickname: string
    grade: string
    account: string
    phone: string,
    email: string,
    sex: string
}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    nickname: '',
    account: '',
    grade: '',
    phone: '',
    email: '',
    sex: '',
})

const locationOptions = ['男', '女']

const rules = reactive<FormRules<RuleForm>>({
    nickname: [
        { required: true, message: '请输入小组新成员姓名', trigger: 'blur' },
        { min: 2, max: 5, message: '名字长度在2-5', trigger: 'blur' },
    ],
    grade: [
        {
            required: true,
            message: '请选择所属年级',
            trigger: 'change',
        },
    ],
    account: [
        { required: true, message: '请输入小组新成员学号', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入11位学号', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: '请选择小组新成员性别', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入小组新成员手机号', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入小组新成员邮箱', trigger: 'blur' },
    ],
})
const addNewUserGroup = (async (ruleform: RuleForm) => {
    const { nickname, account, grade, phone, email, sex } = ruleform;

    // 正则表达式验证手机号
    const phoneRegex = /^1[3-9]\d{9}$/;
    const isValidPhone = phoneRegex.test(phone);

    // 正则表达式验证电子邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (nickname === '' || account === '' || grade === '' || phone == '' || email == '' || sex === '') {
        ElMessage({
            message: '请填写完整新成员信息',
            type: 'error',
        });
    } else if (isValidPhone && isValidEmail) {
        const data = await addNewStudent(ruleform)
        if(data.code==20000){
            ElMessage({
            message: '添加新成员成功',
            type: 'success',
        })
        await getAllUserMethods()
        userAddFlag.value=false
        
        }else{
            ElMessage({
            message: '添加新成员失败',
            type: 'error',
        })
        }


    } else {
        if (!isValidPhone) {
            ElMessage({
                message: '手机号格式不正确',
                type: 'error',
            });
        } else if (!isValidEmail) {
            ElMessage({
                message: '电子邮箱格式不正确',
                type: 'error',
            });
        }
    }
});


</script>