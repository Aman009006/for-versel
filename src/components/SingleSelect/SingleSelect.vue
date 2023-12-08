<template>
  <div class="singleSelect-content">
    <div :class="isCreate ? 'single-select create' : 'single-select'" @click="openDropdown">
      {{ selected }}
      <svg-icon :style="isOpen ? 'transform: translateY(-50%) rotate(180deg); transition: 0.4s; top: 50%; height: 20px !important;' : 'transition: 0.4s; height: 20px !important;'" class="arrow-multiselect" :svg-icon-html="icons.arrowAccordion"/>
    </div>
    <div v-if="isOpen" :class="isCreate ? 'options-content options-create' : 'options-content'">
      <label :class="isChecked(option.role) ? 'option checked' : 'option'" v-for="option in options" :for="option.role">
        <input @click="toggleSelect(option)" :checked="isChecked(option.role)" type="checkbox" :id="option.role" >
        {{option.role}}
      </label>
    </div>
  </div>

</template>

<script>
import icons from "@/icons/index";
import UsersUtilities from "@/store/utilities/UsersUtilities";
import {defaultRole} from "@/constants";

export default {
  data() {
    return {
      isOpen: false,
      selected: this.selectedValue?.length ? this.selectedValue : defaultRole.defaultRole,
    };
  },
  computed: {
    icons() {
      return icons
    },
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    selectedValue: {
      type: Array,
      required: false,
    },
    isCreate: {
      type: Boolean,
      required: false,
    },
    user: {
      type: String,
      required: false,
    },
  },
  methods: {
    getEditableUser(user) {
      return UsersUtilities.getEditableUser(
        this.$store,
        user
      );
    },
    toggleSelect(option) {
        this.selected = option.role
        this.isOpen = false
        this.$emit("selectOption", option.role);
        const editableUser = this.getEditableUser(this.user);
        editableUser.role = option.role;
    },
    isChecked(role) {
      return this.selected === role
    },
    openDropdown() {
        this.isOpen = !this.isOpen;
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/variables.module.scss";

.arrow-multiselect {
  width: 14px !important;
  height: 28px !important;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%)
}
.option {
  display: block;
  font-weight: normal;
  input {
    display: none;
  }
}
.checked {
  font-weight: bold;
}
.single-select {
  padding: 5px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  background: #E3E9ED;
  width: 100%;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.singleSelect-content {
  position: relative;
  max-width: 100%;
}
.create {
  padding: 7px 20px;
  height: 36px;
  background: $hsag-lightgrey;
}
.options-content {
  width: 330px;
  background: #E3E9ED;
  border-radius: 8px;
  box-shadow: 0px 9px 14px 0px rgba(0, 0, 0, 0.25);
  padding: 8px 20px;
  margin-top: 5px;
  position: fixed;
  height: 164px;
  overflow-y: scroll;
}
.options-create {
  background: $hsag-lightgrey;
  max-width: 410px;
  width: 100%;
}
</style>
