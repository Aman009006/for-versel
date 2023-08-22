<template>
    <el-input placeholder="Suche" v-model="intentSearchValue" id="intentSearch">
    </el-input>
</template>

<script>
import { ref, watch } from "vue";

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

<style lang="scss" scoped></style>