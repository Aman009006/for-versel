<template>
  <el-table-column label="Aktion" align="start" width="206px">
    <template #default="{ row: user }">
      <!-- When the editing mode is turned on: -->
      <template v-if="isUserEditing(user)">

        <el-row class="button-row">
          <el-col class="custom-el-col" :span="12">
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
                class="cancel-btn"
                icon="icon-Close"
                @click="removeInputFields()"
            />
          </el-col>
        </el-row>
      </template>

      <!-- When the editing mode is turned off: -->
      <template v-else>
        <div v-if="isNotCurrentSelectedUser(user) && !withoutShadow" class="shadow-table"></div>

        <el-row :class="isDefaultRole ? 'button-row-wrap' : 'button-row'" align="middle">
          <el-col class="button-col custom-el-col" :span="12">
            <el-button
                v-if="!isDefaultRole"
                :class="canEdit ? 'edit-btn' : 'cancel-btn'"
                icon="icon-Edit"
                @click="startEdit(user) , isNotCurrentSelectedUser(user)"
            >
              Bearbeiten
            </el-button>
          </el-col>
          <el-col class="button-col" :span="12">
            <el-button
                v-if="isEditRole"
                class="confirm-btn custom-el-button"
                @click="redirectToEdit(user, true)"
            >
              <svg-icon class="custom-svg" :svg-icon-html="icons.eyeOpen"/>
            </el-button>

            <el-button
                v-if="!isDefaultRole"
                :class="canDelete ? 'delete-btn delete-margin custom-el-button' : 'cancel-btn custom-el-button'"
                icon="icon-Delete"
                @click="isEditRole ? deleteRole(user) : deleteUser(user)"
            />
          </el-col>
        </el-row>
      </template>

    </template>

  </el-table-column>
</template>

<script>
import UsersUtilities from "@/store/utilities/UsersUtilities";
import {deleteRole, deleteUser, editUser} from "@/api/users";
import {paths} from "@/constants";
import icons from "@/icons/index";
import RoleUtilities from "@/store/utilities/RoleUtilities";

export default {
  props: {
    isEditRole: {
      type: Boolean,
      required: false,
    },
    canEdit: {
      type: Boolean,
      required: false,
    },
    canDelete: {
      type: Boolean,
      required: false,
    },
    isDefaultRole: {
      type: Boolean,
      required: false,
    },
    withoutShadow: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    icons() {
      return icons
    },
  },
  methods: {
    redirectToEdit(user, isWatch) {
      const role = user.role;
      RoleUtilities.setRoleDescriptionUtils(this.$store, user.description)
      this.$router.push(paths.permissionSettings + "?role=" + role + "&isWatch=" + isWatch);
    },
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
    removeInputFields() {
      UsersUtilities.stopEditing(this.$store);
    },
    async startEdit(user) {
      if (this.canEdit) {
        if (this.isEditRole) {
          this.redirectToEdit(user)
        } else {

          this.isNotCurrentSelectedUser(user)
          UsersUtilities.startEditingUser(
              this.$store,
              user
          );
        }
      } else {
        const message = this.isEditRole ? "Sie haben keine Berechtigung zum Bearbeiten der Rollen" :
            "Sie haben keine Berechtigung zum Bearbeiten der Benutzer";
        this.$message({
          message: message,
          type: "error",
        });
      }
    },
    async deleteRole(user) {
      if (this.canDelete) {
        this.$confirm(
            `Sind Sie sich sicher, dass Sie den die Rolle ${user.role} löschen möchten? ` +
            '<strong>Diese Aktion kann nicht rückgängig gemacht werden.</strong> Bitte beachten Sie, dass es noch aktive Nutzer gibt, welche diese Rolle verwenden. Falls die Rolle gelöscht wird, haben die betroffenen Nutzer nur noch lesenden Zugriff und können keine Anpassungen mehr vornehmen.',
            "Rolle löschen",
            {
              confirmButtonText: "Ja löschen",
              cancelButtonText: "Abbrechen",
              type: "default",
              dangerouslyUseHTMLString: true,
            }
        )
            .then(async () => {
              const deletionSuccessful = await deleteRole(user.role);
              if (deletionSuccessful) {
                this.$message({
                  message: "Löschen erfolgreich",
                  type: "success",
                });
                await RoleUtilities.fetchRoles(this.$store);
              }
            })
            .catch(() => {
            });
      } else {
        this.$message({
          message: "Sie haben keine Berechtigung, Rollen zu löschen",
          type: "error",
        });
      }
    },
    async deleteUser(user) {
      if (this.canDelete) {
        this.$confirm(
            `Sind Sie sich sicher, dass sie den Benutzer <strong>“${user.email}”</strong> löschen\n` +
            "wollen? Diese Aktion ist nicht rückgängig zu machen.",
            "Benutzer löschen",
            {
              confirmButtonText: "Ja löschen",
              cancelButtonText: "Abbrechen",
              type: "default",
              dangerouslyUseHTMLString: true,
              closeIcon: '<svg-icon>' + icons.close + '</svg-icon>',
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
            .catch(() => {
            });
      } else {
        this.$message({
          message: "Sie haben keine Berechtigung, Benutzer zu löschen",
          type: "error",
        });
      }
    },
    async confirmEdit(user) {
      let savedSuccessfully = true;
      if (user.email !== "" && user.name !== "") {
        savedSuccessfully = await this.updateUser(user);
      } else {
        this.$message({
          message: "E-Mail darf nicht leer sein",
          type: "warning",
        });
        savedSuccessfully = false;
      }

      if (savedSuccessfully) {
        await UsersUtilities.fetchUsers(this.$store);
        this.removeInputFields();
      }
    },
    getEditableUser(userEmail) {
      return UsersUtilities.getEditableUser(
          this.$store,
          userEmail
      );
    },
    isValidEmail(email) {
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
      if (obj.newEmail && obj.newEmail === obj.email) {
        return {
          email: obj.email,
          newPassword: obj.newPassword
        };
      } else {
        return result;
      }
    },
    async updateUser(user) {
      const newUser = this.getEditableUser(
          user.email
      );
      if (newUser.email === user.email && newUser.name === user.name && newUser.role === user.role) {
        this.$message({
          message: "Es wurden keine Änderungen erkannt",
          type: "warning",
        });
        return false;
      } else if (!this.isValidEmail(newUser.email)) {
        this.$message({
          message: "Email is invalid",
          type: "warning",
        });
        return false;
      } else {
        const data = {
          email: user.email,
          newEmail: newUser.email === user.email ? '' : newUser.email,
          newName: newUser.name === user.name ? '' : newUser.name,
          newRole: newUser.role === user.role ? '' : newUser.role,
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

.button-row {
  flex-wrap: nowrap;
}

.button-row-wrap {
  flex-wrap: wrap;
}

.delete-margin {
  margin-left: 12px !important;
}

.custom-svg {
  width: 12px !important;
}

.custom-el-button {
  border-radius: 10px;
  width: 33px;
}

.custom-el-col {
  margin-right: 10px;
}

</style>
