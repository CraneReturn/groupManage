import service from "@/util/request";

export function getOwnGroupInfo() {
  return service({
    url: `/user/getOwnGroupInfo`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}

export function getOwnInfo() {
  return service({
    url: `/user/getOwnInfo`,
    method: "get",
    headers: {
      isToken: true,
    },
  });
}
