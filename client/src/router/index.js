import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/LogIn.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/LogOut.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/HomeLayout.vue"),
    children: [
      {
        path: "employees",
        name: "employees",
        component: () => import("../views/Admin/EmployeesList.vue"),
      },
      {
        path: "reviews/:id/:name",
        name: "reviews",
        component: () => import("../views/Admin/ReviewList.vue"),
      },
    ],
  },
  {
    path: "/employee",
    name: "employee",
    component: () => import("../views/HomeLayout.vue"),
    children: [
      {
        path: "feedback/:id",
        name: "feedback",
        component: () => import("../views/Employee/FeedBackList.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
