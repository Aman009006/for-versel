<template>
  <div>
    <template v-if="dataReady">
      <el-table :data="allUsers" stripe>
        <el-table-column
          align="start"
          autosize
          label="Name"
          prop="key"
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <el-input
                :modelValue="getEditableUser(row.email)?.email"
                autosize
                class="edit-input"
                type="textarea"
                @update:modelValue="
                  (newKey) => setEditableUser(row.email, newKey)
                "
              />
            </template>
            <template v-else>
              <div v-if="isNotCurrentSelectedUser(row)" class="shadow-table"></div>
              <span class="text-input">{{ row.email }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="start"
          autosize
          label="E-Mail"
          prop="key"
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <el-input
                :modelValue="getEditableUser(row.email)?.email"
                autosize
                class="edit-input"
                type="textarea"
                @update:modelValue="
                  (newKey) => setEditableUser(row.email, newKey)
                "
              />
            </template>
            <template v-else>
              <div v-if="isNotCurrentSelectedUser(row)" class="shadow-table"></div>
              <span class="text-input">{{ row.email }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="start"
          autosize
          label="Zugewiesene Rolle"
          prop="key"
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <select style="margin: 0" class="custom-select">
                <option>admin</option>
                <option>write</option>
                <option>read</option>
              </select>
            </template>
            <template v-else>
              <div v-if="isNotCurrentSelectedUser(row)" class="shadow-table"></div>
              <span class="text-input">{{ row.email }}</span>
            </template>
          </template>
        </el-table-column>
        <editButtons />
      </el-table>
      <addButtonAdmin/>
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
.user-select {
  width: 100%;
  padding: 5px 10px;
}

</style>

<script>
import editButtons from "./editButtonsForUsers.vue";
import addButtonAdmin from "./addButtonAdmin.vue";
import UsersUtilities from "@/store/utilities/UsersUtilities";
import icons from "@/icons";
import {Select} from "@element-plus/icons-vue";

export default {
  components: {
    Select,
    editButtons,
    addButtonAdmin,
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
    isUserEditing(user) {
      const isEditing = UsersUtilities.isUserEditing(
        this.$store,
        user
      );
      return isEditing;
    },
    isNotCurrentSelectedUser(user) {
      const selectedRow = Object.values(this.$store._state.data.users.editableUsers)[0]?.email;
      if (selectedRow !== undefined) {
        return selectedRow !== user.email
      }
      return false
    },
    async loadData() {
      await UsersUtilities.fetchUsers(this.$store);
      this.dataReady = true;
    },
    getEditableUser(user) {
      return UsersUtilities.getEditableUser(
        this.$store,
        user
      );
    },
    setEditableUser(user, newKey) {
      const editableUser = this.getEditableUser(user);
      editableUser.email = newKey;
    },
  },
};
</script>




