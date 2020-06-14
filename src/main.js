import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//安装和使用animate.css
import "@/common/style/animate.css";

//安装使用elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

import i18n from "./i18n";
Vue.use(ElementUI, { size: "small", locale });

//在全局注册一些自定义方法
import globalFun from "./common/js/global-fun";
Vue.use(globalFun);

//导入自定义校验数据
import rules from "./common/js/rules";
Vue.prototype.$rules = rules;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
