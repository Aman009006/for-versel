<template>
    <div class="intents-infobox">
        <a :href="parentPath" @click="clearSearch">
            <span class="svg-container">
                <svg-icon :svg-icon-html="icons.arrowleft" />
            </span>
        </a>
        <div class="intent-group-headline">
            <h2>{{ dialogHeadline }}:</h2>
            <h1>{{ headline }}</h1>
        </div>
    </div>
</template>

<script>
import icons from "@/icons/index";
import SearchUtilities from "@/store/utilities/SearchUtilities";
import { intentConstants } from "@/constants";

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
        return {
            dialogHeadline: intentConstants.dialogs,
            parentPath: this.$route.meta.parentPath,
        };
    },
    computed: {
        icons() {
            return icons;
        },
    },
    methods: {
        updateIntentGroups(array) {
            this.filteredArray = array;
        },
        clearSearch() {
          SearchUtilities.addSearchTextToStore(this.$store, '')
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.intents-infobox {
    display: flex;
    flex-direction: row;
    width: 40%;

    a {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .svg-container {
            display: flex;
            align-items: center;
            color: $hsag-black;
            width: 50px;
            padding: 0 15px;
        }
    }

    .intent-group-headline {
        margin: 10px 0;

        h1 {
            margin: 0;
        }

        h2 {
            font-weight: normal;
            margin: 0;
        }
    }
}
</style>
