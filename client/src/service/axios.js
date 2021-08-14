import axios from "axios";
import Vue from "vue";
const api = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    Accept: "application/json",
    "x-token": localStorage.getItem("token"),
  },
});

Vue.prototype.$api = api;

Vue.prototype.$endpoint = {
  LOGIN: "/employee/login",
  REGISTER: "/employee/register",
  GET_ALL_EMPLOYEES: "/employee",
  DELETE_EMPLOYEE: "/employee/delete",
  UPDATE_EMPLOYEE: "/employee/update",
  REQUEST_REVIEW: "/review/request",
  GET_ALL_REVIEWS_BY_EMPLOYEE: "/review/getByEmpId",
  DELETE_REVIEW: "/review/delete",
  SUBMIT_REVIEW: "/review/submit",
  PROCESS_REVIEW: "/review/process",
};
