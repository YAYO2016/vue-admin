/**
 * Created by yanyue on 2020/6/16 21:47
 */
import { post } from "@/api/config/http.js";

//获取验证码
const loginApi = {
  getSms(params) {
    return post("/getSms", params);
  }
};

export default loginApi;
