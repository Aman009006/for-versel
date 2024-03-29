<template>
  <div class="navbar-wrap">
    <a href="#/home" class="logo">
      <el-image :src="hsagLogo" class="hsag-logo" />
    </a>
    <div class="navbar">
      <tags-view />
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <search id="header-search" class="right-menu-item" />
          <notification />
          <Logout id="logout-icon" />
          <CustomerLogo id="customer-logo" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/HeaderSearch/index.vue";
import Notification from "@/components/Notification/index.vue";
import Logout from "@/components/Logout/index.vue";
import CustomerLogo from "@/components/CustomerLogo/index.vue";
import TagsView from "@/layout/components/TagsView/index.vue";
import hsagLogo from "@/assets/images/hsag_logo.png";

export default {
  components: {
    TagsView,
    Search,
    Notification,
    Logout,
    CustomerLogo,
  },
  inheritAttrs: true,
  computed: {
    // maps store getters to local computed properties:
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      /**
       * We need to reload the page when logging out.
       * The reason lies in the chatbot - widget, which is shown in the
       * admin - UI.
       * When we would not reload the window, the dynamically loaded components, like
       * css and JavaScript, would stay in the admin - UI.
       * Additionaly the sessionStorage is cleared so that the
       * conversationId of the chatbot will not be persisted
       * @see https://hsagchatbot.atlassian.net/browse/CHAT-1156
       * @see https://stackoverflow.com/a/47005895/6458608
       */
      sessionStorage.clear();
      this.$router.go();
    },
  },
  data() {
    return {
      hsagLogo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.navbar-wrap {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: $navBarHeight;
  top: 0;
  z-index: 1000;
  background: $hsag-lightgrey;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: $sideBarWidth;

  .hsag-logo {
    width: 200px;
  }
}

.navbar {
  display: flex;
  width: calc(100% - 200px);
  height: $navBarHeight;
  position: relative;
  background: $hsag-lightgrey;

  .hamburger-container {
    height: auto;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    right: 20px;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: auto;
      width: auto;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
