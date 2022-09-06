<template>
  <el-table-column align="center" width="130">
    <template #default="{ row }">
      <!-- When the editing mode is turned on: -->
      <template v-if="row.edit">
        <el-button class="confirm-btn" :icon="ElIconDownload" @click="confirmEdit(row)">
          Speichern
        </el-button>
        <el-button class="cancel-btn" :icon="ElIconRefresh" @click="cancelEdit()">
          Abbrechen
        </el-button>
      </template>
      <!-- When the editing mode is turned off: -->
      <template v-else>
        <el-button class="edit-btn" :icon="ElIconEdit" @click="toggleEdit(row)">
          Bearbeiten
        </el-button>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import {
  Download as ElIconDownload,
  Refresh as ElIconRefresh,
  Edit as ElIconEdit,
} from "@element-plus/icons";
import { updatePlaceholder, setPlaceholder } from "@/api/placeholders";
import { dispatchNames } from "@/constants";

export default {
  data() {
    return {
      isEdit: false,
      currentPlaceholderData: [],
      ElIconDownload,
      ElIconRefresh,
      ElIconEdit,
    };
  },
  computed: {
    currentPlaceholders() {
      return this.$store.getters.placeholders;
    },
  },
  methods: {
    async toggleEdit(row) {
      row.originalKey = row.key;
      row.originalValue = row.value;
      row.edit = true;
      this.isEdit = true;
      this.currentPlaceholderData = this.currentPlaceholders;
    },
    async cancelEdit() {
      this.isEdit = false;
      await this.$store.dispatch(dispatchNames.fetchPlaceholders);
    },
    async confirmEdit(row) {
      let fetchPlaceholders = true;
      if (row.key !== "" && row.value !== "") {
        if (this.isEdit) {
          fetchPlaceholders = await this.updatePlaceholder(row);
        } else {
          fetchPlaceholders = await this.setPlaceholder(row);
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
    async updatePlaceholder(row) {
      if (row.key == row.originalKey && row.value == row.originalValue) {
        this.$message({
          message: "Es wurden keine Änderungen erkannt",
          type: "warning",
        });
        return false;
      } else {
        const updateSuccessful = await updatePlaceholder(
          row.key,
          row.value,
          row.originalKey
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
    async setPlaceholder(row) {
      const setSuccessful = await setPlaceholder(row.key, row.value);
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
