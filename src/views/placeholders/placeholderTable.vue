<template>
  <div class="table-container">
    <template v-if="dataReady">
      <el-table :data="allPlaceholders" class="placeholder_table" stripe >
        <el-table-column
          align="center"
          label="Platzhalterbezeichnung"
          prop="key"
          autosize
        >
          <template #default="{ row }">
            <template v-if="isPlaceholderEditing(row)">
              <el-input
                type="textarea"
                autosize
                class="edit-input"
                :modelValue="getEditablePlaceholder(row.key).key"
                @update:modelValue="
                  (newKey) => setEditablePlaceholderKey(row.key, newKey)
                "
              />
            </template>
            <template v-else>
              <span class="text-input">{{ row.key }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Wert" prop="value" autosize>
          <template #default="{ row }">
            <template v-if="isPlaceholderEditing(row)">
              <el-input
                type="textarea"
                autosize
                class="edit-input"
                :modelValue="getEditablePlaceholder(row.key).value"
                @update:modelValue="
                  (newValue) => setEditablePlaceholderValue(row.key, newValue)
                "
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
    allPlaceholders() {
      return PlaceholderUtilities.getAllPlaceholders(this.$store);
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
    isPlaceholderEditing(placeholder) {
      const isEditing = PlaceholderUtilities.isPlaceholderEditing(
        this.$store,
        placeholder
      );
      return isEditing;
    },
    async loadData() {
      await PlaceholderUtilities.fetchPlaceholders(this.$store);
      this.dataReady = true;
    },
    getEditablePlaceholder(placeholderKey) {
      return PlaceholderUtilities.getEditablePlaceholder(
        this.$store,
        placeholderKey
      );
    },
    setEditablePlaceholderKey(placeholderKey, newKey) {
      const editablePlaceholder = this.getEditablePlaceholder(placeholderKey);
      editablePlaceholder.key = newKey;
    },
    setEditablePlaceholderValue(placeholderKey, newValue) {
      const editablePlaceholder = this.getEditablePlaceholder(placeholderKey);
      editablePlaceholder.value = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  position: relative;
  // The chatbot, which has a fixed position, should not cover the table
  margin-bottom: 50px;
}
</style>
