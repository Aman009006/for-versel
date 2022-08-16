<template>
    <el-table class="addPlaceholder">
        <el-table-column>
            <template v-if="showTableRow">
                TEST
            </template>
            <template v-else>
                <el-button class="confirm-btn" size="small" icon="el-icon-plus" @click="addPlaceholder()">
                    Neuen Platzhalter hinzufügen
                </el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>

export default ({
    data() {
        return {
            showTableRow: false
        }
    },
    methods: {
        async addPlaceholder() {
            this.showTableRow = true;
        }
    }
})
</script>
