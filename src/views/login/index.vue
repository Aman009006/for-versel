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
      <el-image :src="hsagLogo" />
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="customer">
        <span class="svg-container">
          <svg-icon :svg-icon-html="icons.user" />
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
          placeholder="E-Mail"
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
            <svg-icon :svg-icon-html="icons.password" />
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
              :svg-icon-html="
                passwordType === 'password' ? icons.eye : icons.eyeOpen
              "
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

      <el-button link type="primary" @click="sendResetMail" class="send-reset">
        Passwort vergessen
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { validEmail, isString } from "@/utils/validate";
import KeycloakUtils from "@/utils/KeycloakUtils";
import { loadDynamicRoutes } from "@/utils/routes/loadDynamicRoutes";
import icons from "@/icons/index";
import hsagLogo from "@/assets/images/hsag_logo.png";

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
      hsagLogo,
    };
  },
  computed: {
    icons() {
      return icons;
    },
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
    async handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          await this.callLoginWebservice(this.loginForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * @param loginData either the { customer, username, password } or { accessToken } from keycloak.
     */
    async callLoginWebservice(loginData) {
      this.loading = true;
      this.$store
        .dispatch("user/login", loginData)
        .then(async () => {
          await this.$store.dispatch("user/getCustomerMetainfo");
          // the session - cookie is set now
          this.redirectTo();
          this.loading = false;
        })
        .catch(() => {
          // the session - cookie could not be set.
          this.loading = false;
          this.visible = true;
        });
    },
    async redirectTo() {
      await loadDynamicRoutes();
      this.$router.push({
        path: encodeURI(this.redirect || "/"),
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
    sendResetMail() {
      this.$router.push({
        path: encodeURI('/sendResetMail')
      })
    }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

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
      height: 46px;

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
@import "@/styles/variables.module.scss";

.send-reset {
  border: transparent !important
}

.login-container {
  display: flex;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  background-color: $hsag-white;
  overflow: hidden;

  button {
    width: 60%;
    height: 40px;
    margin-bottom: 20px;
    margin-left: 0px;
    font-weight: 400;

    &.send-reset{
      color: $hsag-blue-light;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 520px;
    max-width: 100%;
    overflow: hidden;

    .el-form-item {
      width: 100%;
      background-color: $hsag-lightgrey;
    }

    .el-image {
      width: 300px;
      margin-bottom: 30px;
    }

    .email-icon {
      font-weight: bold;
    }
  }

  .el-input__wrapper {
    input {
      color: $hsag-bluegrey;
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
    padding: 6px 2px 6px 15px;
    color: gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $hsag-green;
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
    color: gray;
    cursor: pointer;
    user-select: none;
    width: 17px;
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
