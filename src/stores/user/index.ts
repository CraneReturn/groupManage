import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "../../util/auth";
import { login, getGroupInfo, getUserInfo } from "@/api/login";
import { jwtDecode } from "jwt-decode";
import router from "@/router";
import defultAvater from "@/assets/image/defult.webp";
// 存储用户信息
type user = {
  token: string;
  userType: UserType | string;
  userName: string;
  avatar: string;
  email: string;
  phone: string;
  sex: string;
  collage: string;
  ownClass: string;
  speciality: string;
  account: string;
  groupData: group;
};
interface group {
  groupId: number;
  groupName: string;
  groupAddress: string;
  groupIntro: string;
  status?: number;
}
interface userRight {
  exp?: number;
  role: string;
  userId: string;
  username: string;
}
type UserType = "0" | "1" | "2" | "3";

const rolePaths: Record<UserType | string, string> = {
  "0": "/student",
  "1": "/student",
  "2": "/teacher",
  "3": "/superAdmin",
};
export const userStore = defineStore("user", {
  state: (): user => {
    return {
      token: getToken() || "",
      userType: "",
      userName: "",
      avatar: defultAvater,
      email: "",
      phone: "",
      sex: "",
      collage: "",
      ownClass: "",
      speciality: "",
      account: "",
      groupData: {
        groupId: 0,
        groupName: "",
        groupAddress: "",
        groupIntro: "",
      },
    };
  },
  actions: {
    // 封装login
    Login(account: string, password: string) {
      return new Promise(() => {
        login(account, password).then((response) => {
          if (response) {
            console.log(response);
            setToken(response.data);
            this.token = response.data;
            const userInfo: userRight = jwtDecode(response.data);
            this.userType = userInfo.role.replace(/[\[\]']/g, "");
            // 获取用户信息
            this.UserInfo();
            this.GroupInfo();
            if (this.userType) {
              const pushPath = rolePaths[this.userType];
              router.push(pushPath);
            }
          }
        });
      });
    },
    // 获取用户/小组信息
    GroupInfo() {
      return new Promise(() => {
        getGroupInfo().then((response) => {
          if (response.data) {
            this.groupData.groupAddress = response.data.groupAddress;
            this.groupData.groupName = response.data.groupName;
            this.groupData.groupIntro = response.data.groupIntro;
            this.groupData.groupId = response.data.groupId;
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
        router.push("/");
      });
    },
  },
  persist: true,
});
