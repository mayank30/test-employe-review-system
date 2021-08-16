import axios from "axios";
import Vue from "vue";
const api = axios.create({
  baseURL: "http://193.34.145.233:5001/api",
  headers: getHeaders(),
});

function getHeaders() {
  const headers = {
    Accept: "application/json",
  };
  if (localStorage.getItem("token") != null) {
    headers["x-token"] = localStorage.getItem("token");
  }
  return headers;
}

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
