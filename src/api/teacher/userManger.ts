import service from '@/util/request'

export function getAllUser(pageNum: number, pageSize: number) {
  return service({
    url: `/teacher/getStudents?pageCount=${pageNum}&pageSize=${pageSize}`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
export function getSample() {
  return service({
    url: `/teacher/getSample`,
    method: "get",

    headers: {
      isToken: true,
    },
    responseType: 'blob'
  });
}
export function uploadUserfile(file: string | Blob) {
  const formdata = new FormData();
  formdata.append('file', file)
  
  return service({
    url: `/teacher/uploadStudent`,
    method: "post",
    data: formdata,
    headers: {
      'Content-Type': "multipart/form-data",
      isToken: true,
    },
  
  });
}
//获取年级人数
export function getGrade() {
  return service({
    url: `/teacher/getGrade`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
export function addNewStudent(ruleform: any) {
  return service({
    url: `/teacher/addStudent`,
    method: "post",
    headers: {
      isToken: true,
    },
    data:ruleform
  });
}