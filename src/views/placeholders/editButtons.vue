<template>
  <el-table-column align="center" width="130">
    <template #default="{ row: placeholder }">
      <!-- When the editing mode is turned on: -->
      <template v-if="isPlaceholderEditing(placeholder)">
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
          @click="removeInputFields(placeholder)"
        >
          Abbrechen
        </el-button>
      </template>
      <!-- When the editing mode is turned off: -->
      <template v-else>
        <el-button
          :class="canEdit ? 'edit-btn' : 'cancel-btn'"
          icon="icon-Edit"
          @click="startEdit(placeholder)"
        >
          Bearbeiten
        </el-button>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { updatePlaceholder, setPlaceholder } from "@/api/placeholders";
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";

export default {
  computed: {
    currentPlaceholders() {
      return this.$store.getters.placeholders;
    },
  },
  props: {
    canEdit: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    isPlaceholderEditing(placeholder) {
      const isEditing = PlaceholderUtilities.isPlaceholderEditing(
        this.$store,
        placeholder
      );
      return isEditing;
    },
    async startEdit(placeholder) {
      if (this.canEdit) {
        PlaceholderUtilities.startEditingPlaceholder(
          this.$store,
          placeholder.key
        );
      } else {
        this.$message({
          message: "Sie haben keine Berechtigung zum Bearbeiten der Platzhalter",
          type: "error",
        });
      }
    },
    removeInputFields(placeholder) {
      PlaceholderUtilities.stopCreatingOrAddingPlaceholder(this.$store, placeholder);
    },
    async confirmEdit(placeholder) {
      let savedSuccessfully = true;
      if (placeholder.key !== "" && placeholder.value !== "") {
        if (PlaceholderUtilities.isNewPlaceholder(this.$store, placeholder)) {
          savedSuccessfully = await this.setPlaceholder(placeholder);
        } else {
          savedSuccessfully = await this.updatePlaceholder(placeholder);
        }
      } else {
        this.$message({
          message: "Bitte Platzhalterbezeichnung und Wert eingeben",
          type: "warning",
        });
        savedSuccessfully = false;
      }

      if (savedSuccessfully) {
        await PlaceholderUtilities.fetchPlaceholders(this.$store);
        this.removeInputFields(placeholder);
      }
    },
    getEditablePlaceholder(placeholderKey) {
      return PlaceholderUtilities.getEditablePlaceholder(
        this.$store,
        placeholderKey
      );
    },
    async updatePlaceholder(currentPlaceholder) {
      const newPlaceholder = this.getEditablePlaceholder(
        currentPlaceholder.key
      );
      if (
        newPlaceholder.key == currentPlaceholder.key &&
        newPlaceholder.value == currentPlaceholder.value
      ) {
        this.$message({
          message: "Es wurden keine Änderungen erkannt",
          type: "warning",
        });
        return false;
      } else {
        const updateSuccessful = await updatePlaceholder(
          newPlaceholder.key,
          newPlaceholder.value,
          currentPlaceholder.key
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
      const setSuccessful = await setPlaceholder(
        placeholder.key,
        placeholder.value
      );
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
</style>
