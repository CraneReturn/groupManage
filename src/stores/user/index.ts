import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "../../util/auth";
// 存储用户信息
type user = {
  token: string;
  userId: any;
  userType: string;
  userName: string;
  avatar: string;
  introduction: string;
};

export const userStore = defineStore("user", {
  state: (): user => {
    return {
      token: getToken(),
      userId: 0,
      userType: "",
      userName: "",
      avatar: "",
      introduction: "",
    };
  },
  actions: {
    // 封装login
    Logout() {
      return new Promise(() => {
        this.token = "";
        removeToken();
      });
    },
  },
  persist: true,
});
