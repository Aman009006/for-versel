<template>
  <div v-if="!item.hidden">
    <template v-if="isIntents(item)">
      <app-link @click="removeSearchValue" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
            :index="resolvePath(onlyOneChild.path)"
            :class="{ 'submenu-title-noDropdown': !isNest, 'is-intent': isIntents(item)}">
            <item
              :popper-class="isNest ? 'hidden-popper' : ''"
              :icon="onlyOneChild.meta.icon || (onlyOneChild.meta && onlyOneChild.meta.icon)"
              :title="onlyOneChild.meta.title" />
          </el-menu-item>
      </app-link>
    </template>
    <template
      v-else-if="hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
        ">
      <app-link @click="removeSearchValue" v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-badge
          value="Neu"
          class="item"
          :hidden="!(item.meta && item.meta.newIntent)">
          <el-menu-item
            :index="resolvePath(onlyOneChild.path)"
            :class="{ 'submenu-title-noDropdown': !isNest }">
            <item
              :popper-class="isNest ? 'hidden-popper' : ''"
              :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
              :title="onlyOneChild.meta.title" />
          </el-menu-item>
        </el-badge>
      </app-link>
    </template>

    <!--
        meaning of attribute "ref": This makes this HTML-Tag (el-submenu) referenceable by parent components.
        https://blog.logrocket.com/how-to-use-refs-to-access-your-application-dom-in-vue-js/
        This is used here for FixiOSBug.js to reference this element.
       -->
    <template
      v-else-if="basePath === paths.users">
      <app-link @click="removeSearchValue" :to="paths.users">
        <el-badge
          class="item">
          <el-menu-item
            :index="resolvePath(paths.users)"
            :class="{ 'submenu-title-noDropdown': !isNest }">
            <item
              :popper-class="isNest ? 'hidden-popper' : ''"
              :icon="(item.meta && item.meta.icon)"
              :title="item.meta.title" />
          </el-menu-item>
        </el-badge>
      </app-link>

      <sidebar-item
        v-if="isUserPage"
        v-for="child in item.children.slice(1)"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu sub-navigation"
      />
    </template>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body>
      <template #title="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
          popper-class="hidden-popper" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu" />
    </el-sub-menu>
  </div>
</template>

<script>
import path from "path-browserify";
import { isExternal } from "@/utils/validate";
import Item from "./Item.vue";
import AppLink from "./Link.vue";
import FixiOSBug from "./FixiOSBug";
import {paths} from "@/constants";
import "../../../styles/variables.module.scss"
import SearchUtilities from "@/store/utilities/SearchUtilities";

export default {
  name: "SidebarItem",
  computed: {
    paths() {
      return paths
    }
  },
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      isUserPage: !!this.checkPathForUsersPage(this.$route)
    };
  },
  watch: {
    $route(to, from) {
      this.isUserPage = this.checkPathForUsersPage(to);
    },
  },
  methods: {
    checkPathForUsersPage(route) {
      return (
        route.fullPath.includes(paths.users) ||
        route.fullPath.includes(paths.permissionSets) ||
        route.fullPath.includes(paths.permissionSettings)
      );
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    isIntents(item) {
      if (item.isIntents) {
        this.onlyOneChild = { ...item.children[0] };
        return true;
      }
    },
    removeSearchValue() {
      SearchUtilities.removeSearchTextFromStore(this.$store)
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>

<style lang="scss">
@import "../../../styles/variables.module.scss";

.sidebar-container .el-badge {
  display: block;
  width: 100%;

  sup.el-badge__content {
    right: 50px;
    top: 10px;
  }
}

.sub-navigation li {
  padding-left: 30px !important;
}

.nest-menu .el-badge {
  display: block;
  width: 100%;
}

.nest-menu:nth-child(even) {
  background: $hsag-blue-shade;
}

// for the vertical menu (when the small sidebar is used)
.el-menu--vertical .el-badge sup.el-badge__content {
  right: 50px;
  top: 50%;
}

.el-menu--vertical:not(.el-menu--collapse) {
  min-height: 400px;
}

.el-menu-item {
  font-size: 14px !important;
}

.el-menu>div>.el-sub-menu>.el-sub-menu__title {
  padding-left: 20px !important;
  font-size: 14px !important;
}

div>.el-sub-menu>.el-menu>.nest-menu>.el-sub-menu>.el-sub-menu__title {
  padding-left: 40px !important;
  font-size: 14px !important;
}

.el-menu>div>.el-sub-menu>.el-menu>.nest-menu>a>.el-badge>.el-menu-item {
  padding-left: 40px !important;
}

.el-menu>.nest-menu>.el-sub-menu>.el-menu>.nest-menu>a>.el-badge>.el-menu-item {
  padding-left: 60px !important;
}
</style>
