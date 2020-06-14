<template>
  <div class="Login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          @click="defaultTab = 'login'"
          :class="{ active: defaultTab === 'login' }"
        >
          登录
        </li>
        <li
          @click="defaultTab = 'register'"
          :class="{ active: defaultTab === 'register' }"
        >
          注册
        </li>
      </ul>
      <br />

      <div class="form">
        <!--登录表单-->
        <el-form
          v-if="defaultTab === 'login'"
          ref="loginForm"
          :model="loginForm"
          label-width="0"
        >
          <el-form-item prop="username" :rules="$rules.EmailRule">
            <label>邮箱</label>
            <el-input type="email" v-model.trim="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="$rules.PasswordRule">
            <label>密码</label>
            <el-input
              type="password"
              minlength="6"
              maxlength="20"
              v-model.trim="loginForm.password"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="code"
            :rules="[{ ...$rules.NotEmpty[0], message: '验证码不能为空' }]"
          >
            <label>验证码</label>
            <el-row :gutter="10" type="flex" justify="space-between">
              <el-col :span="16">
                <el-input
                  v-model.trim="loginForm.code"
                  minlength="6"
                  maxlength="6"
                ></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="success" style="width: 100%"
                  >获取验证码</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button
              type="danger"
              style="width: 100%"
              @click="handleLogin('loginForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>

        <!--注册表单-->
        <el-form
          v-if="defaultTab === 'register'"
          ref="registerForm"
          :model="registerForm"
          label-width="80px"
        >
          <el-form-item>
            <label>邮箱</label>
            <el-input v-model="registerForm.email"></el-input>
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
    return {
      defaultTab: "login",
      loginForm: {
        email: "",
        password: "",
        code: ""
      },
      registerForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    handleLogin(formName) {
      let vm = this;
      if (vm.validateRules(formName, vm)) {
        console.log("success");
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
