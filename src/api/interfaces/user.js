/**
 * Created by yanyue on 2020/6/16 21:47
 */
import Http from "@/api/config/http.js";

const post = Http.post;
//const get = Http.get;

const userApi = {
  getUserInfo(params) {
    return post("/user/login", params);
  }
};

export default userApi;
