<template>
  <div class="placeholder-element-container infobox-container">
    <placeholderInfoBox />
    <placeholderTable />
  </div>
</template>

<script>
import placeholderInfoBox from "./placeholderInfoBox.vue";
import placeholderTable from "@/views/placeholders/placeholderTable.vue";

export default {
  name: "PlaceHolders",
  components: {
    placeholderTable,
    placeholderInfoBox,
  },
};
</script>
