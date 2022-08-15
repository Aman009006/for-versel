<template>
    <div class="table-container">
        <template v-if="dataReady">
            <el-table :data="placeholders" class="placeholder_table" border>
                <el-table-column align="center" label="Platzhalterbezeichnung" prop="key" autosize />
                <el-table-column align="center" label="Wert" prop="value" autosize>
                    <template slot-scope="{row}">
                        <template v-if="row.edit">
                            <el-input v-model="row.value" type="textarea" autosize class="edit-input" />
                        </template>
                        <template v-else>
                            <span class="text-input">{{ row.value }}</span>
                        </template>
                    </template>
                </el-table-column>
                <editButtons />
            </el-table>
        </template>
    </div>
</template>

<script>
import editButtons from './editButtons.vue'
import { getPlaceholders } from '@/api/placeholders';

export default {
    components: {
        editButtons
    },
    data() {
        return {
            dataReady: false,
            placeholders: []
        }
    },
    async created() {
        /**
         * Fetch the data when the view is created
         * and the data is already being observed
         */
        await this.loadData()
    },
    methods: {
        async loadData() {
            const placeholderData = await getPlaceholders();

            for (const data of placeholderData) {
                this.$set(data, 'edit', false);
                this.$set(data, 'originalValue', data.value);
            }

            this.placeholders = placeholderData;
            this.dataReady = true;
        }
    }
}
</script>


<style scoped lang="scss">
.el-table {
    font-size: 13px !important;
}

.table-container {
    position: relative;
    // The chatbot, which has a fixed position, should not cover the table
    margin-bottom: 120px;

    .disabled-layer {
        width: 100%;
        height: 100%;
        z-index: 2;
        position: absolute;
        background-color: rgb(239 239 239 / 77%);
    }
}
</style>