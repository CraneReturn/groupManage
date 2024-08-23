import service from "@/util/request";
// 小组相关
// 申请小组
export function addGroup(obj: object) {
  let data = {
    groupAddress: "",
    groupIntro: "",
    groupName: "",
  };
  data = { ...data, ...obj };
  return service({
    data: data,
    url: `user/login`,
    method: "post",
  });
}
// 查看小组申请进度
export function getSchedule() {
  return service({
    url: `teacher/getGroupApply`,
    method: "get",
  });
}
