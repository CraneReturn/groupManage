import { userStore } from "@/stores";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/teacher",
      name: "教师",
      component: () => import("@/views/teacher/index.vue"),
      redirect: "/teacher/info",
      children: [
        {
          path: "message",
          name: "消息",
          component: () => import("@/views/teacher/layouts/message/index.vue"),
        },
        {
          path: "member",
          name: "人员管理",
          component: () => import("@/views/teacher/layouts/member/index.vue"),
        },
        {
          path: "info",
          name: "小组信息",
          component: () =>
            import("@/views/teacher/layouts/groupInfo/index.vue"),
        },
        {
          path: "person",
          name: "学生信息",
          component: () => import("@/views/teacher/person.vue"),
        },
        {
          path: "attend",
          name: "请假管理",
          component: () => import("@/views/teacher/layouts/member/attend.vue"),
        },
        {
          path: "messageInfo",
          name: "信息详情",
          component: () =>
            import("@/views/teacher/layouts/message/messageInfo.vue"),
        },
        {
          path: "quit",
          name: "退组管理",
          component: () => import("@/views/teacher/layouts/member/leave.vue"),
        },
      ],
    },
    {
      path: "/student",
      name: "student",
      component: () => import("@/views/Student/index.vue"),
      redirect: "/student/group",
      children: [
        {
          path: "groupList",
          name: "groupList",
          component: () => import("@/views/Student/groupList.vue"),
        },
        {
          path: "leave",
          name: "leave",
          component: () => import("@/views/Student/leave.vue"),
        },
        {
          path: "userCenter",
          name: "userCenter",
          component: () => import("@/views/Student/userCenter.vue"),
        },
        {
          path: "group",
          name: "group",
          component: () => import("@/views/Student/group.vue"),
        },
      ],
    },
    {
      path: "/superAdmin",
      name: "superAdmin",
      component: () => import("@/views/superAdmin/index.vue"),
      children: [
        {
          path: "analysis",
          name: "控制台",
          component: () =>
            import("@/views/superAdmin/layouts/Dashboard/Analysis.vue"),
        },
        {
          path: "allGroups",
          name: "已成立小组",
          component: () =>
            import(
              "@/views/superAdmin/layouts/allGroupsAdmin/allGroupsAdmin.vue"
            ),
        },
        {
          path: "allTeachers",
          name: "教师管理",
          component: () =>
            import(
              "@/views/superAdmin/layouts/allTeachersAdmin/allTeachersAdmin.vue"
            ),
        },
        {
          path: "groupReview",
          name: "待审核小组",
          component: () =>
            import("@/views/superAdmin/layouts/groupReview/groupReview.vue"),
        },
        {
          path: "outGroup",
          name: "未通过审核小组",
          component: () =>
            import("@/views/superAdmin/layouts/groupReview/outGroup.vue"),
        },
        {
          path: "repairReview",
          name: "报修审核",
          component: () =>
            import("@/views/superAdmin/layouts/repairReview/repairReview.vue"),
        },
        {
          path: "groupStudents",
          name: "小组学生",
          component: () =>
            import(
              "@/views/superAdmin/layouts/allGroupsAdmin/components/groupStudents.vue"
            ),
        },
        {
          path: "userCenter",
          name: "个人中心",
          component: () => import("@/views/superAdmin/layouts/userCenter/userCenter.vue"),
        },
      ],
    },
  ],
});
type UserType = "0" | "1" | "2" | "3";

const rolePaths: Record<UserType, string> = {
  "0": "/student",
  "1": "/student",
  "2": "/teacher",
  "3": "/superAdmin",
};

router.beforeEach((to, from, next) => {
  const store = userStore();
  const loginStatus = store.token;
  const userType = store.userType as UserType;

  const authPages = ["/teacher", "/student", "/superAdmin"];

  if (to.path === "/") {
    if (loginStatus) {
      const redirectPath = rolePaths[userType];
      if (redirectPath) {
        next({ path: redirectPath });
      } else {
        next({ path: "/" });
      }
    } else {
      next();
    }
  } else if (authPages.some((page) => to.path.startsWith(page))) {
    if (loginStatus) {
      const allowedPath = rolePaths[userType];
      if (allowedPath && to.path.startsWith(allowedPath)) {
        next();
      } else {
        next({ path: allowedPath || "/" });
      }
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router;
