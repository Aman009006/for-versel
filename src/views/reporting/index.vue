<template>
    <iframe :title="customer" :src="combinedLink" frameborder="0" allowFullScreen="true">
    </iframe>
</template>

<script>
export default {
    name: "Reporting",
    components: {},
    props: {
        customer: {
            type: String,
            required: true
        },
        powerBiReportId: {
            type: String,
            required: true
        }
    },
    created() {
        this.combinedLink = `https://app.powerbi.com/reportEmbed?reportId=${this.powerBiReportId}&autoAuth=true`;
    },
    data() {
        return {};
    }
};
</script>

<style>
iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 34px);
}
</style>