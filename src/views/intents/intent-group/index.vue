<template>
    <intentContainer v-for="child in children" :intent="child">{{ child.name }}</intentContainer>
</template>

<script>
import intentContainer from './intentContainer.vue';
export default {
    name: "IntentGroup",
    components: {
        intentContainer,
    },
    props: {
        children: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped></style>