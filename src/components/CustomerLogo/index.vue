<template>
    <div class="customer-logo">
        <el-image class="logo" :src="logo">
        </el-image>
    </div>
</template>

<script>

export default {
    name: 'CustomerLogo',
    data() {
        return {
            logo: '',
        }
    },
    created() {
        this.logo = this.$store.getters.metainfo.logo_link;
    },
}
</script>

<style lang="scss" scoped>
.customer-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    margin: 0 20px;
    mix-blend-mode: multiply;
}
</style>