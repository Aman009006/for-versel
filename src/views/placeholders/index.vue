<template>
    <div class="placeholder-element-container">
        <h1 style="font-size:18px;">Platzhalter</h1>
        <placeholderInfoBox />

        <placeholderTable />
    </div>
</template>

<script>
import placeholderInfoBox from './placeholderInfoBox.vue'
import placeholderTable from './placeholderTable.vue'

export default {
    components: {
        placeholderInfoBox,
        placeholderTable
    }
}
</script>

<style scoped lang="scss">
.placeholder-element-container {
    padding: 0px 15px;
}
</style>