<template>
  <div class="Login">
    <el-row :gutter="10" class="changeLanguage">
      <el-col :span="24" align="right">
        <el-button type="primary" @click="changeLocale">中文/EN</el-button>
      </el-col>
    </el-row>
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          @click="defaultTab = 'login'"
          :class="{ active: defaultTab === 'login' }"
        >
          {{ $t("login.title") }}
        </li>
        <li
          @click="defaultTab = 'register'"
          :class="{ active: defaultTab === 'register' }"
        >
          {{ $t("register.title") }}
        </li>
      </ul>
      <br />

      <div class="form">
        <!--登录表单-->
        <el-form
          v-show="defaultTab === 'login'"
          ref="loginForm"
          :model="loginForm"
          label-width="0"
        >
          <el-form-item prop="email" :rules="$rules.NotEmpty()">
            <label> {{ $t("login.email") }}</label>
            <el-input type="email" v-model.trim="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="$rules.PasswordRule">
            <label> {{ $t("login.password") }}</label>
            <el-input
              type="text"
              minlength="6"
              maxlength="20"
              @blur="loginForm.password = stripscript(loginForm.password)"
              v-model.trim="loginForm.password"
            ></el-input>
            <!--stripscript 可以消除特殊的字符-->
          </el-form-item>

          <el-form-item
            prop="code"
            :rules="[{ ...$rules.NotEmpty[0], message: '验证码不能为空' }]"
          >
            <label> {{ $t("login.code") }}</label>
            <el-row :gutter="10" type="flex" justify="space-between">
              <el-col :span="16">
                <el-input
                  v-model.trim="loginForm.code"
                  minlength="6"
                  maxlength="6"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button
                  type="success"
                  style="width: 100%"
                  @click="$api.getSms(loginForm.email)"
                >
                  {{ $t("login.getCode") }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              style="width: 100%"
              @click="handleLogin('loginForm')"
            >
              {{ $t("login.submit") }}</el-button
            >
          </el-form-item>
        </el-form>

        <!--注册表单-->
        <el-form
          v-show="defaultTab === 'register'"
          ref="registerForm"
          :model="registerForm"
          label-width="0"
        >
          <el-form-item prop="email" :rules="$rules.NotEmpty()">
            <label> {{ $t("register.email") }}</label>
            <el-input type="email" v-model.trim="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="$rules.PasswordRule">
            <label> {{ $t("register.password") }}</label>
            <el-input
              type="text"
              minlength="6"
              maxlength="20"
              @blur="registerForm.password = stripscript(registerForm.password)"
              v-model.trim="registerForm.password"
            ></el-input>
            <!--stripscript 可以消除特殊的字符-->
          </el-form-item>

          <el-form-item
            prop="repeatPassword"
            :rules="
              (() => [
                ...$rules.PasswordRule,
                { validator: validatePassWord, trigger: 'blur' }
              ])()
            "
          >
            <label> {{ $t("register.repeatPassword") }}</label>
            <el-input
              type="text"
              minlength="6"
              maxlength="20"
              @blur="
                registerForm.repeatPassword = stripscript(
                  registerForm.repeatPassword
                )
              "
              v-model.trim="registerForm.repeatPassword"
            ></el-input>
            <!--stripscript 可以消除特殊的字符-->
          </el-form-item>

          <el-form-item
            prop="code"
            :rules="[{ ...$rules.NotEmpty[0], message: '验证码不能为空' }]"
          >
            <label> {{ $t("login.code") }}</label>
            <el-row :gutter="10" type="flex" justify="space-between">
              <el-col :span="16">
                <el-input
                  v-model.trim="registerForm.code"
                  minlength="6"
                  maxlength="6"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="success" style="width: 100%">
                  {{ $t("login.getCode") }}</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              style="width: 100%"
              @click="handleLogin('loginForm')"
            >
              {{ $t("login.submit") }}</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Created by yanyue on 2020/6/13 18:32
 */

export default {
  name: "Login",
  data() {
    //两次输入的密码一致校验
    const validatePassWord = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error(this.$t("rules.repeatPasswordError")));
      } else {
        callback();
      }
    };
    return {
      defaultTab: "login",
      loginForm: {
        email: "",
        password: "",
        code: ""
      },
      registerForm: {
        email: "",
        password: "",
        repeatPassword: "",
        code: ""
      },
      validatePassWord: validatePassWord
    };
  },
  computed: {},
  methods: {
    //中英文切换
    changeLocale() {
      let vm = this;
      let locale = vm.$i18n.locale;
      locale === "zh" ? (vm.$i18n.locale = "en") : (vm.$i18n.locale = "zh");
    },
    handleLogin(formName) {
      let vm = this;
      if (vm.validateRules(formName, vm)) {
        console.log("success");
      }
    }
  },
  watch: {
    // 当切换语言的时候，触发下错误提示的更新
    "$i18n.locale": {
      handler() {
        //在下次dom更新循环结束之后，执行延迟回调。在修改数据之后立即使用这个方法，获得更新后的dom
        if (this.$refs["loginForm"]) {
          this.$nextTick(() => {
            this.$refs["loginForm"].fields.forEach(item => {
              if (item.validateState === "error") {
                this.$refs["loginForm"].validateField(item.labelFor);
              }
            });
          });
        }
        if (this.$refs["registerForm"]) {
          this.$nextTick(() => {
            this.$refs["registerForm"].fields.forEach(item => {
              if (item.validateState === "error") {
                this.$refs["registerForm"].validateField(item.labelFor);
              }
            });
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Login {
  position: relative;
  height: 100%;
  background-color: #344a5f;

  .changeLanguage {
    padding: 10px;
  }

  .login-wrap {
    width: 330px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .menu-tab {
      text-align: center;

      li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &.active {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }

    .form {
      label {
        color: #fff;
      }
    }
  }
}
</style>
