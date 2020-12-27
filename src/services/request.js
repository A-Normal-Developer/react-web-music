import axios from "axios";

import { BASE_URL, TIME_OUT } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});


instance.interceptors.request.use(config => {
  return config;
}, error => {

});

instance.interceptors.response.use(res => {
  return res.data;
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        console.log("请求错误");
        break;
      case 401:
        console.log("未授权访问");
        break;
      default:
        console.log("其他错误信息")
    }
  }

  return error;
});

export default instance;


