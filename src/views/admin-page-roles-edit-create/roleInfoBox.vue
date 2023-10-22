<template>
  <div class="roleEditInfoBox infoBox">
    <div>
      <div class="role-name">
        <h1>Rollenübersicht:</h1>
        <input type="text" :value="roleName"/>
      </div>
      <span>
        <p style="font-size: 12px;">
         Beschreibungstext für die Rolle bitte hier eingeben:
        </p>
      </span>
    </div>
    <intentSearch class="intent-search" placeholder="Berechtigungs-Suche" searchScope="intentGroup"
                  :searchableArray="intentGroups" @filteredArray="updateIntentGroups">
    </intentSearch>
  </div>
  <roleTable :filteredArray="filteredArray"/>
</template>

<script>
import intentSearch from "../../components/IntentSearch/index.vue"
import roleTable from "@/views/admin-page-roles-edit-create/roleTable.vue";
export default {
  components: {
    roleTable,
    intentSearch,
  },
  data() {
    return {
      intentGroups: this.$store.getters.skillsWithIntents,
      filteredArray: this.$store.getters.skillsWithIntents,
      roleName: "Neue Rolle",
    };
  },
  mounted() {
    const queryParam = this.$route.query.role;
    if (!queryParam) {
      this.roleName = "Neue Rolle";
    }else if (queryParam !== 'none') {
      this.roleName = queryParam;
    }

  },
  methods: {
    updateIntentGroups(array) {
      this.filteredArray = array.slice();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.roleEditInfoBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .intent-search {
    min-width: 500px;
  }
  p {
    height: 80px;
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
}
</style>
