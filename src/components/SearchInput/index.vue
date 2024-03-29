<template>
    <el-form-item class="intent-search">
        <span class="svg-container">
            <svg-icon :svg-icon-html="icons.search" />
        </span>
        <el-input :placeholder="placeholder ? placeholder : 'Intent Suche'" v-model="searchValue">
        </el-input>
    </el-form-item>
</template>

<script>
import {computed, ref, watch} from "vue";
import icons from "@/icons/index";
import {searchComponentData} from "@/utils/componentSearch/componentSearch.js";
import SearchUtilities from "@/store/utilities/SearchUtilities";
import { useStore } from 'vuex';

export default {
    name: "SearchInput",
    props: {
        searchableArray: {
            type: Array,
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
        const store = useStore();
        const searchValueFromProps = computed(() => {
          return store.getters.search;
        });
        const searchValue = ref(searchValueFromProps.value);
        const filteredArray = ref(props.searchableArray);

        function filterArray(newValue) {
          SearchUtilities.addSearchTextToStore(store, newValue)
          searchValue.value = newValue
            filteredArray.value = props.searchableArray.filter((intent) => {
              return searchComponentData(intent, newValue)
            });

            emit("filteredArray", filteredArray.value);
        }

        watch(searchValue, filterArray, { immediate: true, deep: true })
        watch(searchValueFromProps, filterArray,{ immediate: true, deep: true })

        return {
            searchValue,
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
