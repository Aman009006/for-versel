<template>
  <div class="right-menu-item">
    <el-dropdown @command="goToPath">
      <span class="el-dropdown-link">
        <el-badge :value="newIntentRoutes.length" class="item" :hidden="newIntentRoutes.length == 0">
          <el-icon>
            <icon-BellFilled />
          </el-icon>
        </el-badge>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled class="dropdown-headline">
            <span v-if="newIntentRoutes.length > 0"> Neue Dialoge </span>
            <span v-if="newIntentRoutes.length == 0">
              Es gibt aktuell keine Neuigkeiten
            </span>
          </el-dropdown-item>
          <el-dropdown-item v-for="newIntent in newIntentRoutes" :key="newIntent.name" :command="newIntent.name">
            {{ getPathTitle(newIntent) }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { getNewIntentRoutes } from "@/utils/routes/intentRoutes";
export default {
  name: "Notification",
  inheritAttrs: true,
  props: {},
  data() {
    return {};
  },
  computed: {
    permissionRoutes: function () {
      return this.$store.getters.permission_routes;
    },
    newIntentRoutes() {
      return getNewIntentRoutes(this.permissionRoutes);
    },
  },
  methods: {
    getPathTitle(newIntent) {
      const pathTitles = newIntent.pathTitles;
      return pathTitles.reduce(
        (allPaths, newPath) => allPaths + " > " + newPath
      );
    },
    goToPath(name) {
      this.$router.push({
        name,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.right-menu-item .el-dropdown {
  vertical-align: middle;
}

.el-dropdown-link {
  font-size: 18px;
}
.el-badge {
  display: inline;
}
</style>
