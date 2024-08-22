import service from '@/util/request'
import type { GroupUpdateDTO } from '@/types/GroupUpdateDTO'
// 查看小组信息
export function getGroup(groupName:any,pageNum:any,pageSize:any,status:any){
            if(groupName==''&&status!=''){
                return service({
                    url:`/admin/getGroup?pageNum=${pageNum}&pageSize=${pageSize}&status=${status}`,
                    method:"get",
                    headers: {
                        isToken: true,
                      },
                })
            }else{
                return service({
                    url:`/admin/getGroup?groupName=${groupName}&pageNum=${pageNum}&pageSize=${pageSize}&status=${status}`,
                    method:"get",
                    headers: {
                        isToken: true,
                      },
                })
            }
    }
// 查看小组所有学生
export function getGroupStu(groupId:any,pageNum:any,pageSize:any){
    return service({
        url:`/admin/getGroupStu?groupId=${groupId}&pageNum=${pageNum}&pageSize=${pageSize}`,
        method:"get",
        headers: {
            isToken: true,
          },
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
            isToken: true,
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
            headers: {
                isToken: true,
              },
        })
    }else{
         if(account==''&&nickname!=''){
            return service({
                url:`/admin/getTea?nickname=${nickname}&pageNum=${pageNum}&pageSize=${pageSize}`,
                method:"get",
                headers: {
                    isToken: true,
                  },
            })
        }else{
            return service({
                url:`/admin/getTea?account=${account}&pageNum=${pageNum}&pageSize=${pageSize}`,
                method:"get",
                headers: {
                    isToken: true,
                  },
            })
        }

    }

}

// 导入老师
export function uploadTea(file:any){
    // 创建一个FormData对象
    const formData=new FormData();
    formData.append('file',file);
    return service({
        url:'/admin/uploadTea',
        method:"post",
        headers:{
            'Content-Type':'multipart/form-data',
            isToken: true,
        },
        data:formData
    })
}

// 修改老师信息
export function putTea(){
    return service({
        url:'/admin/put',
        method:"put",
        headers: {
            isToken: true,
          },
    })
}

// 删除教师
export function del(ids:any){
    const idsParam=ids.map(id=>`ids=${id}`).join('&');
    return service({
        url:`/admin/del?${idsParam}`,
        method:"delete",
        headers: {
            isToken: true,
          },
    })
}
// 查看报修记录
export function getRepair(groupName:any,pageNum:any,pageSize:any){
    if(groupName==''){
        return service({
            url:`/admin/getRepair?pageNum=${pageNum}&pageSize=${pageSize}`,
            method:"get",
            headers: {
                isToken: true,
              },
        })
    }else{
        return service({
            url:`/admin/getRepair?groupName=${groupName}&pageNum=${pageNum}&pageSize=${pageSize}`,
            method:"get",
            headers: {
                isToken: true,
              },
        })
    }
}

// 审核小组申请
export function auditGroup(groupId:any,reason:any,status:any){
    return service({
        url:`/admin/auditGroup?groupId=${groupId}&reason=${encodeURIComponent(reason)}&status=${status}`,
        method:"put",
        headers: {
            isToken: true,
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
    })
}