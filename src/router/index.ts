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
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: '/superAdmin',
      component: () => import("@/views/superAdmin/index.vue"),
      children:[
        {
          path:"/allGroups",
          component: ()=>import('@/views/superAdmin/layouts/allGroupsAdmin/allGroupsAdmin.vue'),
        },
        {
          path:"/allTeachers",
          component: ()=>import('@/views/superAdmin/layouts/allTeachersAdmin/allTeachersAdmin.vue'),
        },
        {
          path:"/groupReview",
          component: ()=>import('@/views/superAdmin/layouts/groupReview/groupReview.vue'),
        },
        {
          path:"/repairReview",
          component: ()=>import('@/views/superAdmin/layouts/repairReview/repairReview.vue'),
        },
      ]
    }
  ],
});

export default router;
