<template>
  <div>
    <template v-if="dataReady">
      <el-table :data="allDefaultRoles" stripe>
        <el-table-column
          align="start"
          autosize
          label="Standard Rollen"
          prop="key"
          width="270"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.role }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="start"
          autosize
          label="Beschreibung"
          prop="key"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.description }}</span>
          </template>
        </el-table-column>
        <editButtons withoutShadow isDefaultRole isEditRole :canDelete="false" :canEdit="canEdit"/>
      </el-table>

      <el-table :data="allNotDefaultRoles" class="custom-roles" stripe>
        <el-table-column
          align="start"
          autosize
          label="Individuelle Rollen"
          prop="key"
          width="270"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.role }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="start"
          autosize
          label="Beschreibung"
          prop="key"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.description }}</span>
          </template>
        </el-table-column>
        <editButtons withoutShadow isEditRole :canDelete="canDelete" :canEdit="canEdit"/>
      </el-table>

      <div class="role-table">
        <el-button
            :class="canCreate ? 'add-btn' : 'cancel-btn'"
            :style="!canCreate && 'margin-top: 10px'"
            icon="icon-Plus"
            @click="createNewRole()"
        >
          Rolle hinzufügen
        </el-button>
      </div>
    </template>
  </div>
</template>

<script>
import editButtons from "../admin-page/editButtons.vue";
import UsersUtilities from "@/store/utilities/UsersUtilities";
import icons from "@/icons";
import {paths, userAccesses} from "@/constants";
import {checkAccessesForActions} from "@/utils/checkAccessesUtils";
import RoleUtilities from "@/store/utilities/RoleUtilities";

export default {
  components: {
    editButtons,
  },
  data() {
    return {
      dataReady: false,
      canEdit: false,
      canCreate: false,
      canDelete: false,
    };
  },
  computed: {
    allDefaultRoles() {
      return UsersUtilities.getDefaultRoles(this.$store);
    },
    allNotDefaultRoles() {
      return UsersUtilities.getNotDefaultRoles(this.$store);
    },
    icons() {
      return icons;
    },
  },
  async created() {
    /**
     * Fetch the data when the view is created
     * and the data is already being observed
     */
    await this.loadData();
  },
  mounted() {
    this.checkAccesses()
  },
  methods: {
    checkAccesses() {
      const intents = this.$store.getters.accesses;
      this.canEdit = checkAccessesForActions(intents, userAccesses.roles, userAccesses.edit);
      this.canCreate = checkAccessesForActions(intents, userAccesses.roles, userAccesses.create);
      this.canDelete = checkAccessesForActions(intents, userAccesses.roles, userAccesses.delete);
    },
    createNewRole() {
        if (this.canCreate) {
            this.$router.push(paths.permissionSettings);
        } else {
            this.$message({
                message: "Sie haben keine Berechtigung zum Hinzufügen neuer Rollen",
                type: "error",
            });
        }
    },
    async loadData() {
      await RoleUtilities.fetchRoles(this.$store);
      this.dataReady = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.custom-roles {
  margin-top: 20px;
}
.role-table{
  display: flex;
  justify-content: end;
}

</style>




