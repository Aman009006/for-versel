<template>
  <el-button
    class="add-btn"
    icon="icon-Plus"
    @click="openModal()"
  >
    Nutzer Hinzufügen
  </el-button>

  <div class="modal" v-if="showModal">
    <div class="modal-content">
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
        <select v-model="role" class="custom-select">
          <option>Admin</option>
          <option>Read</option>
          <option>Write</option>
        </select>
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
import UsersUtilities from "@/store/utilities/UsersUtilities";
import {addUser} from "@/api/users";

export default {
  data() {
    return {
      showModal: false,
      email: '',
      name: '',
      role: 'Read'
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    save() {
      this.setUser();
    },
    cancel() {
      this.showModal = false;
      this.email = "";
      this.name = "";
      this.role = "Read";
    },
    isValidEmail (email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    },
    async setUser() {
      const data = {
        email: this.email,
        role: this.role,
        name: this.name
      }

      if (!this.isValidEmail(this.email) || (this.name === '')) {
        this.$message({
          message: "Email is invalid",
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
    button {
      padding: 10px;
      border-radius: 5px;
    }
  }
}

</style>
