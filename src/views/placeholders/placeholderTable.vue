<template>
  <div class="table-container">
    <template v-if="allPlaceholders">
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
              <span class="text-input" v-html="addHighlightSearchWord(row.key, searchValue)"></span>
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
              <span class="text-input" v-html="addHighlightSearchWord(row.value, searchValue)"></span>
            </template>
          </template>
        </el-table-column>

        <editButtons :canEdit="canEdit"/>

        <deleteButton :canDelete="canDelete"/>
      </el-table>

      <addButton :canCreate="canCreate"/>
    </template>
  </div>
</template>

<script>
import editButtons from "./editButtons.vue";
import addButton from "./addButton.vue";
import deleteButton from "./deleteButton.vue";
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";
import addHighlightSearchWord from "@/utils/addHighlightSearchWordUtils";
import {checkAccessesForActions} from "@/utils/checkAccessesUtils";
import {userAccesses} from "@/constants";

export default {
  components: {
    editButtons,
    addButton,
    deleteButton,
  },
  data() {
    return {
      dataReady: false,
      canEdit: false,
      canCreate: false,
      canDelete: false,
    };
  },
  mounted() {
    this.checkAccesses()
  },
  computed: {
    searchValue() {
      return this.$store.getters.search
    },
    allPlaceholders() {
      return this.$store.getters.filteredPlaceholders
    }
  },
  methods: {
    addHighlightSearchWord,
    isPlaceholderEditing(placeholder) {
      const isEditing = PlaceholderUtilities.isPlaceholderEditing(
        this.$store,
        placeholder
      );
      return isEditing;
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
    checkAccesses() {
      const intents = this.$store.getters.accesses;
      this.canEdit = checkAccessesForActions(intents, userAccesses.placeholders, userAccesses.edit);
      this.canCreate = checkAccessesForActions(intents, userAccesses.placeholders, userAccesses.create);
      this.canDelete = checkAccessesForActions(intents, userAccesses.placeholders, userAccesses.delete);
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
