<template>
    <el-form-item class="intent-search">
        <span class="svg-container">
            <svg-icon :svg-icon-html="icons.search" />
        </span>
        <el-input placeholder="Intent Suche" v-model="intentSearchValue" id="intentSearchInput">
        </el-input>
    </el-form-item>
</template>

<script>
import { ref, watch } from "vue";
import icons from "@/icons/index";

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
    },
    computed: {
        icons() {
            return icons;
        },

    },
    methods: {
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

        watch(intentSearchValue, (newValue) => {

            filteredArray.value = props.searchableArray.filter((intent) => {
                const name = intent.SkillName || intent.name;
                const technicalIntent = intent.intent
                if (props.searchScope === 'intentGroup') {
                    return name.toLowerCase().includes(newValue.toLowerCase());
                } else {
                    return name.toLowerCase().includes(newValue.toLowerCase()) || technicalIntent.toLowerCase().includes(newValue.toLowerCase());
                }
            });

            emit("filteredArray", filteredArray.value);
        });

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