import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
      path: "/teacher",
      name: "teacher",
      component: () => import("@/views/teacher/index.vue"),
      children: [
        {
          path: "message",
          name: "message",
          component: () => import("@/views/teacher/layouts/message/index.vue"),
        },
        {
          path: "member",
          name: "member",
          component: () => import("@/views/teacher/layouts/member/index.vue"),
        },
        {
          path: "info",
          name: "info",
          component: () => import("@/views/teacher/layouts/groupInfo/index.vue"),
        },
        {
          path: "person",
          name: "person",
          component: () => import("@/views/teacher/person.vue"),
        },
        {
          path: "attend",
          name: "attend",
          component: () => import("@/views/teacher/layouts/member/attend.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/superAdmin',
      name:'superAdmin',
      component: () => import("@/views/superAdmin/index.vue"),
      children:[
        {
          path:"allGroups",
          name:'allGroups',
          component: ()=>import('@/views/superAdmin/layouts/allGroupsAdmin/allGroupsAdmin.vue'),
        },
        {
          path:"allTeachers",
          name:'allTeachers',
          component: ()=>import('@/views/superAdmin/layouts/allTeachersAdmin/allTeachersAdmin.vue'),
        },
        {
          path:"groupReview",
          name:"groupReview",
          component: ()=>import('@/views/superAdmin/layouts/groupReview/groupReview.vue'),

        },
        {
          path:"repairReview",
          name:"repairReview",
          component: ()=>import('@/views/superAdmin/layouts/repairReview/repairReview.vue'),
        },
        {
          path:'groupStudents',
          name:'groupStudents',
          component: ()=>import('@/views/superAdmin/layouts/allGroupsAdmin/components/groupStudents.vue')
        }
      ]
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: () => import('@/views/Dashboard/Analysis.vue'),
    }
  ],
});

export default router;
