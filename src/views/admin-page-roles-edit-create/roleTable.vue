<template>
  <div>
    <div class="header">
      <span class="header-title">Berechtigungs Name</span>
      <span class="header-title">Read</span>
      <span class="header-title">Write</span>
    </div>
    <template v-if="intents.length">
      <div>
        <div v-for="intent in intents">
          <Accordion>
            <AccordionItem :read="checkIsAllSelected('read', intent.permissions)" :disabled="disabled" :write="checkIsAllSelected('write', intent.permissions)" :title="intent.permissionName">
              <div class="subItem" v-for="subIntent in intent.permissions">
                  <div class="accordion-subItem">
                      <p class="accordion-subItem-title" v-html="addHighlightSearchWord(subIntent.name, searchValue)"></p>
                    <div class="radio-input">
                      <label>
                        <input class="radio-custom" :disabled="disabled" :checked="subIntent.read" type="radio" :id="subIntent.name" :name="subIntent.name" value="option1">
                        <span @click="select(intent.permissionName, subIntent.name, 'read')" :class="`radio-button ${disabled && !subIntent.read && 'radio-button-disabled'} `"></span>
                      </label>
                    </div>
                    <div class="radio-input">
                      <label class="radio-input">
                        <input class="radio-custom" :disabled="disabled" :checked="subIntent.write" type="radio" :id="subIntent.name + '1'" :name="subIntent.name" value="option2">
                        <span @click="select(intent.permissionName, subIntent.name, 'write')" :class="`radio-button ${disabled && !subIntent.write && 'radio-button-disabled'} `"></span>
                      </label>
                    </div>
                  </div>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </template>
    <template v-else-if="!loading">
      <div class="empty-data">
        No Data
      </div>
    </template>
    <div v-if="!loading" class="role-table">
      <el-button
        :class="canCreate ? 'add-btn' : 'cancel-btn'"
        :style="!canCreate && 'margin-top: 10px'"
        icon="icon-Check"
        @click="finishEdit()"
      >
        Speichern
      </el-button>
    </div>
  </div>
</template>

<script>
import icons from "@/icons";
import Accordion from "../../components/Accordion/index.vue";
import AccordionItem from "../../components/Accordion/AccordionItem.vue";
import {paths, userAccesses} from "@/constants";
import {checkAccessesForActions} from "@/utils/checkAccessesUtils";
import RoleUtilities from "@/store/utilities/RoleUtilities";
import addHighlightSearchWord from "@/utils/addHighlightSearchWordUtils";

export default {
  components: {
    Accordion,
    AccordionItem
  },
  props: {
      filteredArray: {
          type: Array,
          required: true,
      },
    disabled: {
          type: Boolean,
          required: false,
      },
    roleEdit: {
          type: Boolean,
          required: true,
      },
    roleName: {
          type: String,
          required: true,
      },
    roleDescription: {
          type: String,
          required: true,
      },
  },
  data() {
    return {
      intents: this.filteredArray,
      canCreate: false,
      read: false,
      write: false,
      array: [],
    };
  },
  watch: {
      filteredArray: {
          handler(newArray) {
              this.intents = newArray;
          },
          immediate: true,
      },
  },
  computed: {
    icons() {
      return icons;
    },
    searchValue() {
      return this.$store.getters.search
    },
    loading() {
      return this.$store.getters.roleLoading
    },
  },
  mounted() {
    this.checkAccesses()
  },
  unmounted() {
    RoleUtilities.deleteRoleAccessesUtils(this.$store)
  },
  methods: {
    addHighlightSearchWord,
    checkAccesses() {
      const intents = this.$store.getters.accesses;
      this.canCreate = checkAccessesForActions(intents, userAccesses.roles, userAccesses.create);
    },
    checkIsAllSelected(key, intents) {
      const intentLength = intents?.length;
      const intentWithTrueKey = intents?.filter((intent) => intent[key])
      return intentLength === intentWithTrueKey?.length
    },
    select(skillName, intentName, key) {
      if (!this.disabled) {
        RoleUtilities.selectOnePermissionInGroup(this.$store, skillName, intentName, key)
      }
    },
    getDataForEditOrCreate () {
      const allPermissions = this.$store.getters.roleAccesses;
      const onlyWritePermissions = [];

      allPermissions.forEach(skill => {
        skill.permissions.forEach(intent => {
            onlyWritePermissions.push(intent);
        });
      });
      if (this.roleEdit) {
        const roleName = this.$store.getters.roleName;
        const newRoleName = this.roleName === roleName ? '' : this.roleName;

        const dataObj = {
          roleName: roleName,
          roleDescription: this.roleDescription,
          permissions: onlyWritePermissions,
        };

        if (newRoleName) {
          dataObj.newRoleName = newRoleName;
        }

        return dataObj;
      } else {
        return {
          roleName: this.roleName,
          roleDescription: this.roleDescription,
          permissions: onlyWritePermissions
        }
      }

    },
    async finishEdit() {
      if (this.canCreate) {

        if (this.roleEdit) {
          const request = await RoleUtilities.editRoleUtils(this.$store, this.getDataForEditOrCreate());
          if (request) {
            this.$message({
              message: "Löschen erfolgreich",
              type: "success",
            });
          }
        } else {
          await RoleUtilities.createRoleUtils(this.$store, this.getDataForEditOrCreate())
              .then(() => {
                this.$message({
                  message: "Rolle erfolgreich erstellt",
                  type: "success",
                });
                this.$router.push(paths.permissionSets);
              })
              .catch(() => {
                this.$message({
                  message: "ein Fehler ist aufgetreten",
                  type: "error",
                });
              })

        }
      } else {
        this.$message({
          message: "Sie haben keine Berechtigung zum Hinzufügen neuer Rollen",
          type: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" >
@import "@/styles/variables.module.scss";

.empty-data {
  background: $hsag-lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: $hsag-bluegrey;
  height: 60px;
}
.role-table {
  display: flex;
  justify-content: flex-end;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $hsag-bluegrey;
  color: $hsag-white;
  padding: 8px 8px;

  span {
    font-weight: 600;
  }
}

.header-title {
  text-align: start;
  width: 100%;
  font-size: 14px;

  &:nth-child(2n) {
    width: 174px;
  }

  &:nth-child(3n) {
    width: 326px;
  }
}

</style>




