<template>
  <div>
    <template v-if="dataReady">
      <el-table :data="allUsers" stripe :cell-class-name="startEditingRow">
        <el-table-column
            align="start"
            autosize
            label="Name"
            prop="key"
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <el-input
                  :modelValue="getEditableUser(row.email)?.name"
                  autosize
                  class="edit-input"
                  type="textarea"
                  @update:modelValue="
                  (newKey) => setEditableUser(row.email, newKey, 'name')
                "
              />
            </template>
            <template v-else>
              <div v-if="isNotCurrentSelectedUser(row)" class="shadow-table"></div>
              <span class="text-input">{{ row.name }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
            align="start"
            autosize
            label="E-Mail"
            prop="key"
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <el-input
                  :modelValue="getEditableUser(row.email)?.email"
                  autosize
                  class="edit-input"
                  type="textarea"
                  @update:modelValue="
                  (newKey) => setEditableUser(row.email, newKey, 'email')
                "
              />
            </template>
            <template v-else>
              <div v-if="isNotCurrentSelectedUser(row)" class="shadow-table"></div>
              <span class="text-input">{{ row.email }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
            align="start"
            autosize
            label="Zugewiesene Rolle"
            prop="key"
        >
          <template #default="{ row }">
            <template v-if="isUserEditing(row)">
              <SingleSelect :user="row.email" isCreate :options="options" v-model="selectedRole"
                            :selectedValue="row.role"></SingleSelect>
            </template>
            <template v-else>
              <div v-if="isNotCurrentSelectedUser(row)" class="shadow-table"></div>
              <span class="text-input">{{ row.role }}</span>
            </template>
          </template>
        </el-table-column>
        <editButtons :canEdit="canEdit" :canDelete="canDelete"/>
      </el-table>
      <addButtonAdmin :canCreate="canCreate"/>
    </template>
  </div>
</template>

<script>
import editButtons from "./editButtons.vue";
import addButtonAdmin from "./addButtonAdmin.vue";
import UsersUtilities from "@/store/utilities/UsersUtilities";
import icons from "@/icons";
import {Select} from "@element-plus/icons-vue";
import {checkAccessesForActions} from "@/utils/checkAccessesUtils";
import {userAccesses} from "@/constants";
import SingleSelect from "@/components/SingleSelect/SingleSelect.vue";

export default {
  components: {
    SingleSelect,
    Select,
    editButtons,
    addButtonAdmin,
  },
  data() {
    return {
      dataReady: false,
      canEdit: false,
      canCreate: false,
      canDelete: false,
      options: this.$store.getters.allRoles,
      selectedRole: '',
    };
  },
  computed: {
    allUsers() {
      return UsersUtilities.getAllUsers(this.$store);
    },
    icons() {
      return icons;
    },
  },
  async created() {
    /**
     * Fetch the data when the view is created
     * and the data is already being observed
     */
    await this.loadData();
  },
  mounted() {
    this.checkAccesses()
  },
  methods: {
    checkAccesses() {
      const intents = this.$store.getters.accesses;
      this.canEdit = checkAccessesForActions(intents, userAccesses.users, userAccesses.edit);
      this.canCreate = checkAccessesForActions(intents, userAccesses.users, userAccesses.create);
      this.canDelete = checkAccessesForActions(intents, userAccesses.users, userAccesses.delete);
    },
    startEditingRow({row, column}) {
      if (this.isUserEditing(row) && column.label === "Zugewiesene Rolle") {
        return 'table-dropdown'
      }
    },
    isUserEditing(user) {
      const isEditing = UsersUtilities.isUserEditing(
          this.$store,
          user
      );
      return isEditing;
    },
    isNotCurrentSelectedUser(user) {
      const selectedRow = Object.values(this.$store._state.data.users.editableUsers)[0]?.email;
      if (selectedRow !== undefined) {
        return selectedRow !== user.email
      }
      return false
    },
    async loadData() {
      await UsersUtilities.fetchUsers(this.$store);
      this.dataReady = true;
    },
    getEditableUser(user) {
      return UsersUtilities.getEditableUser(
          this.$store,
          user
      );
    },
    setEditableUser(user, newKey, key) {
      const editableUser = this.getEditableUser(user);
      editableUser[key] = newKey;
    },
  },
};
</script>
