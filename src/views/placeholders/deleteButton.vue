<template>
    <el-table-column align="center" width="70">
        <template slot-scope="{row}">
            <template v-if="!row.edit">
                        <el-button class="delete-btn" size="small" icon="el-icon-delete" @click="deletePlaceholder(row)" />
            </template>
            <template v-else />
        </template>
    </el-table-column>
</template>

<script>
import { deletePlaceholder } from '@/api/placeholders';
import { dispatchNames } from '@/constants';

export default {
    computed: {
        currentPlaceholders() {
            return this.$store.getters.placeholders;
        }
    },
    methods: {
        async deletePlaceholder(row) {
            this.$confirm(
                'Soll der Platzhalter wirklich gelöscht werden?',
                'Achtung',
                {
                    confirmButtonText: 'Ja',
                    cancelButtonText: 'Abbrechen',
                    type: 'warning'
                }
            ).then(async () => {
                const deletionSuccessful = await deletePlaceholder(row.key);
                if (deletionSuccessful) {
                    this.$message({
                        message: 'Löschen erfolgreich',
                        type: 'success'
                    })
                }
                await this.$store.dispatch(dispatchNames.fetchPlaceholders)
            })
        }
    }
}
</script>


<style scoped lang="scss">
.delete-btn,
.delete-btn:hover {
    color: white !important;
    border-radius: 9px !important;
    margin-left: 0px !important;
    width: 100%;

    button {
        margin-top: 5px;
    }
}

.delete-btn {
    background-color: #fa4c4c !important;
    border-color: #fa4c4c !important;
}

.delete-btn:hover {
    background-color: #f78989 !important;
    border-color: #f78989 !important;
}
</style>