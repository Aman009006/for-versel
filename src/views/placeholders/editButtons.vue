<template>
    <el-table-column align="center" width="130">
        <template slot-scope="{row}">
            <!-- When the editing mode is turned on: -->
            <template v-if="row.edit">
                <el-button class="confirm-btn" size="small" icon="el-icon-download" @click="confirmEdit(row)">
                    Speichern
                </el-button>
                <el-button class="cancel-btn" size="small" icon="el-icon-refresh" @click="cancelEdit(row)">
                    Abbrechen
                </el-button>
            </template>
            <!-- When the editing mode is turned off: -->
            <template v-else>
                <el-button class="edit-btn" size="small" icon="el-icon-edit" @click="toggleEdit(row)">
                    Bearbeiten
                </el-button>
            </template>
        </template>
    </el-table-column>
</template>

<script>
export default {
    methods: {
        async toggleEdit(row) {
            row.edit = !row.edit;
        },
        async cancelEdit(row) {
            row.edit = false;

            this.$message({
                message: 'Die Änderungen wurden abgebrochen.',
                type: 'warning'
            })
        },
        async confirmEdit(row) {

        }
    }
}
</script>

<style scoped lang="scss">
.cancel-btn {
    color: white !important;
    background-color: #fa4c4c !important;
    border-color: #fa4c4c !important;
}

.cancel-btn:hover {
    color: white !important;
    background-color: #f78989 !important;
    border-color: #f78989 !important;
}

.confirm-btn {
    color: white !important;
    background-color: #63c731 !important;
    border-color: #63c731 !important;
}

.confirm-btn:hover {
    color: white !important;
    background-color: #85ce61 !important;
    border-color: #85ce61 !important;
}

.edit-btn {
    border-radius: 9px !important;
    margin-left: 0px !important;
    width: 100%;

    +button {
        margin-top: 5px;
    }

    border: solid #409eff 2px !important;
    color: white !important;
    background-color: #409eff !important;
}

.edit-btn:hover {
    border: solid #66b1ff 2px !important;
    color: white !important;
    background-color: #66b1ff !important;
}
</style>