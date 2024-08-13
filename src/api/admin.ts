import service from '@/util/request'
import type { GroupUpdateDTO } from '@/types/GroupUpdateDTO'
// 查看小组信息
export function getGroup(groupName:any,pageNum:any,pageSize:any,status:any){
    if(groupName==''&&status==''){
        return service({
            url:`/admin/getGroup?&pageNum=${pageNum}&pageSize=${pageSize}`,
            method:"get",
        })
    }
    else{
        if(groupName!=''&&status==''){
            return service({
                url:`/admin/getGroup?groupName=${groupName}&pageNum=${pageNum}&pageSize=${pageSize}`,
                method:"get",
            })
        }else{
            return service({
                url:`/admin/getGroup?groupName=${groupName}&pageNum=${pageNum}&pageSize=${pageSize}&status=${status}`,
                method:"get",
            })
        }
    }
}
// 查看小组所有学生
export function getGroupStu(groupId:any,pageNum:any,pageSize:any){
    return service({
        url:`/admin/getGroupStu?groupId=${groupId}&pageNum=${pageNum}&pageSize=${pageSize}`,
        method:"get",
    })
}
// 修改小组基本信息
export function putGroup(groupUpdateDTO:GroupUpdateDTO){
    console.log('groupUpdateDTO',groupUpdateDTO);
    
    return service({
        url:'/admin/putGroup',
        method:"put",
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
        data: groupUpdateDTO,
    })
}

// 查看所有老师
export function getTea(account:any,nickname:any,pageNum:any,pageSize:any){
    if(account==''&&nickname==''){
        return service({
            url:`/admin/getTea?pageNum=${pageNum}&pageSize=${pageSize}`,
            method:"get",
        })
    }else{
         if(account==''&&nickname!=''){
            return service({
                url:`/admin/getTea?nickname=${nickname}&pageNum=${pageNum}&pageSize=${pageSize}`,
                method:"get",
            })
        }else{
            return service({
                url:`/admin/getTea?account=${account}&pageNum=${pageNum}&pageSize=${pageSize}`,
                method:"get",
            })
        }

    }

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
export function del(ids:any){
    const idsParam=ids.map(id=>`ids=${id}`).join('&');
    return service({
        url:`/admin/del?${idsParam}`,
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