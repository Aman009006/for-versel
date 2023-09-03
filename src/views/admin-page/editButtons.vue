<template>
  <el-table-column class="custom-first-column" label="Aktion" align="start" width="206px">
    <template #default="{ row: user }">
      <!-- When the editing mode is turned on: -->
      <template v-if="isUserEditing(user)">

        <el-row>
          <el-col style="margin-right: 10px" span="12">
            <el-button
              class="confirm-btn"
              icon="icon-Check"
              @click="confirmEdit(user)"
            >
              Speichern
            </el-button>
          </el-col>
          <el-col span="12">
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
        <div v-if="getSelectedUser(user)" class="shadow-text"></div>

        <el-row class="button-row" align="middle">
          <el-col style="margin-right: 10px" class="button-col" span="12">
            <el-button
              class="edit-btn"
              icon="icon-Edit"
              @click="startEdit(user) , getSelectedUser(user)"
            >
              Bearbeiten
            </el-button>
          </el-col>
          <el-col class="button-col" span="12">
            <el-button
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

export default {
  computed: {
    currentUsers() {
      return this.$store.getters.users;
    }
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
    removeInputFields(user) {
      this.resetPassword()
      UsersUtilities.stopCreatingOrAddingUser(this.$store, user);
    },

    async startEdit(user) {
      UsersUtilities.startEditingUser(
        this.$store,
        user.email
      );
    },
    async deleteUser(user) {
      this.$confirm(
        "Sind Sie sich sicher, dass sie den Benutzer “John Smith” löschen\n" +
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
          message: "Bitte Platzhalterbezeichnung und Wert eingeben",
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
    resetPassword () {
      return UsersUtilities.editPassword(
        this.$store,
        ''
      );
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
        newUser.email == user.email && password === ''
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
          this.resetPassword()
          this.$message({
            message: "Die Änderungen wurden erfolgreich gespeichert",
            type: "success",
          });
        }
        console.log(updateSuccessful,'updateSuccessful')
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
          this.resetPassword()
          this.$message({
            message: "Der neue Platzhalter wurde erfolgreich gespeichert",
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
.edit-btn,
.cancel-btn:hover,
.confirm-btn:hover,
.edit-btn:hover {
  color: white !important;
  border-radius: 9px !important;
  margin-left: 0px !important;
  width: 100%;
  margin-top: 2px;
  margin-bottom: 2px;
}
.shadow-text{
  background: #000;
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: 99;
}

.cancel-btn {
  background: red;
}
.el-table .custom-first-column {
  background-color: red !important; /* Здесь используем !important для переопределения стилей */
  /* Дополнительные стили, если необходимо */
}

</style>
