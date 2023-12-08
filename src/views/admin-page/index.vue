<template>
  <div class="user-element-container infobox-container">
    <userInfoBox />

    <userTable />
  </div>
</template>

<script>
import userInfoBox from "./userInfoBox.vue";
import userTable from "./userTable.vue";

export default {
  name: "Benutzer",
  components: {
    userInfoBox,
    userTable,
  },
};
</script>
