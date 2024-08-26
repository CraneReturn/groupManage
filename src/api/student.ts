import service from "@/util/request";

//获取小组信息
export function getOwnGroupInfo() {
  return service({
    url: `/user/getOwnGroupInfo`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

//获取用户信息
export function getOwnInfo() {
  return service({
    url: `/user/getOwnInfo`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

//获取请假记录
export function getLeaveRecords(pageNum: number, pageSize: number) {
  return service({
    params: { pageNum, pageSize },
    url: `/user/getLeaveRecords`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      isToken: true,
    },
  });
}

//上传图片
export function upImg(formData: FormData) {
  return service({
    url: `/user/upImg`,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      isToken: true,
    },
  });
}

//上传头像
export function upavatar(avatar: string) {
  return service({
    url: `/user/updateInfo`,
    method: "put",
    data: {
      avatar,
    },
    headers: {
      "Content-Type": "application/json",
      isToken: true,
    },
  });
}

//修改个人信息
export function updateInfo(
  nickname: string,
  college: string,
  speciality: string,
  ownClass: string,
  phone: string,
  sex: string
) {
  return service({
    url: `/user/updateInfo`,
    method: "put",
    data: {
      nickname,
      college,
      speciality,
      ownClass,
      phone,
      sex,
    },
    headers: {
      "Content-Type": "application/json",
      isToken: true,
    },
  });
}

//修改密码
export function updatePassword(newPassword: string, oldPassword: string) {
  return service({
    url: `/user/updatePassword`,
    method: "put",
    params: {
      newPassword,
      oldPassword,
    },
    headers: {
      isToken: true,
    },
  });
}

//发送验证码
export function sendCode(email:string) {
  return service({
    url: `/user/sendCode`,
    method: "get",
    params: {
      codeType: 1,
      email,
    },
    headers: {
      isToken: true,
    },
  });
}

//绑定邮箱
export function addEmail(code:string ,email:string) {
  return service({
    url: `/user/addEmail`,
    method: "post",
    params: {
      code,
      email,
    },
    headers: {
      isToken: true,
    },
  });
}

//请假
export function leave(reason:string ,leaveType:string,startDate:string,endDate:string) {
  return service({
    url: `/user/leave`,
    method: "post",
    data: {
      reason,
      leaveType,
      startDate,
      endDate
    },
    headers: {
      "Content-Type": "application/json",
      isToken: true,
    },
  });
}
