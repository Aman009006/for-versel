<template>
    <div class="intents-infobox">
        <h2>Dialog:</h2>
        <h1>{{ headline }}</h1>
    </div>
</template>
  
<script>
export default {
    name: "IntentGroupInfoBox",
    components: {},
    props: {
        headline: {
            type: String,
            required: true,
        },
    },
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
  