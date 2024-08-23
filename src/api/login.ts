import service from "@/util/request";
export function login(account: string, password: string) {
  return service({
    params: { account, password },
    url: `user/login`,
    method: "post",
    headers: {
      isToken: false,
    },
  });
}
// 查看小组信息
export function getGroupInfo() {
  return service({
    url: `user/getOwnGroupInfo`,
    method: "get",
  });
}
// 获取用户信息
export function getUserInfo() {
  return service({
    url: `user/getOwnInfo`,
    method: "get",
  });
}
// 修改密码
export function changeUserPassword(obj: object) {
  let data = {
    oldPassword: "",
    newPassword: "",
  };
  data = { ...data, ...obj };
  return service({
    data: data,
    url: `user/updatePassword`,
    method: "put",
  });
}
// 发送验证码
export function sendCode(obj: object) {
  let params = {
    codeType: "",
    email: "",
  };
  params = { ...params, ...obj };
  return service({
    params: params,
    url: `user/sendCode`,
    method: "get",
  });
}
