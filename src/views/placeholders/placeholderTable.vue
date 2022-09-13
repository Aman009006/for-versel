<template>
  <div class="table-container">
    <template v-if="dataReady">
      <el-table :data="currentPlaceholders" class="placeholder_table" border>
        <el-table-column
          align="center"
          label="Platzhalterbezeichnung"
          prop="key"
          autosize
        >
          <template #default="{ row }">
            <template v-if="isPlaceholderEditing(row.key)">
              <el-input
                v-model="row.key"
                type="textarea"
                autosize
                class="edit-input"
              />
            </template>
            <template v-else>
              <span class="text-input">{{ row.key }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Wert" prop="value" autosize>
          <template #default="{ row }">
            <template v-if="isPlaceholderEditing(row.key)">
              <el-input
                v-model="row.value"
                type="textarea"
                autosize
                class="edit-input"
              />
            </template>
            <template v-else>
              <span class="text-input">{{ row.value }}</span>
            </template>
          </template>
        </el-table-column>

        <editButtons />

        <deleteButton />
      </el-table>

      <addButton />
    </template>
  </div>
</template>

<script>
import editButtons from "./editButtons.vue";
import addButton from "./addButton.vue";
import deleteButton from "./deleteButton.vue";
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";

export default {
  components: {
    editButtons,
    addButton,
    deleteButton,
  },
  data() {
    return {
      dataReady: false,
    };
  },
  computed: {
    currentPlaceholders() {
      return this.$store.getters.placeholders;
    },
  },
  async created() {
    /**
     * Fetch the data when the view is created
     * and the data is already being observed
     */
    await this.loadData();
  },
  methods: {
    isPlaceholderEditing(placeholderKey) {
      const isEditing = PlaceholderUtilities.isPlaceholderEditing(
        this.$store,
        placeholderKey
      );
      return isEditing;
    },
    async loadData() {
      await PlaceholderUtilities.fetchPlaceholders(this.$store);
      this.dataReady = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  font-size: 13px !important;
}

.table-container {
  position: relative;
  // The chatbot, which has a fixed position, should not cover the table
  margin-bottom: 50px;
}
</style>
