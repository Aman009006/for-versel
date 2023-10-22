<template>
  <div>
    <template v-if="dataReady">
      <el-table :data="allUsers" stripe>
        <el-table-column
          align="start"
          autosize
          label="Standard Rollen"
          prop="key"
          width="270"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="start"
          autosize
          label="Beschreibung"
          prop="key"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.email }}</span>
          </template>
        </el-table-column>
        <editButtons isEditRole eyeType />
      </el-table>

      <el-table :data="allUsers" class="custom-roles" stripe>
        <el-table-column
          align="start"
          autosize
          label="Individuelle Rollen"
          prop="key"
          width="270"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.email }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="start"
          autosize
          label="Beschreibung"
          prop="key"
        >
          <template #default="{ row }">
              <span class="text-input">{{ row.email }}</span>
          </template>
        </el-table-column>
        <editButtons isEditRole/>
      </el-table>

      <div class="role-table">
        <el-button
            class="add-btn"
            icon="icon-Plus"
            @click="createNewRole()"
        >
          Rolle hinzufügen
        </el-button>
      </div>
    </template>
  </div>
</template>

<style lang="scss" >
@import "@/styles/variables.module.scss";

.edit-password {
  position: relative;
}
.show-pwd {
  width: 20px !important;
  position: absolute;
  right: 10px;
  top: 7px;
}
.edit-input-password .el-input__wrapper {
    padding-right: 35px !important;
}
.custom-roles {
  margin-top: 20px;
}
.role-table{
  display: flex;
  justify-content: end;
}

</style>

<script>
import editButtons from "../admin-page/editButtonsForUsers.vue";
import UsersUtilities from "@/store/utilities/UsersUtilities";
import icons from "@/icons";
import {paths} from "@/constants";

export default {
  components: {
    editButtons,
  },
  data() {
    return {
      dataReady: false,
    };
  },
  computed: {
    allUsers() {
      return UsersUtilities.getAllUsers(this.$store);
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
  methods: {
    createNewRole() {
      this.$router.push(paths.benutzerBerechtigungs);
    },
    async loadData() {
      await UsersUtilities.fetchUsers(this.$store);
      this.dataReady = true;
    },
  },
};
</script>




