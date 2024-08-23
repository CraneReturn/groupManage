import service from "@/util/request";

export function getLeave(obj: object) {
  let params = {
    pageCount: 1,
    pageSize: 5,
    status: "",
  };
  params = { ...params, ...obj };
  return service({
    params: params,
    url: `teacher/getLeaveStudent`,
    method: "get",
  });
}

export function evaluateStudent(obj: object) {
  let data = {
    evaluate: "",
    id: "",
    status: "",
  };
  data = { ...data, ...obj };
  return service({
    data: data,
    url: `teacher/evaluateStudent`,
    method: "put",
  });
}
