<template>
  <el-table-column align="center" width="70">
    <template #default="{ row }">
      <template v-if="!isPlaceholderEditing(row)">
        <el-button
          :class="canDelete ? 'delete-btn' : 'cancel-btn'"
          icon="icon-Delete"
          @click="deletePlaceholder(row)"
        />
      </template>
      <template v-else />
    </template>
  </el-table-column>
</template>

<script>
import { deletePlaceholder } from "@/api/placeholders";
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";

export default {
  computed: {
    currentPlaceholders() {
      return this.$store.getters.placeholders;
    },
  },
  props: {
    canDelete: {
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
    async deletePlaceholder(row) {
      if (this.canDelete) {
        this.$confirm(
            "Soll der Platzhalter wirklich gelöscht werden?",
            "Achtung",
            {
              confirmButtonText: "Ja",
              cancelButtonText: "Abbrechen",
              type: "warning",
            }
        )
            .then(async () => {
              const deletionSuccessful = await deletePlaceholder(row.key);
              if (deletionSuccessful) {
                this.$message({
                  message: "Löschen erfolgreich",
                  type: "success",
                });
              }
              await PlaceholderUtilities.fetchPlaceholders(this.$store);
            })
            .catch(() => {});
      } else {
        this.$message({
          message: "Sie haben keine Berechtigung zum Löschen von Platzhaltern",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" >
.delete-btn,
.delete-btn:hover {
  color: white !important;
  border-radius: 9px !important;
  margin-left: 0px !important;
  width: 100%;

  button {
    margin-top: 5px;
  }
}

.delete-btn {
  background-color: #FA5050 !important;
  border-color: #FA5050 !important;
}

.delete-btn:hover {
  background-color: #f78989 !important;
  border-color: #f78989 !important;
}
</style>
