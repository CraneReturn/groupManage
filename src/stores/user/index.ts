import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "../../util/auth";
import { login, getGroupInfo, getUserInfo } from "@/api/login";
import { jwtDecode } from "jwt-decode";
import router from "@/router";
// 存储用户信息
type user = {
  token: string;
  userType: string;
  userName: string;
  avatar: string;
  email: string;
  phone: string;
  sex: string;
  collage: string;
  ownClass: string;
  speciality: string;
  account: string;
  groupId: number;
};

interface userRight {
  exp: number;
  role: string;
  userId: string;
  username: string;
}

export const userStore = defineStore("user", {
  state: (): user => {
    return {
      token: getToken(),
      userType: "",
      userName: "",
      avatar: "",
      email: "",
      phone: "",
      sex: "",
      collage: "",
      ownClass: "",
      speciality: "",
      account: "",
      groupId: 0,
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
            const userInfo: userRight = jwtDecode(response.data);
            this.userType = userInfo.role.replace(/[\[\]']/g, "");
            // 获取用户信息
            this.UserInfo();
            this.GroupInfo();

            if (this.userType === "2") {
              router.push("/teacher");
            }
          }
        });
      });
    },
    // 获取用户/小组信息
    GroupInfo() {
      return new Promise(() => {
        getGroupInfo().then((response) => {
          if (response) {
            console.log(response);
          }
        });
      });
    },
    UserInfo() {
      return new Promise(() => {
        getUserInfo().then((response) => {
          if (response) {
            const {
              nickname,
              avater,
              collage,
              email,
              sex,
              speciality,
              account,
              ownClass,
            } = response.data;
            this.userName = nickname;
            this.avatar = avater;
            this.collage = collage;
            this.sex = sex;
            this.email = email;
            this.speciality = speciality;
            this.account = account;
            this.ownClass = ownClass;
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
