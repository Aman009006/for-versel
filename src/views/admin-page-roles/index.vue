<template>
  <div class="role-element-container infobox-container">
    <roleInfoBox />
    <roleTable />
  </div>
</template>

<script>
import roleInfoBox from "./roleInfoBox.vue";
import roleTable from "./roleTable.vue";

export default {
  components: {
    roleInfoBox,
    roleTable,
  },
};
</script>

