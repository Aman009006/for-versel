<template>
  <div class="add-button-content">
    <el-button
        :class="canCreate ? 'add-btn' : 'cancel-btn'"
        icon="icon-Plus"
        :style="!canCreate && 'margin-top: 10px; '"
        @click="openModal()"
    >
      Nutzer Hinzufügen
    </el-button>
  </div>

  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <svg-icon @click="cancel" class="addUser-modal-close-icon" :svg-icon-html="icons.close"/>
      <h3>Benutzer hinzufügen</h3>
      <div class="form-group">
        <p>Name</p>
        <input type="text" placeholder="Name" id="Name" v-model="name">
      </div>
      <div class="form-group">
        <p>E-Mail</p>
        <input type="text" placeholder="E-Mail" id="email" v-model="email">
      </div>
      <div class="form-group">
        <p>Rolle</p>
        <SingleSelect @selectOption="setEditableUserRole" isCreate :options="options"></SingleSelect>
      </div>
      <div class="modal-buttons">
        <button class="cancel-btn" @click="cancel">Abbrechen</button>
        <button class="confirm-btn" @click="save">Speichern</button>
      </div>
    </div>
    <div class="modal-bg" @click="cancel()"></div>
  </div>
</template>

<script>
import {addUser} from "@/api/users";
import SingleSelect from "@/components/SingleSelect/SingleSelect.vue";
import UsersUtilities from "@/store/utilities/UsersUtilities";
import {defaultRole} from "@/constants";
import icons from "@/icons";

export default {
  components: {SingleSelect},
  data() {
    return {
      showModal: false,
      email: '',
      name: '',
      role: defaultRole.defaultRole,
      options: this.$store.getters.allRoles,
    };
  },
  computed: {
    icons() {
      return icons
    },
  },
  props: {
    canCreate: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    openModal() {
      if (this.canCreate) {
        UsersUtilities.stopEditing(this.$store);
        this.showModal = true;
      } else {
        this.$message({
          message: "Sie haben keine Berechtigung zum Hinzufügen neuer Benutzer",
          type: "error",
        });
      }
    },
    save() {
      this.setUser();
    },
    setEditableUserRole(role) {
      this.role = role;
    },
    cancel() {
      this.showModal = false;
      this.email = "";
      this.name = "";
      this.role = defaultRole.defaultRole;
    },
    isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    },
    async setUser() {
      const data = {
        email: this.email,
        role: this.role?.toLowerCase(),
        name: this.name
      }

      if (!this.isValidEmail(this.email) || (this.name === '')) {
        this.$message({
          message: "Name or E-mail is invalid",
          type: "warning",
        });
        return false;
      } else {
        const setSuccessful = await addUser(data);
        if (setSuccessful) {
          this.$message({
            message: "Der neue email wurde erfolgreich gespeichert",
            type: "success",
          });
          await UsersUtilities.fetchUsers(this.$store);
          this.cancel()
        }
        return setSuccessful;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.add-button-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.addUser-modal-close-icon {
  width: 12px !important;
  position: absolute;
  top: 14px;
  right: 14px;
  cursor: pointer;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1001;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;

  .modal-bg {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(153, 153, 153, 0.70);
  }

  .modal-content {
    z-index: 1002;

    padding: 20px;
    background: $hsag-white;
    width: 450px;
    position: relative;
  }

  h3 {
    font-size: 30px;
    font-weight: 400;
    line-height: normal;
    margin: 0 0 10px 0;
  }

  .form-group {
    display: block;

    p {
      margin: 0 0 5px 0;
      color: $hsag-bluegrey;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
    }

    input {
      padding: 10px 20px;
      border-radius: 8px;
      background: $hsag-lightgrey;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      border: none;
      width: 100%;
      margin-bottom: 10px;
    }
  }

  .modal-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;

    button {
      padding: 10px;
      border-radius: 5px;
    }
  }
}

</style>
