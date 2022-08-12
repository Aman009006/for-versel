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

            row.placeholderValue = row.originalValue;

            this.$message({
                message: 'Die Änderungen wurden abgebrochen.',
                type: 'warning'
            })
        },
        async confirmEdit(row) {
            row.edit = false;
            let changesMade = false;

            if (row.originalValue !== row.placeholderValue) {
                /**
                 * @todo send data to the backend
                 */
                row.originalValue = row.placeholderValue;
                changesMade = true;
            }
            if (!changesMade) {
                // set the info message for this case
                this.$message({
                    message: 'Es wurden keine Änderungen gemacht',
                    type: 'warning'
                })
            }
        }

    }
}
</script>

<style scoped lang="scss">
.cancel-btn, .confirm-btn, .edit-btn, .cancel-btn:hover, .confirm-btn:hover, .edit-btn:hover {
    color: white !important;
    border-radius: 9px !important;
    margin-left: 0px !important;
    width: 100%;

    button {
        margin-top: 5px;
    }
}

.cancel-btn {
    background-color: #fa4c4c !important;
    border-color: #fa4c4c !important;
}

.cancel-btn:hover {
    background-color: #f78989 !important;
    border-color: #f78989 !important;
}

.confirm-btn {
    background-color: #63c731 !important;
    border-color: #63c731 !important;
}

.confirm-btn:hover {
    background-color: #85ce61 !important;
    border-color: #85ce61 !important;
}

.edit-btn {
    border: solid #409eff 2px !important;
    background-color: #409eff !important;
}

.edit-btn:hover {
    border: solid #66b1ff 2px !important;
    background-color: #66b1ff !important;
}
</style>