<template>
  <div class="navbar-wrap">
    <div class="logo">
      <el-image :src="hsagLogo" class="hsag-logo" :fit="contain" />
    </div>
    <div class="navbar">
      <tags-view />
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <search id="header-search" class="right-menu-item" />

          <notification />
          <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar" />
        </template>

        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
            <el-icon>
              <icon-CaretBottom />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/">
                <el-dropdown-item>Home</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click="logout">
                <span style="display: block">Log Out</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger/index.vue";
import Search from "@/components/HeaderSearch/index.vue";
import Notification from "@/components/Notification/index.vue";
import TagsView from "@/layout/components/TagsView/index.vue";
import hsagLogo from "@/assets/images/hsag_logo.png";

export default {
  components: {
    Hamburger,
    TagsView,
    Search,
    Notification,
  },
  inheritAttrs: true,
  computed: {
    // maps store getters to local computed properties:
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
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
  z-index: 2000;
  background: $hsag-lightgrey;
}
.logo{
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
  overflow: hidden;
  position: relative;
  background: $hsag-lightgrey;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
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
    position: absolute;
    right: 0;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
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
