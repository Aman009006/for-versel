<template>
    <el-form-item class="intent-search">
        <span class="svg-container">
            <svg-icon :svg-icon-html="icons.search" />
        </span>
        <el-input :placeholder="placeholder ? placeholder : 'Intent Suche'" v-model="intentSearchValue">
        </el-input>
    </el-form-item>
</template>

<script>
import { ref, watch } from "vue";
import icons from "@/icons/index";
import { searchIntentGroup, searchSingleIntent } from "@/utils/intentSearch/intentSearch.js";
import SearchUtilities from "@/store/utilities/SearchUtilities";
import { useStore } from 'vuex';

export default {
    name: "IntentSearch",
    props: {
        searchableArray: {
            type: Array,
            required: true,
        },
        searchScope: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: false,
        },
    },
    computed: {
        icons() {
            return icons;
        },

    },
    methods: {
        /**
         * add overflow to main app to prevent the scrollbar from disappearing
         * which would result in a jump of the content
         */
        addOverflowToMainApp() {
            document.body.style.overflowY = "scroll";
        }
    },
    mounted() {
        this.addOverflowToMainApp();
    },
    setup(props, { emit }) {
        const intentSearchValue = ref("");
        const filteredArray = ref(props.searchableArray);
        const store = useStore();

        function filterArray(newValue) {
          SearchUtilities.addSearchTextToStore(store, newValue)

            filteredArray.value = props.searchableArray.filter((intent) => {
                if (props.searchScope === 'intentGroup') {
                    return searchIntentGroup(intent, newValue);
                } else {
                    return searchSingleIntent(intent, newValue);
                }
            });

            emit("filteredArray", filteredArray.value);
        }

        watch(intentSearchValue, filterArray)

        return {
            intentSearchValue,
            filteredArray
        };
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.intent-search {
    background-color: #E8EEF2;
    border-radius: 5px;
    caret-color: $hsag-bluegrey;
    margin-bottom: 0;

    &:focus-within {
        background-color: #e6eaed;
    }

    :first-child {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        background: none;
        box-shadow: none;
        height: 55px;
    }

    .svg-container {
        display: flex;
        align-items: center;
        color: $hsag-black;
        width: 50px;
        padding: 0 15px;
    }
}
</style>
