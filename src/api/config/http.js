import axios from "axios";
import router from "@/router";
import store from "@/store";
import { Message, Loading } from "element-ui";
import _ from "lodash";

let loadingInstance;
let loadingCount = 0;

const BASE_URL = process.env.VUE_APP_API_URL;

//注意，最新版本的axios无法自定义config的属性值，所以建议安装0.18.0的axios，可以自由添加config的属性值
// 创建axios实例
const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000 // 请求超时时间
});

function startLoading() {
  if (loadingCount === 0) {
    // 开始加载
    loadingInstance = Loading.service({
      lock: true,
      text: "数据加载中，请稍后...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
  }
  loadingCount++;
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
const toHideLoading = _.debounce(() => {
  if (loadingCount <= 0) {
    loadingInstance.close();
    //loadingInstance = null;
  }
}, 300);

function endLoading() {
  if (loadingCount <= 0) return;
  loadingCount--;
  if (loadingCount === 0) {
    // 结束加载
    toHideLoading();
  }
}

// 添加request拦截器--请求拦截
http.interceptors.request.use(
  config => {
    if (config.options.loading) {
      startLoading();
    }
    return config;
  },
  error => {
    //store.dispatch('common/set_loading', false);
    loadingCount = 0;
    endLoading();

    return Promise.reject(error);
  }
);
// 添加respone拦截器--拦截响应
http.interceptors.response.use(
  response => {
    if (response.config.options.loading) {
      endLoading();
    }
    //http请求OK
    if (response.status == 200) {
      if (response.config.responseType === "blob") {
        // 下载文件接口返回的二进制码
        return Promise.resolve(response.data); //直接返回data字段中的数据
      } else if (response.data.code == 200) {
        //业务code OK
        return Promise.resolve(response.data); //直接返回data字段中的数据
      } else {
        Message.error(response.data.message || "请求失败");
        return Promise.reject(response);
      }
    } else {
      Message.error(response.data.message || "请求失败");
      return Promise.reject(response);
    }
  },
  error => {
    //store.dispatch('common/set_loading', false);
    loadingCount = 0;
    endLoading();

    let errorMessage = error.message;

    if (error.response) {
      console.log(error.response.status);
      switch (error.response.status) {
        case 401:
          console.log(401);
          store.dispatch("user/clearCurrentState");
          router.push({ path: "/login" });
          errorMessage = "token值无效，请重新登录";
          break;
        case 403:
          console.log(403);
          break;
        case 404:
          console.log(404);
          break;
        case 500:
          console.log(500);
          break;
        default:
          errorMessage = "请求失败";
          break;
      }
    }
    Message.error(errorMessage);
    return Promise.reject(error.response);
  }
);

export function get(url, params = {}, options = {}) {
  return http({
    url,
    method: "GET",
    headers: {
      //'Authorization': localStorage.getItem('token')
    },
    params: { ...params, _t: Date.parse(new Date()) / 1000 },
    options
  });
}

//封装post请求
export function post(url, data = {}, options = {}) {
  return http({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data,
    options
  });
}

//上传文件
export function upload(url, data = {}, options = {}, callback = () => {}) {
  return http({
    url,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data,
    options,
    //文件上传显示进度条
    onUploadProgress(processEvent) {
      if (processEvent.lengthComputable) {
        callback(
          parseInt(
            ((processEvent.loaded / processEvent.total) * 100).toFixed(0)
          )
        );
      }
    }
  });
}

//普通下载文件
export function download(url, params = {}, options = {}, callback = () => {}) {
  return http({
    url,
    method: "GET",
    headers: {
      //'Content-Type': 'multipart/form-data'，
    },
    responseType: "blob",
    params,
    options,
    //文件下载显示进度条
    onDownloadProgress(processEvent) {
      //processEvent.lengthComputable 所关联的资源是否具有可以计算的长度;否则 ，ProgressEvent.total 属性将是一个无意义的值,
      //需要后台发送的时候带有文件的大小数据  Content-Length
      if (processEvent.lengthComputable) {
        console.log(parseInt((processEvent.loaded / processEvent.total) * 100));
        callback(
          parseInt(
            ((processEvent.loaded / processEvent.total) * 100).toFixed(0)
          )
        );
      }
    }
  });
}
