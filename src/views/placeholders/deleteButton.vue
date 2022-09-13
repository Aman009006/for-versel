<template>
  <el-table-column align="center" width="70">
    <template #default="{ row }">
      <template v-if="!isPlaceholderEditing(row.key)">
        <el-button
          class="delete-btn"
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
  methods: {
    isPlaceholderEditing(placeholderKey) {
      const isEditing = PlaceholderUtilities.isPlaceholderEditing(
        this.$store,
        placeholderKey
      );
      return isEditing;
    },
    async deletePlaceholder(row) {
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
    },
  },
};
</script>

<style lang="scss" scoped>
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
  background-color: #fa4c4c !important;
  border-color: #fa4c4c !important;
}

.delete-btn:hover {
  background-color: #f78989 !important;
  border-color: #f78989 !important;
}
</style>
