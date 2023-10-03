<template>
  <div>
    <template v-if="dataReady">
      <el-table :data="allUsers" stripe>
        <el-table-column
          align="start"
          autosize
          label="E-Mail"
          prop="key"
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <span>E-Mail editieren</span>
              <el-input
                :modelValue="getEditableUser(row.email)?.email"
                autosize
                class="edit-input"
                type="textarea"
                @update:modelValue="
                  (newKey) => setEditableUser(row.email, newKey)
                "
              />
              <span>Passwort editieren</span>
              <div class="edit-password">
                <el-input
                  :model-value="getPasswordFromStore()"
                  autosize
                  class="edit-input-password"
                  placeholder="********"
                  :type="inputType"
                  @update:modelValue="(newKey) => editPassword(newKey)"
                />
                  <svg-icon
                    class="show-pwd"
                    @click="togglePasswordType"
                    :svg-icon-html="inputType === 'password' ? icons.eye : icons.eyeOpen"/>
              </div>
            </template>
            <template v-else>
              <div v-if="isNotCurrentSelectedUser(row)" class="shadow-table"></div>
              <span class="text-input">{{ row.email }}</span>
            </template>
          </template>
        </el-table-column>
        <editButtons :defaultInputType="defaultInputType"/>
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

</style>

<script>
import editButtons from "./editButtonsForUsers.vue";
import addButtonAdmin from "./addButtonAdmin.vue";
import UsersUtilities from "@/store/utilities/UsersUtilities";
import icons from "@/icons";

export default {
  components: {
    editButtons,
    addButtonAdmin,
  },
  data() {
    return {
      dataReady: false,
      password: '',
      inputType: 'password'
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
    togglePasswordType() {
      this.inputType = this.inputType === 'password' ? 'text' : 'password';
    },
    defaultInputType() {
      this.inputType = 'password';
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

    getPasswordFromStore() {
      return this.$store._state.data.users.userPassword
    },


    editPassword(password) {
      return UsersUtilities.editPassword(
        this.$store,
        password
      );
    },
  },
};
</script>




