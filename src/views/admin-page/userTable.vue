<template >
  <div class="table-container-admin">
    <template v-if="dataReady">
      <el-table :data="allUsers" class="alternate-column-colors" >
        <el-table-column
          align="start"
          label="E-Mail"
          prop="key"
          autosize
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <span>Edit e-mail</span>
              <el-input
                type="textarea"
                autosize
                class="edit-input"
                :modelValue="getEditableUser(row.email)?.email"
                @update:modelValue="
                  (newKey) => setEditableUser(row.email, newKey)
                "
              />
              <span>Edit password</span>
              <el-input
                type="textarea"
                autosize
                class="edit-input"
                placeholder="********"
                :model-value="getPasswordFromStore()"
                @update:modelValue="
                  (newKey) => editPassword(newKey)
                "
              />
            </template>
            <template v-else>
              <div v-if="getSelectedUser(row)" class="shadow-text"></div>
              <span class="text-input">{{ row.email }}</span>
            </template>
          </template>
        </el-table-column>
        <editButtons />
        </el-table>
        <addButtonAdmin />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.shadow-text{
  background: #000;
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}
</style>

<script>
import editButtons from "./editButtons.vue";
import addButtonAdmin from "./addButtonAdmin.vue";
import UsersUtilities from "@/store/utilities/UsersUtilities";

export default {
  components: {
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
    getSelectedUser (user) {
      const selectedRow = Object.values(this.$store._state.data.users.editableUsers)[0]?.email;
      if (selectedRow)  {
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

    getPasswordFromStore () {
      return this.$store._state.data.users.userPassword
    },


    editPassword (password) {
      return UsersUtilities.editPassword(
        this.$store,
        password
      );
    },
  },
};
</script>




