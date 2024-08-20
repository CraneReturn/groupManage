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
