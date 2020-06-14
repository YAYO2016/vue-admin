/**
 * Created by yanyue on 2020/6/14 21:20
 */
import Vue from "vue";
import ElementLocale from "element-ui/lib/locale";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";

import VueI18n from "vue-i18n";

import langEN from "./en";
import langZh from "./zh";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh", //切换语言的话  this.$i18n.locale = zh 或者 en
  messages: {
    zh: { ...langZh, ...zhLocale },
    en: { ...langEN, ...enLocale }
  }
});
ElementLocale.i18n((key, value) => i18n.t(key, value));

export default i18n;
