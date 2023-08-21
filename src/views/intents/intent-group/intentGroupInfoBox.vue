<template>
    <div class="intents-infobox">
        <h2>Dialog:</h2>
        <h1>Test</h1>
    </div>
</template>
  
<script>
export default {
    name: "IntentGroupInfoBox",
    components: {},
    data() {
        return {};
    },
    methods: {
        updateIntentGroups(array) {
            this.filteredArray = array;
        }
    },
};
</script>
  
<style lang="scss" scoped></style>
  