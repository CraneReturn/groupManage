import service from '@/util/request'

export function getAllUser(pageNum:number,pageSize:number) {   
    return service({
      url: `/teacher/getStudents?pageCount=${pageNum}&pageSize=${pageSize}`,
      method: "get",
      headers: {
        isToken: true,
      },
    });
  }