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
//请假信息
export function getLeaves(page:number,pageSize:number) {
  return service({
    url: `/head/getLeaves?page=${page}&size=${pageSize}`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
export function getLeavesType(page:number,pageSize:number,status:number) {
  return service({
    url: `/head/getLeaves?page=${page}&size=${pageSize}&status=${status}`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
//获取当前用户信息
export function getUserStudentMessageMain(id:string){
  return service({
    url: `/head/getUserById?id=${id}`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
//小组信息
//获取当前用户信息
export function getUsergroupMessageMain(){
  return service({
    url: `/user/getOwnGroupInfo`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
//获取请假信息并做处理
export function getLeavesAll(id:number){
  return service({
    url: `/head/getLeaveRecords?用户id=${id}`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
//id查询
export function getMessageLeavesByid(id:number){
  return service({
    url: `/head/getLeaveById?请假id=${id}`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
//转让负责人
export function turnDute(id:number){
  console.log(id);
  debugger
  
  return service({
    url: `/teacher/selectStudent?userId=${id}`,
    method: "put",
    headers: {
      isToken: true,
    },
  });
}