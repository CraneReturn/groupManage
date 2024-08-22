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
