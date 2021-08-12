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
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "add-employees",
        name: "add-employees",
        component: () => import("../views/Admin/AddEmployees.vue"),
      },
      {
        path: "employees-list",
        name: "employees-list",
        component: () => import("../views/Admin/EmployeesList.vue"),
      },
      {
        path: "add-review",
        name: "add-review",
        component: () => import("../views/Admin/AddReview.vue"),
      },
      {
        path: "review-list",
        name: "review-list",
        component: () => import("../views/Admin/ReviewList.vue"),
      },
    ],
  },
  {
    path: "/employee",
    name: "employee",
    component: () => import("../views/Employee.vue"),
    children: [
      {
        path: "submit-feedBack",
        name: "submit-feedBack",
        component: () => import("../views/Employee/SubmitFeedBack.vue"),
      },
      {
        path: "feedback-list",
        name: "feedback-list",
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
