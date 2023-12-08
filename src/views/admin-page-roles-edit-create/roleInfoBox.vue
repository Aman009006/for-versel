<template v-if="intentGroups.length">
  <div class="roleEditInfoBox infoBox">
    <div class="role-content">
      <div class="role-name">
        <h1>Rollenübersicht:</h1>
        <input type="text" :readonly="disabled" v-model="roleName" />
      </div>
      <span>
        <p style="font-size: 12px;">
         Beschreibungstext für die Rolle bitte hier eingeben:
        </p>
        <textarea :readonly="disabled" class="role-description-input" type="text" v-model="roleDescription"/>
      </span>
    </div>
    <searchInput class="intent-search" placeholder="Berechtigungs-Suche"
                  :searchableArray="intentGroups" @filteredArray="updateIntentGroups">
    </searchInput>
  </div>
  <roleTable :roleEdit="roleEdit" :disabled="disabled" :filteredArray="filteredArray" :roleName="roleName" :roleDescription="roleDescription"/>
</template>

<script>
import searchInput from "@/components/SearchInput/index.vue";
import roleTable from "@/views/admin-page-roles-edit-create/roleTable.vue";
import RoleUtilities from "@/store/utilities/RoleUtilities";
export default {
  components: {
    roleTable,
    searchInput,
  },
  data() {
    return {
      filteredArray: this.$store.getters.roleAccesses,
      roleName: "Neue Rolle",
      roleDescription: "Neue Rolle description",
      roleEdit: false,
      disabled: false,
    };
  },
  computed: {
    intentGroups() {
      return this.$store.getters.roleAccesses
    }
  },
  async mounted() {
    const role = this.$route.query.role;
    const isWatch = this.$route.query.isWatch;
    this.disabled = isWatch === 'true'
    this.roleEdit = false;

    if (!role) {
      this.roleName = "Neue Rolle";
      await RoleUtilities.fetchRoleAccesses(this.$store, "new");
      this.updateIntentGroups(this.$store.getters.roleAccesses);

      return true
    } else {
      this.roleName = role;
      this.roleEdit = true;
      this.roleDescription = this.$store.getters.roleDescription;
      await RoleUtilities.fetchRoleAccesses(this.$store, role);
      this.updateIntentGroups(this.$store.getters.roleAccesses);
      localStorage.setItem('defaultRoleSettings', JSON.stringify(this.$store.getters.roleAccesses))

      return true
    }
  },
  methods: {
    updateIntentGroups(array) {
      this.filteredArray = array.slice();
    },
  },
  watch: {
    '$store.getters.roleAccesses': {
      handler: function (newRoleAccesses, oldRoleAccesses) {
        this.updateIntentGroups(newRoleAccesses);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.roleEditInfoBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .intent-search {
    max-width: 500px;
    width: 100%;
  }
  p {
    margin-bottom: 0;
  }
}
.role-name {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  h1 {
    margin: 0;
  }
}
.role-content {
  input {
    border: none;
    background: $hsag-lightgrey;
    font-size: 24px;
    font-weight: bold;
    margin-left: 6px;
  }
  input:focus {
    border: none;
    outline: none;
  }
  textarea {
    border: none;
    background: $hsag-lightgrey;
    font-size: 24px;
    font-weight: bold;
    margin-left: 6px;
  }
  textarea:focus {
    border: none;
    outline: none;
  }
  .role-description-input {
    width: 100%;
    padding-right: 20px;
    font-size: 12px;
    font-weight: normal;
    margin: 0;
  }
}
</style>
