import i18n from "@/i18n";

//非空校验
//在单独js文件Vue template以外应用，先在js内引入i18n.js，然后通过函数的模式返回数据，务必使用函数返回的模式，因为使用一般属性对象，在编译一次后，后面更改语言，不会自动刷新
//const NotEmpty = [{ required: true, message: i18n.t("rules.noEmpty"), trigger: ["blur", "change"] }];
const NotEmpty = () => {
  return [
    {
      required: true,
      message: i18n.t("rules.noEmpty"),
      trigger: ["blur", "change"]
    }
  ];
};
const TypeEmpty = [
  { required: true, message: "输入不能为空", trigger: ["blur"] }
];
//数字校验规则
const NumberRule = [
  { required: true, message: "输入不能为空", trigger: "blur" }
  // {type: 'number', message: '必须为数字类型', trigger: ['blur', 'change']}
];
//密码校验规则
const PasswordRule = [
  { required: true, message: "密码不能为空", trigger: "blur" },
  { min: 6, max: 20, message: "长度在2-30个字符之间", trigger: "blur" },
  {
    validator: function(rule, value, callback) {
      //字母+数字
      if (/^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/.test(value) == false) {
        callback(new Error("密码为6至20位字母+数字"));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
];
//电话号码校验
const TelRule = [
  {
    required: true,
    message: "请输入手机号码",
    trigger: "blur"
  },
  {
    validator: function(rule, value, callback) {
      if (/^1[34578]\d{9}$/.test(value) == false) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
];
//email 邮箱校验
const EmailRule = [
  {
    required: true,
    message: "请输入邮箱地址",
    trigger: "blur"
  },
  {
    type: "email", //要检验的类型（number，email，date等）
    message: "请输入正确的邮箱地址",
    trigger: ["blur", "change"]
  },
  {
    validator: function(rule, value, callback) {
      // 排除特殊字符
      if (
        /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(
          value
        ) == false
      ) {
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
];

//code 验证码规则验证
const codeRules = [
  {
    required: true,
    message: "请输入邮箱地址",
    trigger: "blur"
  },
  {
    type: "email", //要检验的类型（number，email，date等）
    message: "请输入正确的邮箱地址",
    trigger: ["blur", "change"]
  },
  {
    validator: function(rule, value, callback) {
      // 字母或者数字
      if (/^[a-z0-9]{6}$/.test(value) == false) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
];

//日期校验
const DateRule = [
  {
    required: true,
    message: "请输入日期",
    trigger: "blur"
  },
  {
    type: "date",
    message: "请输入正确的日期地址",
    trigger: ["blur", "change"]
  }
];
export default {
  NotEmpty,
  NumberRule,
  TelRule,
  EmailRule,
  DateRule,
  TypeEmpty,
  PasswordRule,
  codeRules
};
