<template>
  <el-table-column align="center" width="130">
    <template #default="{ row: placeholder }">
      <!-- When the editing mode is turned on: -->
      <template v-if="placeholder.edit">
        <el-button
          class="confirm-btn"
          icon="icon-Download"
          @click="confirmEdit(placeholder)"
        >
          Speichern
        </el-button>
        <el-button
          class="cancel-btn"
          icon="icon-Refresh"
          @click="cancelEdit(placeholder)"
        >
          Abbrechen
        </el-button>
      </template>
      <!-- When the editing mode is turned off: -->
      <template v-else>
        <el-button class="edit-btn" icon="icon-Edit" @click="toggleEdit(placeholder)">
          Bearbeiten
        </el-button>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { updatePlaceholder, setPlaceholder } from "@/api/placeholders";
import { dispatchNames } from "@/constants";

export default {
  data() {
    return {
      currentPlaceholderData: [],
    };
  },
  computed: {
    currentPlaceholders() {
      return this.$store.getters.placeholders;
    },
  },
  methods: {
    async toggleEdit(placeholder) {
      placeholder.originalKey = placeholder.key;
      placeholder.originalValue = placeholder.value;
      placeholder.edit = true;
      this.currentPlaceholderData = this.currentPlaceholders;
    },
    async cancelEdit(placeholder) {
      this.resetToOriginalPlaceholder(placeholder);
      this.removeInputFields(placeholder);
    },
    resetToOriginalPlaceholder(placeholder) {
      placeholder.key = placeholder.originalKey;
      placeholder.value = placeholder.originalValue;
      delete placeholder.originalKey;
      delete placeholder.originalValue;
    },
    removeInputFields(placeholder) {
      placeholder.edit = false;
    },
    async confirmEdit(placeholder) {
      let fetchPlaceholders = true;
      if (placeholder.key !== "" && placeholder.value !== "") {
        if (placeholder.insertPlaceholder) {
          fetchPlaceholders = await this.setPlaceholder(placeholder);
        } else {
          fetchPlaceholders = await this.updatePlaceholder(placeholder);
        }
      } else {
        this.$message({
          message: "Bitte Platzhalterbezeichnung und Wert eingeben",
          type: "warning",
        });
        fetchPlaceholders = false;
      }

      if (fetchPlaceholders) {
        await this.$store.dispatch(dispatchNames.fetchPlaceholders);
      }
    },
    async updatePlaceholder(placeholder) {
      if (placeholder.key == placeholder.originalKey && placeholder.value == placeholder.originalValue) {
        this.$message({
          message: "Es wurden keine Änderungen erkannt",
          type: "warning",
        });
        return false;
      } else {
        const updateSuccessful = await updatePlaceholder(
          placeholder.key,
          placeholder.value,
          placeholder.originalKey
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
    async setPlaceholder(placeholder) {
      const setSuccessful = await setPlaceholder(placeholder.key, placeholder.value);
      if (setSuccessful) {
        this.$message({
          message: "Der neue Platzhalter wurde erfolgreich gespeichert",
          type: "success",
        });
      }
      return setSuccessful;
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

.cancel-btn {
  background-color: #fa4c4c !important;
  border-color: #fa4c4c !important;
}

.cancel-btn:hover {
  background-color: #f78989 !important;
  border-color: #f78989 !important;
}

.confirm-btn {
  background-color: #63c731 !important;
  border-color: #63c731 !important;
}

.confirm-btn:hover {
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
}

.edit-btn {
  border: solid #409eff 2px !important;
  background-color: #409eff !important;
}

.edit-btn:hover {
  border: solid #66b1ff 2px !important;
  background-color: #66b1ff !important;
}
</style>
