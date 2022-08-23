<template>
  <div class="right-menu-item">
    <el-dropdown @command="goToPath">
      <span class="el-dropdown-link">
        <el-badge
          :value="newIntentRoutes.length"
          class="item"
          :hidden="newIntentRoutes.length == 0"
        >
          <i class="el-icon-message-solid" />
        </el-badge>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled class="dropdown-headline">
          <span v-if="newIntentRoutes.length > 0"> Neue Dialoge </span>
          <span v-if="newIntentRoutes.length == 0">
            Es gibt aktuell keine Neuigkeiten
          </span>
        </el-dropdown-item>
        <el-dropdown-item
          v-for="newIntent in newIntentRoutes"
          :key="newIntent.name"
          :command="newIntent.name"
        >
          {{ getPathTitle(newIntent) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getNewIntentRoutes } from "@/utils/routes/intentRoutes";
export default {
  name: "Notification",
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
.el-dropdown-link {
  font-size: 18px;
}
.el-badge {
  display: inline;
}
</style>
