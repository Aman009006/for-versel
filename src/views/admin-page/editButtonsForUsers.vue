<template>
  <el-table-column label="Aktion" align="start" width="206px">
    <template #default="{ row: user }">
      <!-- When the editing mode is turned on: -->
      <template v-if="isUserEditing(user)">

        <el-row class="button-row">
          <el-col style="margin-right: 10px" :span="12">
            <el-button
              class="confirm-btn"
              icon="icon-Check"
              @click="confirmEdit(user)"
            >
              Speichern
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button
              style="background: #FA5050; width: 31px;"
              class="cancel-btn"
              icon="icon-Close"
              @click="removeInputFields(user)"
            />
          </el-col>
        </el-row>
      </template>

      <!-- When the editing mode is turned off: -->
      <template v-else>
        <div v-if="isNotCurrentSelectedUser(user)" class="shadow-table"></div>

        <el-row class="button-row" align="middle">
          <el-col style="margin-right: 10px" class="button-col" :span="12">
            <el-button
              class="edit-btn"
              icon="icon-Edit"
              @click="startEdit(user) , isNotCurrentSelectedUser(user)"
            >
              Bearbeiten
            </el-button>
          </el-col>
          <el-col class="button-col" :span="12">
            <el-button
                v-if="eyeType"
                style="border-radius: 10px; padding: 0px; width: 33px;"
                class="confirm-btn"
                @click="redirectToEdit()"
            >
              <svg-icon style="width: 12px;" :svg-icon-html="icons.eyeOpen"/>
            </el-button>

            <el-button
                v-else
                style="border-radius: 10px; background: #FA5050; width: 33px;"
                class="delete-btn"
                icon="icon-Delete"
                @click="deleteUser(user)"
            />
          </el-col>
        </el-row>
      </template>

    </template>

  </el-table-column>
</template>

<script>
import UsersUtilities from "@/store/utilities/UsersUtilities";
import {addUser, deleteUser, editUser} from "@/api/users";
import {paths} from "@/constants";
import icons from "@/icons/index";

export default {
  props: {
    eyeType: {
      type: Boolean,
      required: false,
    },
    isEditRole: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    icons() {
      return icons
    },
    currentUsers() {
      return this.$store.getters.users;
    }
  },
  methods: {
    redirectToEdit(user) {
      const role = user?.email ? user.email : "none";
      this.$router.push(paths.benutzerBerechtigungs + "?role=" + role);
    },
    isUserEditing(user) {
      const isEditing = UsersUtilities.isUserEditing(
        this.$store,
        user
      );
      return isEditing;
    },
    isNotCurrentSelectedUser (user) {
      const selectedRow = Object.values(this.$store._state.data.users.editableUsers)[0]?.email;
      if (selectedRow !== undefined)  {
        return selectedRow !== user.email
      }
      return false
    },
    removeInputFields(user) {
      UsersUtilities.stopCreatingOrAddingUser(this.$store, user);
    },
    async startEdit(user) {
      if (this.isEditRole) {
        this.redirectToEdit(user)
      } else {
        this.isNotCurrentSelectedUser(user)
        UsersUtilities.startEditingUser(
            this.$store,
            user.email
        );
      }
    },
    async deleteUser(user) {
      this.$confirm(
        `Sind Sie sich sicher, dass sie den Benutzer ${user.email} löschen\n` +
        "wollen? Diese Aktion ist nicht rückgängig zu machen.",
        "Benutzer löschen",
        {
          confirmButtonText: "Ja löschen",
          cancelButtonText: "Abbrechen",
          type: "default",
        }
      )
        .then(async () => {
          const deletionSuccessful = await deleteUser(user.email);
          if (deletionSuccessful) {
            this.$message({
              message: "Löschen erfolgreich",
              type: "success",
            });
          }
          await UsersUtilities.fetchUsers(this.$store);
        })
        .catch(() => {});
    },
    async confirmEdit(user) {
      let savedSuccessfully = true;
      if (user.email !== "") {
        if (UsersUtilities.isNewUser(this.$store, user)) {
          savedSuccessfully = await this.setUser(user);
        } else {
          savedSuccessfully = await this.updateUser(user);
        }
      } else {
        this.$message({
          message: "E-Mail darf nicht leer sein",
          type: "warning",
        });
        savedSuccessfully = false;
      }

      if (savedSuccessfully) {
        await UsersUtilities.fetchUsers(this.$store);
        this.removeInputFields(user);
      }
    },
    getEditableUser(userEmail) {
      return UsersUtilities.getEditableUser(
        this.$store,
        userEmail
      );
    },
    isValidEmail (email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    },
    removeEmptyStrings(obj) {
      const result = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'string' && obj[key].trim() !== '') {
          result[key] = obj[key];
        }
      }
      if (obj.newEmail && obj.newEmail === obj.email){
        return {
          email: obj.email,
          newPassword: obj.newPassword
        };
      } else {
        return result;
      }
    },
    async updateUser(user) {
      const password = this.$store._state.data.users.userPassword;
      const newUser = this.getEditableUser(
        user.email
      );
      if (
        newUser.email == user.email
      ) {
        this.$message({
          message: "Es wurden keine Änderungen erkannt",
          type: "warning",
        });
        return false;
      } else if (!this.isValidEmail(newUser.email) || !(password.length >= 8)) {
        this.$message({
          message: "Email or Password is invalid",
          type: "warning",
        });
        return false;
      } else {
        const data = {
          newEmail: newUser.email,
          email: user.email,
          newPassword: password
        }
        const updateSuccessful = await editUser(
          this.removeEmptyStrings(data)
        );
        if (updateSuccessful) {
          this.$message({
            message: "Die Änderungen wurden erfolgreich gespeichert",
            type: "success",
          });
        }
        return updateSuccessful;
      }
    },
    async setUser(user) {
      const password = this.$store._state.data.users.userPassword;
      const data = {
        email: user.email,
        password: password
      }

      if (!this.isValidEmail(user.email) || !(password.length >= 8)) {
        this.$message({
          message: "Email or Password is invalid",
          type: "warning",
        });
        return false;
      } else {
        const setSuccessful = await addUser(
          this.removeEmptyStrings(data)
        );
        if (setSuccessful) {
          this.$message({
            message: "Der neue email wurde erfolgreich gespeichert",
            type: "success",
          });
        }
        return setSuccessful;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cancel-btn,
.confirm-btn,
.edit-btn {
  color: white;
  border-radius: 9px;
  margin-left: 0px;
  width: 100%;
  margin-top: 2px;
  margin-bottom: 2px;
}
.button-row{
  flex-wrap: nowrap;
}

</style>
