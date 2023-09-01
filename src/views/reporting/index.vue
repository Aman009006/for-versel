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
        this.combinedLink = `https://app.powerbi.com/reportEmbed?reportId=${this.powerBiReportId}&autoAuth=true&ctid=58edcd46-9a0e-4d7f-9e4d-8da23bf52b1c`;
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
    height: 100%;
}
</style>