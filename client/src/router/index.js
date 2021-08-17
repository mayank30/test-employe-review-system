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
        path: "add-employee",
        name: "add-employee",
        component: () => import("../views/Admin/AddEmployees.vue"),
      },
      {
        path: "employees",
        name: "employees",
        component: () => import("../views/Admin/EmployeesList.vue"),
      },
      {
        path: "add-review",
        name: "add-review",
        component: () => import("../views/Admin/AddReview.vue"),
      },
      {
        path: "review",
        name: "review",
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
        path: "submit-feedBack",
        name: "submit-feedBack",
        component: () => import("../views/Employee/SubmitFeedBack.vue"),
      },
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
