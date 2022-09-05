<template>
  <div v-if="visible" class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="customer">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="customer"
          v-model="loginForm.customer"
          placeholder="Mandant"
          name="customer"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="username">
        <span class="svg-container email-icon"> @ </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="E-mail"
          name="username"
          type="email"
          tabindex="2"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        :visible="capsTooltip"
        content="Caps lock ist aktiviert"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Passwort"
            name="password"
            tabindex="3"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" @click.prevent="handleLogin"
        >Login</el-button
      >

      <el-button type="primary" @click="startMicrosoftLogin">
        Login mit Microsoft Konto
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validEmail, isString } from "@/utils/validate";
import KeycloakUtils from "@/utils/KeycloakUtils";

export default {
  name: "LogIn",
  inheritAttrs: true,
  data() {
    const validateCustomer = (rule, value, callback) => {
      if (!isString(value) || value === "") {
        callback(new Error("Bitte geben Sie den Mandantennamen ein"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error("Bitte geben Sie Ihre E-mail-Adresse ein"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(
          new Error("Das Passwort muss mindestens 6 Zeichen beinhalten")
        );
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        customer: "",
        username: "",
        password: "",
      },
      loginRules: {
        customer: [
          { required: true, trigger: "blur", validator: validateCustomer },
        ],
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      visible: false,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  async beforeCreate() {
    // when a access - token from keycloak exists, login with that token
    const accessToken = await KeycloakUtils.getToken();
    if (accessToken != null) {
      this.callLoginWebservice({
        accessToken,
      });
    } else {
      this.visible = true;
    }
  },
  mounted() {
    if (this.loginForm.customer === "" && this.$refs.customer != null) {
      this.$refs.customer.focus();
    } else if (this.loginForm.username === "" && this.$refs.username != null) {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "" && this.$refs.password != null) {
      this.$refs.password.focus();
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    /**
     * @param loginData either the { customer, username, password } or { accessToken } from keycloak.
     */
    callLoginWebservice(loginData) {
      this.loading = true;
      this.$store
        .dispatch("user/login", loginData)
        .then(async () => {
          await this.$store.dispatch("user/getCustomerMetainfo");
          // the session - cookie is set now
          this.$router
            .push({
              path: this.redirect || "/",
              query: this.otherQuery,
              /**
               * the catch is a quick fix, otherwise we get a constant error. Needed till we can update to new version of vue-router.
               * see: https://stackoverflow.com/a/65326844
               */
            })
            .catch(() => {});

          this.loading = false;
        })
        .catch(() => {
          // the session - cookie could not be set.
          this.loading = false;
          this.visible = true;
        });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.callLoginWebservice(this.loginForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    startMicrosoftLogin() {
      KeycloakUtils.startKeycloakAuthentication();
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item__content {
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .el-input__wrapper {
    display: inline-block;
    height: 47px;
    width: 85%;
    background: transparent;
    &,
    &:hover,
    &.is-focus {
      box-shadow: none;
    }

    input {
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  button {
    width: 100%;
    margin-bottom: 30px;
    margin-left: 0px;
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .email-icon {
      font-weight: bold;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
