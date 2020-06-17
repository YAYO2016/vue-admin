/**
 * Created by yanyue on 2020/6/16 21:47
 */
import { post } from "@/api/config/http.js";

const userApi = {
  getUserInfo(params) {
    return post("/user/login", params);
  }
};

export default userApi;
