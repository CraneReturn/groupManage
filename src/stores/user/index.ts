import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "../../util/auth";
import { login } from "@/api/login";
import { jwtDecode } from "jwt-decode";
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
    Login(account: string, password: string) {
      return new Promise(() => {
        login(account, password).then((response) => {
          if (response) {
            setToken(response.data);
            this.token = response.data;
            const userInfo = jwtDecode(response.data);
            console.log(userInfo);
          }
        });
      });
    },
    Logout() {
      return new Promise(() => {
        this.token = "";
        removeToken();
      });
    },
  },
  persist: true,
});
