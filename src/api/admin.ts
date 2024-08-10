import service from '@/util/request'

// 查看小组信息
export function getGroup(groupName:any,pageNum:any,pageSize:any,status:any){
    return service({
        url:`/admin/getGroup?groupName=${groupName}&pageNum=${pageNum}&pageSize=${pageSize}&status=${status}`,
        method:"get",
    })
}
// 查看小组所有学生
export function getGroupStu(){
    return service({
        url:'/admin/getGroupStu',
        method:"get",
    })
}
// 修改小组基本信息
export function putGroup(){
    return service({
        url:'/admin/putGroup',
        method:"put",
    })
}

// 查看所有老师
export function getTea(){
    return service({
        url:'/admin/getTea',
        method:"get",
    })
}

// 导入老师
export function uploadTea(){
    return service({
        url:'/admin/uploadTea',
        method:"post",
    })
}

// 修改老师信息
export function putTea(){
    return service({
        url:'/admin/put',
        method:"put",
    })
}

// 删除教师
export function del(){
    return service({
        url:'/admin/del',
        method:"delete",
    })
}
// 查看报修记录
export function getRepair(){
    return service({
        url:'/admin/getRepair',
        method:"get",
    })
}